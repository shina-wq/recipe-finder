import { Heart } from "lucide-react"
import type { Recipe } from "@/types/recipe"
import { useFavorites } from "@/hooks/useFavorites"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { RecipeCardBase } from "./RecipeCardBase"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { isFavorite, toggleFavorite, canFavorite } = useFavorites()
  const favorited = isFavorite(recipe.id)

  return (
    <RecipeCardBase
      recipe={recipe}
      href={`/recipes/${recipe.id}`}
      overlay={
        <Tooltip>
          <TooltipTrigger
            render={
              <button
                type="button"
                disabled={!canFavorite}
                aria-label={favorited ? `Remove ${recipe.name} from favorites` : `Save ${recipe.name}`}
                onClick={(e) => {
                  e.preventDefault()
                  toggleFavorite(recipe.id)
                }}
                className={cn(
                  "absolute top-3 right-3 z-20 flex size-8 items-center justify-center rounded-full bg-white/90 text-foreground-muted shadow-card transition-colors",
                  canFavorite ? "cursor-pointer hover:text-primary" : "cursor-not-allowed opacity-60",
                )}
              />
            }
          >
            <Heart className={cn("size-4", favorited && "fill-primary text-primary")} />
          </TooltipTrigger>
          {!canFavorite && <TooltipContent>Sign in to save favorites</TooltipContent>}
        </Tooltip>
      }
    />
  )
}