import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

export function AddRecipeTile() {
  return (
    <Link
      to="/my-recipes/new"
      className="flex min-h-56 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border text-foreground-muted transition-colors hover:border-primary hover:text-primary"
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-muted/60">
        <Plus className="size-5" />
      </span>
      <span className="text-sm font-medium">Add a recipe</span>
    </Link>
  )
}