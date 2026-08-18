import { useQuery } from "@tanstack/react-query"
import { searchRecipes } from "@/api/recipes"
import { recipeKeys } from "@/lib/queryKeys"
import { RecipeCard } from "@/components/recipes/RecipeCard"
import { Skeleton } from "@/components/ui/skeleton"

const SKELETON_COUNT = 8

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: recipeKeys.search(query),
    queryFn: () => searchRecipes(query),
  })

  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-foreground">Results for "{query}"</h2>

      {isLoading && (
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <Skeleton key={i} className="aspect-4/3 rounded-2xl" />
          ))}
        </div>
      )}

      {isError && <p className="mt-6 text-sm text-error">Couldn't load results. Try again.</p>}

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
    </section>
  )
}