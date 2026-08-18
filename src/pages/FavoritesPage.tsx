import { useState } from "react"
import { useQueries } from "@tanstack/react-query"
import { Heart, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { RecipeCard } from "@/components/recipes/RecipeCard"
import { useAuth } from "@/hooks/useAuth"
import { useFavorites } from "@/hooks/useFavorites"
import { getRecipeById } from "@/api/recipes"
import { recipeKeys } from "@/lib/queryKeys"
import { CenteredMessage } from "@/components/shared/CenteredMessage"
import { RequireAuth } from "@/components/auth/RequireAuth"

const SKELETON_COUNT = 8

export function FavoritesPage() {
  const { isAuthenticated } = useAuth()
  const { favorites, clearFavorites } = useFavorites()
  const favoriteIds = [...favorites]

  const [confirmOpen, setConfirmOpen] = useState(false)

  const results = useQueries({
    queries: favoriteIds.map((id) => ({
      queryKey: recipeKeys.detail(id),
      queryFn: () => getRecipeById(id),
      enabled: isAuthenticated,
    })),
  })

  const isLoading = results.some((r) => r.isLoading)
  const recipes = results.flatMap((r) => (r.data ? [r.data] : []))
  const failedCount = results.filter((r) => r.isError).length
  const allFailed = favoriteIds.length > 0 && !isLoading && failedCount === favoriteIds.length

  const state = isLoading ? "loading" : allFailed ? "error" : favoriteIds.length === 0 ? "empty" : "populated"

  const handleClearAll = () => {
    clearFavorites()
    setConfirmOpen(false)
  }

  return (
    <div className="bg-background/95">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-2xl font-bold text-foreground">Favorites</h1>
            {isAuthenticated && state === "populated" && (
              <span aria-live="polite" className="text-sm text-foreground-muted">
                {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}
              </span>
            )}
          </div>

          {isAuthenticated && state === "populated" && (
            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
              <AlertDialogTrigger render={<Button variant="outline" size="sm" className="rounded-full" />}>
                Clear all
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear all favorites?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This removes all {recipes.length} saved recipes. This can't be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={handleClearAll}>
                    Clear all
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        <RequireAuth
          icon={<Heart className="size-10 text-muted-foreground" />}
          message="Sign in to save and view your favorite recipes."
        >
          <>
            {state === "loading" && (
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: Math.min(favoriteIds.length, SKELETON_COUNT) }).map((_, i) => (
                  <Skeleton key={i} className="aspect-4/3 rounded-2xl" />
                ))}
              </div>
            )}

            {state === "error" && (
              <CenteredMessage
                icon={<AlertCircle className="size-10 text-error" />}
                message="Couldn't load your favorites right now. Try refreshing."
                ctaLabel="Refresh"
                ctaTo="."
                ctaVariant="outline"
              />
            )}

            {state === "empty" && (
              <CenteredMessage
                icon={<Heart className="size-10 text-muted-foreground" />}
                message="No favorites yet. Tap the heart on any recipe to save it here."
                ctaLabel="Explore recipes"
                ctaTo="/"
                ctaVariant="outline"
              />
            )}

            {state === "populated" && failedCount > 0 && (
              <p className="mt-4 text-sm text-error">
                {failedCount} {failedCount === 1 ? "recipe" : "recipes"} couldn't be loaded.
              </p>
            )}

            {state === "populated" && (
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </>
        </RequireAuth>
      </main>
    </div>
  )
}