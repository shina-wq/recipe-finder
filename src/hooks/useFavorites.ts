import { useCallback, useSyncExternalStore } from "react"
import { favoritesStore } from "@/lib/favoritesStore"

export function useFavorites() {
  const favorites = useSyncExternalStore(favoritesStore.subscribe, favoritesStore.getSnapshot)

  const isFavorite = useCallback((id: number) => favorites.has(id), [favorites])
  const toggleFavorite = useCallback((id: number) => favoritesStore.toggle(id), [])

  return { isFavorite, toggleFavorite }
}