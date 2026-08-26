import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Clock, Heart, Star, Users } from "lucide-react"
import { getRecipeById } from "@/api/recipes"
import { recipeKeys } from "@/lib/queryKeys"
import { useFavorites } from "@/hooks/useFavorites"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { RelatedRecipes } from "@/components/recipes/RelatedRecipes"
import { cn } from "@/lib/utils"
import { Seo } from "@/components/shared/Seo"

export function RecipeDetailsPage() {
  const { id } = useParams()
  const recipeId = Number(id)

  const { data: recipe, isLoading, isError } = useQuery({
    queryKey: recipeKeys.detail(recipeId),
    queryFn: () => getRecipeById(recipeId),
    enabled: !Number.isNaN(recipeId),
  })

  const { isFavorite, toggleFavorite, canFavorite } = useFavorites()

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-4/3 rounded-2xl" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24" />
          </div>
        </div>
      </main>
    )
  }

  if (isError || !recipe) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <p className="text-foreground-muted">Couldn't find that recipe.</p>
        <Link to="/" className="mt-2 inline-block text-primary hover:underline">
          Back to Home
        </Link>
      </main>
    )
  }

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes
  const favorited = isFavorite(recipe.id)
  const primaryMealType = recipe.mealType[0]

  return (
    <div className="bg-background/95">
      <Seo
        title={`${recipe.name} Recipe`}
        description={`${recipe.name} — a ${recipe.cuisine} recipe with ${recipe.ingredients.length} ingredients, ready in ${totalTime} min.`}
        path={`/recipes/${recipe.id}`}
        image={recipe.image}
        ogType="article"
        />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {primaryMealType && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link to={`/categories/${primaryMealType}`} />}>
                    {primaryMealType}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{recipe.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <div className="mt-4 grid gap-8 md:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-card">
            <img src={recipe.image} alt={recipe.name} className="size-full object-cover" />

            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    disabled={!canFavorite}
                    aria-label={favorited ? `Remove ${recipe.name} from favorites` : `Save ${recipe.name}`}
                    onClick={() => toggleFavorite(recipe.id)}
                    className={cn(
                      "absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-foreground-muted shadow-card transition-colors",
                      canFavorite ? "cursor-pointer hover:text-primary" : "cursor-not-allowed opacity-60",
                    )}
                  />
                }
              >
                <Heart className={cn("size-4", favorited && "fill-primary text-primary")} />
              </TooltipTrigger>
              {!canFavorite && <TooltipContent>Sign in to save favorites</TooltipContent>}
            </Tooltip>
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-normal uppercase tracking-wide text-secondary">
              {recipe.cuisine}
            </span>
            <h1 className="font-display text-3xl font-bold text-foreground">{recipe.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="outline">{recipe.difficulty}</Badge>
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-foreground-muted">
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" /> {totalTime} min
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="size-4" /> {recipe.servings} servings
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-accent text-accent" />
                {recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)
              </span>
            </div>

            <p className="mt-4 text-sm text-foreground-muted">
              {recipe.caloriesPerServing} calories per serving
            </p>
          </div>
        </div>

        {/* Ingredients & Instructions */}
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_2fr]">
          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Ingredients</h2>
            <ul className="mt-4 space-y-2 text-sm text-foreground-muted">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground">Instructions</h2>
            <ol className="mt-4 space-y-4">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground-muted">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {primaryMealType && (
          <div className="mt-16">
            <RelatedRecipes mealType={primaryMealType} excludeId={recipe.id} />
          </div>
        )}
      </main>
    </div>
  )
}