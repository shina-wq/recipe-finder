import { Link } from "react-router-dom"
import { Heart, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RecipeCard } from "@/components/recipes/RecipeCard"
import type { Recipe } from "@/types/recipe"

// TODO(logic-pass): swap for real state —
// useAuth() → isAuthenticated
// useFavorites() → favoriteIds
// useQueries({ queries: favoriteIds.map(id => ({ queryKey: recipeKeys.detail(id), queryFn: () => getRecipeById(id) })) })
//   → recipes (successful), failedCount (rejected)
type FavoritesState = "unauthenticated" | "loading" | "error" | "empty" | "populated"
const MOCK_STATE: FavoritesState = "populated"
const MOCK_RECIPES: Recipe[] = []

const SKELETON_COUNT = 8

interface CenteredMessageProps {
  icon: React.ReactNode
  message: string
  ctaLabel: string
  ctaTo: string
  ctaVariant?: "default" | "outline"
}

// Shared shell for empty/unauth/error — same layout, different copy + icon.
function CenteredMessage({ icon, message, ctaLabel, ctaTo, ctaVariant = "default" }: CenteredMessageProps) {
  return (
    <div className="mt-16 flex flex-col items-center text-center">
      {icon}
      <p className="mt-4 max-w-sm text-foreground-muted">{message}</p>
      <Button render={<Link to={ctaTo} />} variant={ctaVariant} className="mt-4 rounded-full px-6">
        {ctaLabel}
      </Button>
    </div>
  )
}

export function FavoritesPage() {
  const isPopulated = MOCK_STATE === "populated"
  const recipeCount = MOCK_RECIPES.length

  return (
    <div className="bg-background/95">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-2xl font-bold text-foreground">Favorites</h1>
            {isPopulated && (
              <span aria-live="polite" className="text-sm text-foreground-muted">
                {recipeCount} {recipeCount === 1 ? "recipe" : "recipes"}
              </span>
            )}
          </div>

          {isPopulated && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              // TODO(logic-pass): favoritesStore.clear() + confirm dialog
              onClick={() => {}}
            >
              Clear all
            </Button>
          )}
        </div>

        {MOCK_STATE === "unauthenticated" && (
          <CenteredMessage
            icon={<Heart className="size-10 text-muted-foreground" />}
            message="Sign in to save and view your favorite recipes."
            ctaLabel="Sign in"
            ctaTo="/sign-in"
          />
        )}

        {MOCK_STATE === "loading" && (
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div key={i} className="aspect-4/3 animate-pulse rounded-2xl bg-border" />
            ))}
          </div>
        )}

        {MOCK_STATE === "error" && (
          <CenteredMessage
            icon={<AlertCircle className="size-10 text-error" />}
            message="Couldn't load your favorites right now. Try refreshing."
            ctaLabel="Refresh"
            ctaTo="."
            ctaVariant="outline"
          />
        )}

        {MOCK_STATE === "empty" && (
          <CenteredMessage
            icon={<Heart className="size-10 text-muted-foreground" />}
            message="No favorites yet. Tap the heart on any recipe to save it here."
            ctaLabel="Explore recipes"
            ctaTo="/"
            ctaVariant="outline"
          />
        )}

        {isPopulated && (
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {MOCK_RECIPES.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}