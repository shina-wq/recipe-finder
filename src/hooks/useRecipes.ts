import { useCallback, useSyncExternalStore } from "react"
import { recipesStore, type RecipeInput } from "@/lib/recipesStore"
import { useAuth } from "@/hooks/useAuth"

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
    (input: RecipeInput) => (userId === null ? undefined : recipesStore.add(userId, input)),
    [userId],
  )

  const updateRecipe = useCallback(
    (id: number, input: RecipeInput) => {
      if (userId !== null) recipesStore.update(userId, id, input)
    },
    [userId],
  )

  const deleteRecipe = useCallback(
    (id: number) => {
      if (userId !== null) recipesStore.remove(userId, id)
    },
    [userId],
  )

  return { recipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe }
}