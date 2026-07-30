import { useQuery } from "@tanstack/react-query"
import { getRecipes } from "@/api/recipes"
import { recipeKeys } from "@/lib/queryKeys"
import { RecipeCard } from "@/components/recipes/RecipeCard"

const FEATURED_PARAMS = { limit: 8, sortBy: "rating", order: "desc" } as const

export function FeaturedRecipes() {
  const { data, isLoading, isError } = useQuery({
    queryKey: recipeKeys.list(FEATURED_PARAMS),
    queryFn: () => getRecipes(FEATURED_PARAMS),
  })

  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-foreground">Featured Recipes</h2>

      {isError && (
        <p className="mt-6 text-sm text-error">
          Couldn't load recipes right now. Try refreshing.
        </p>
      )}

      {isLoading && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: FEATURED_PARAMS.limit }).map((_, i) => (
            <div key={i} className="aspect-4/3 animate-pulse rounded-2xl bg-border" />
          ))}
        </div>
      )}

      {data && (
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {data.recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </section>
  )
}