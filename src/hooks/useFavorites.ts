import { useCallback, useSyncExternalStore } from "react"
import { favoritesStore } from "@/lib/favoritesStore"
import { useAuth } from "@/hooks/useAuth"

export function useFavorites() {
  const { user } = useAuth()
  const userId = user?.id ?? null

  const subscribe = useCallback((listener: () => void) => favoritesStore.subscribe(listener), [])
  const getSnapshot = useCallback(() => favoritesStore.getSnapshot(userId), [userId])

  const favorites = useSyncExternalStore(subscribe, getSnapshot)
  const canFavorite = userId !== null

  const isFavorite = useCallback((id: number) => favorites.has(id), [favorites])

  const toggleFavorite = useCallback(
    (id: number) => {
      if (userId === null) return
      favoritesStore.toggle(userId, id)
    },
    [userId],
  )

  const clearFavorites = useCallback(() => {
    if (userId === null) return
    favoritesStore.clear(userId)
  }, [userId])

  return { favorites, isFavorite, toggleFavorite, clearFavorites, canFavorite }
}