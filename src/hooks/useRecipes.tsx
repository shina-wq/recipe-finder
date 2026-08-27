import { useCallback, useSyncExternalStore } from "react"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { recipesStore, type RecipeInput } from "@/lib/recipesStore"
import { useAuth } from "@/hooks/useAuth"
import {
  createRecipe as apiCreateRecipe,
  updateRecipe as apiUpdateRecipe,
  deleteRecipe as apiDeleteRecipe,
} from "@/api/recipes"

function fireAndForget(promise: Promise<unknown>, action: string) {
  promise.catch((err) => console.warn(`[recipes] ${action} call failed (expected with mock API):`, err))
}

export function useRecipes() {
  const { user } = useAuth()
  const userId = user?.id ?? null

  const subscribe = useCallback((listener: () => void) => recipesStore.subscribe(listener), [])
  const getSnapshot = useCallback(() => recipesStore.getSnapshot(userId), [userId])

  const recipes = useSyncExternalStore(subscribe, getSnapshot)

  const getRecipeById = useCallback(
    (id: number) => (userId === null ? undefined : recipesStore.getById(userId, id)),
    [userId],
  )

  const addRecipe = useCallback(
    (input: RecipeInput) => {
      if (userId === null) return undefined
      fireAndForget(apiCreateRecipe(input), "create")
      const recipe = recipesStore.add(userId, input)
      toast.success("Recipe added", { description: `"${recipe.name}" is on your shelf.` })
      return recipe
    },
    [userId],
  )

  const updateRecipe = useCallback(
    (id: number, input: RecipeInput) => {
      if (userId === null) return
      fireAndForget(apiUpdateRecipe(id, input), "update")
      recipesStore.update(userId, id, input)
      toast.success("Recipe updated", { description: `"${input.name}" saved.` })
    },
    [userId],
  )

  const deleteRecipe = useCallback(
    (id: number) => {
      if (userId === null) return
      const recipe = recipesStore.getById(userId, id)
      fireAndForget(apiDeleteRecipe(id), "delete")
      recipesStore.remove(userId, id)
      // Neutral, not "success" - deleting isn't a positive outcome, just a
      // confirmed one. No herb/green here, just the paprika trash icon.
      toast(recipe ? `"${recipe.name}" deleted` : "Recipe deleted", {
        icon: <Trash2 className="size-4 text-primary" />,
      })
    },
    [userId],
  )

  return { recipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe }
}