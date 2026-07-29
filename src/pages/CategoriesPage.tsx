import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getRecipesByMealType } from "@/api/recipes"
import { recipeKeys } from "@/lib/queryKeys"

export function CategoriesPage() {
  const { mealType } = useParams()

  // No mealType in the URL → browsing the category index itself.
  if (!mealType) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-foreground-muted">All categories — coming soon.</p>
      </main>
    )
  }

  const { data, isLoading } = useQuery({
    queryKey: recipeKeys.mealType(mealType),
    queryFn: () => getRecipesByMealType(mealType),
  })

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-foreground">{mealType}</h1>
      {isLoading && <p className="mt-4 text-foreground-muted">Loading…</p>}
      {/* TODO: recipe card grid — reuse whatever grid component the Featured Recipes section ends up using */}
      <pre className="mt-4 text-xs text-foreground-muted">{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}