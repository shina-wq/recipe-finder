import { Link } from "react-router-dom"
import { Clock, Heart, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Recipe } from "@/types/recipe"
import { useFavorites } from "@/hooks/useFavorites"
import { cn } from "@/lib/utils"

interface RecipeCardProps {
  recipe: Recipe
}

const QUICK_THRESHOLD_MINUTES = 20

export function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes
  const isQuick = totalTime <= QUICK_THRESHOLD_MINUTES

  const {isFavorite, toggleFavorite} = useFavorites()
  const favorited = isFavorite(recipe.id)

  return (
    <Card className="group relative gap-0 overflow-hidden rounded-2xl border-none p-0 shadow-card transition-shadow hover:shadow-lg">
      <Link
        to={`/recipes/${recipe.id}`}
        className="absolute inset-0 z-10"
        aria-label={recipe.name}
      />

      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {isQuick && (
          <Badge className="pointer-events-none absolute top-3 left-3 z-20 bg-primary text-primary-foreground">
            Quick
          </Badge>
        )}

        <button
          type="button"
          aria-label={favorited ? `Remove ${recipe.name} from favorites` : `Save ${recipe.name}`}
          onClick={(e) => {
            e.preventDefault()
            toggleFavorite(recipe.id)
          }}
          className="absolute top-3 right-3 z-20 flex size-8 items-center justify-center rounded-full bg-white/90 text-foreground-muted shadow-card transition-colors hover:text-primary cursor-pointer"
        >
          <Heart className={cn("size-4", favorited && "fill-primary text-primary")} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 px-4 py-3">
        <span className="text-xs font-normal uppercase tracking-wide text-secondary">
          {recipe.cuisine}
        </span>

        <h3 className="font-display text-lg font-medium text-foreground transition-colors group-hover:text-primary">
          {recipe.name}
        </h3>

        <div className="mt-1 flex items-center gap-3 text-[12px] text-foreground-muted">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {totalTime} min
          </span>
          <span className="flex items-center gap-1">
            <Star className="size-3.5 fill-accent text-accent" />
            {recipe.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Card>
  )
}