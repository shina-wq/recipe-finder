import { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { getRecipes } from "@/api/recipes"
import { recipeKeys } from "@/lib/queryKeys"
import { RecipeCard } from "@/components/recipes/RecipeCard"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import type { RecipesResponse } from "@/types/recipe"

const PAGE_SIZE = 12
const BASE_PARAMS = { limit: PAGE_SIZE, sortBy: "rating", order: "desc" } as const

function getNextSkip(lastPage: RecipesResponse) {
  const nextSkip = lastPage.skip + lastPage.limit
  return nextSkip < lastPage.total ? nextSkip : undefined
}

export function AllRecipes() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: recipeKeys.infiniteList(BASE_PARAMS),
      queryFn: ({ pageParam }) => getRecipes({ ...BASE_PARAMS, skip: pageParam }),
      initialPageParam: 0,
      getNextPageParam: getNextSkip,
    })

  const { targetRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    enabled: hasNextPage && !isFetchingNextPage,
  })

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage])

  const recipes = data?.pages.flatMap((page) => page.recipes) ?? []

  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-foreground">Explore Recipes</h2>

      {isError && (
        <p className="mt-6 text-sm text-error">
          Couldn't load recipes right now. Try refreshing.
        </p>
      )}

      {isLoading && (
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="aspect-4/3 animate-pulse rounded-2xl bg-border" />
          ))}
        </div>
      )}

      {recipes.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      {/* Sentinel doubles as the "keep loading" indicator; unmounts once hasNextPage is false */}
      {hasNextPage && (
        <div ref={targetRef} className="mt-8 flex justify-center py-4">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      )}
    </section>
  )
}