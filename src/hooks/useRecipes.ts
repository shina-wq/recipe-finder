import { useCallback, useSyncExternalStore } from "react"
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
      return recipesStore.add(userId, input)
    },
    [userId],
  )

  const updateRecipe = useCallback(
    (id: number, input: RecipeInput) => {
      if (userId === null) return
      fireAndForget(apiUpdateRecipe(id, input), "update")
      recipesStore.update(userId, id, input)
    },
    [userId],
  )

  const deleteRecipe = useCallback(
    (id: number) => {
      if (userId === null) return
      fireAndForget(apiDeleteRecipe(id), "delete")
      recipesStore.remove(userId, id)
    },
    [userId],
  )

  return { recipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe }
}