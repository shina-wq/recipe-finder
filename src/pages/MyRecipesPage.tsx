import { ChefHat, KeyRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CenteredMessage } from "@/components/shared/CenteredMessage"
import { AddRecipeTile } from "@/components/recipes/AddRecipeTile"
import { MyRecipeCard } from "@/components/recipes/MyRecipeCard"
import type { Recipe } from "@/types/recipe"

// TODO: replace with a recipesStore (localStorage, per-user, mirroring favoritesStore)
const MOCK_RECIPES: Recipe[] = [
  {
    id: 9001,
    name: "Weeknight Garlic Butter Pasta",
    ingredients: ["Spaghetti", "Butter", "Garlic", "Parmesan", "Parsley"],
    instructions: ["Boil pasta.", "Melt butter with garlic.", "Toss and top with parmesan."],
    prepTimeMinutes: 5,
    cookTimeMinutes: 12,
    servings: 2,
    difficulty: "Easy",
    cuisine: "Italian",
    caloriesPerServing: 420,
    tags: ["Pasta", "Quick"],
    userId: 0,
    image: "https://cdn.dummyjson.com/recipe-images/16.webp",
    rating: 4.6,
    reviewCount: 0,
    mealType: ["Dinner"],
  },
]

export function MyRecipesPage() {
  // TODO: derive from useAuth() + recipesStore
  const isAuthenticated = true
  const recipes = MOCK_RECIPES

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

        {isAuthenticated && (
          <div className="mt-6 flex gap-3 rounded-2xl bg-accent/10 p-4 ring-1 ring-accent/20">
            <KeyRound className="mt-0.5 size-4 shrink-0 text-accent" />
            <p className="text-sm text-foreground-muted">
              Saved to this browser only - recipes here won't sync to DummyJSON's server or other devices.
            </p>
          </div>
        )}

        {!isAuthenticated && (
          <CenteredMessage
            icon={<ChefHat className="size-10 text-muted-foreground" />}
            message="Sign in to create and manage your own recipes."
            ctaLabel="Sign in"
            ctaTo="/sign-in"
          />
        )}

        {isAuthenticated && (
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            <AddRecipeTile />
            {recipes.map((recipe) => (
              <MyRecipeCard key={recipe.id} recipe={recipe} onDelete={() => {}} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}