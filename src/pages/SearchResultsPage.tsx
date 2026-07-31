import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { searchRecipes } from "@/api/recipes"
import { recipeKeys } from "@/lib/queryKeys"
import { RecipeCard } from "@/components/recipes/RecipeCard"

export function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") ?? ""

  const { data, isLoading, isError } = useQuery({
    queryKey: recipeKeys.search(query),
    queryFn: () => searchRecipes(query),
    enabled: query.length > 0,
  })

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-foreground">
        Results for "{query}"
      </h1>

      {isError && <p className="mt-6 text-sm text-error">Couldn't load results. Try again.</p>}

      {isLoading && (
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-4/3 animate-pulse rounded-2xl bg-border" />
          ))}
        </div>
      )}

      {data?.recipes.length === 0 && (
        <p className="mt-6 text-foreground-muted">No recipes found for "{query}".</p>
      )}

      {data && data.recipes.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {data.recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </main>
  )
}