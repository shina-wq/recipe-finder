import { useQuery } from "@tanstack/react-query"
import { getRecipesByMealType } from "@/api/recipes"
import { recipeKeys } from "@/lib/queryKeys"
import { RecipeCard } from "@/components/recipes/RecipeCard"
import { Skeleton } from "@/components/ui/skeleton"

const RELATED_COUNT = 3

interface RelatedRecipesProps {
  mealType: string
  excludeId: number
}

export function RelatedRecipes({ mealType, excludeId }: RelatedRecipesProps) {
  const { data, isLoading } = useQuery({
    queryKey: recipeKeys.mealType(mealType),
    queryFn: () => getRecipesByMealType(mealType),
  })

  const related = (data?.recipes ?? []).filter((r) => r.id !== excludeId).slice(0, RELATED_COUNT)

  if (!isLoading && related.length === 0) return null

  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-foreground">You Might Also Like</h2>
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
        {isLoading
          ? Array.from({ length: RELATED_COUNT }).map((_, i) => (
              <Skeleton key={i} className="aspect-4/3 rounded-2xl" />
            ))
          : related.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </div>
    </section>
  )
}