import { useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { Clock, ImageOff, Star } from "lucide-react"
import { Card, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Recipe } from "@/types/recipe"

interface RecipeCardBaseProps {
  recipe: Recipe
  href: string
  overlay?: ReactNode
  footer?: ReactNode
}

const QUICK_THRESHOLD_MINUTES = 20

export function RecipeCardBase({ recipe, href, overlay, footer }: RecipeCardBaseProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes
  const isQuick = totalTime <= QUICK_THRESHOLD_MINUTES

  const [imageFailed, setImageFailed] = useState(false)
  const showPlaceholder = !recipe.image || imageFailed

  return (
    <Card className="group relative gap-0 overflow-hidden rounded-2xl border-none p-0 bg-white shadow-card transition-shadow hover:shadow-lg">
      <Link to={href} className="absolute inset-0 z-10" aria-label={recipe.name} />

      <div className="relative aspect-4/3 overflow-hidden">
        {showPlaceholder ? (
          <div className="flex size-full items-center justify-center bg-muted/40 text-muted-foreground">
            <ImageOff className="size-8" />
          </div>
        ) : (
          <img
            src={recipe.image}
            alt={recipe.name}
            onError={() => setImageFailed(true)}
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {isQuick && (
          <Badge className="pointer-events-none absolute top-3 left-3 z-20 bg-primary text-primary-foreground">
            Quick
          </Badge>
        )}
        {overlay}
      </div>

      <div className="flex flex-col gap-1 px-4 py-3">
        <span className="text-xs font-normal uppercase tracking-wide text-secondary">{recipe.cuisine}</span>
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

      {footer && <CardFooter className="relative z-20 justify-end gap-1">{footer}</CardFooter>}
    </Card>
  )
}