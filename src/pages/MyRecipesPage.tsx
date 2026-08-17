import { ChefHat, KeyRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AddRecipeTile } from "@/components/recipes/AddRecipeTile"
import { MyRecipeCard } from "@/components/recipes/MyRecipeCard"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { useAuth } from "@/hooks/useAuth"
import { useRecipes } from "@/hooks/useRecipes"

export function MyRecipesPage() {
  const { isAuthenticated } = useAuth()
  const { recipes, deleteRecipe } = useRecipes()

  return (
    <div className="bg-background/95">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-2xl font-bold text-foreground">My Recipes</h1>
            {isAuthenticated && recipes.length > 0 && (
              <Badge variant="outline">
                {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}
              </Badge>
            )}
          </div>
        </div>

        <RequireAuth
          icon={<ChefHat className="size-10 text-muted-foreground" />}
          message="Sign in to create and manage your own recipes."
        >
          <>
            <div className="mt-6 flex gap-3 rounded-2xl bg-accent/10 p-4 ring-1 ring-accent/20">
              <KeyRound className="mt-0.5 size-4 shrink-0 text-accent" />
              <p className="text-sm text-foreground-muted">
                Saved to this browser only - recipes here won't sync to DummyJSON's server or other devices.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              <AddRecipeTile />
              {recipes.map((recipe) => (
                <MyRecipeCard key={recipe.id} recipe={recipe} onDelete={deleteRecipe} />
              ))}
            </div>
          </>
        </RequireAuth>
      </main>
    </div>
  )
}