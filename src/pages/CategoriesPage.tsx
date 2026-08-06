import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getRecipesByMealType } from "@/api/recipes"
import { recipeKeys } from "@/lib/queryKeys"
import { MEAL_TYPES } from "@/lib/mealTypes"
import { RecipeCard } from "@/components/recipes/RecipeCard"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function CategoriesPage() {
  const { mealType } = useParams()

  const category = MEAL_TYPES.find((meal) => meal.value === mealType)

  if (!category) {
    return (
      <div className="bg-background/95">
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 text-center">
          <p className="text-foreground-muted">
            "{mealType}" isn't a category we recognize.
          </p>
          <Link to="/" className="mt-2 inline-block text-primary hover:underline">
            Browse to Home
          </Link>
        </main>
      </div>
    )
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: recipeKeys.mealType(category.value),
    queryFn: () => getRecipesByMealType(category.value),
  })

  return (
    <div className="bg-background/95">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.label}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-4 flex items-baseline gap-3">
          <h1 className="font-display text-2xl font-bold text-foreground">{category.label}</h1>
          {data && (
            <span className="text-sm text-foreground-muted">
              {data.total} {data.total === 1 ? "recipe" : "recipes"}
            </span>
          )}
        </div>

        {isError && (
          <p className="mt-6 text-sm text-error">Couldn't load recipes right now. Try refreshing.</p>
        )}

        {isLoading && (
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-4/3 animate-pulse rounded-2xl bg-border" />
            ))}
          </div>
        )}

        {data?.recipes.length === 0 && (
          <p className="mt-6 text-foreground-muted">No recipes found in {category.label} yet.</p>
        )}

        {data && data.recipes.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {data.recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}