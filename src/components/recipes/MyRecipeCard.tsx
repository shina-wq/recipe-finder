import { useState } from "react"
import { Link } from "react-router-dom"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Recipe } from "@/types/recipe"
import { RecipeCardBase } from "./RecipeCardBase"

interface MyRecipeCardProps {
  recipe: Recipe
  onDelete: (id: number) => void
}

export function MyRecipeCard({ recipe, onDelete }: MyRecipeCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <RecipeCardBase
      recipe={recipe}
      href={`/my-recipes/${recipe.id}/edit`}
      footer={
        <>
          <Button
            variant="ghost"
            size="icon-sm"
            render={<Link to={`/my-recipes/${recipe.id}/edit`} />}
            aria-label={`Edit ${recipe.name}`}
          >
            <Pencil className="size-4" />
          </Button>

          <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <AlertDialogTrigger
              render={<Button variant="ghost" size="icon-sm" aria-label={`Delete ${recipe.name}`} />}
            >
              <Trash2 className="size-4" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete "{recipe.name}"?</AlertDialogTitle>
                <AlertDialogDescription>
                  This removes it from your shelf. This can't be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => {
                    onDelete(recipe.id)
                    setConfirmOpen(false)
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      }
    />
  )
}