const STORAGE_KEY = "forkful:favorites"

function readFavorites(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

let favorites = readFavorites()
const listeners = new Set<() => void>()

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]))
  listeners.forEach((listener) => listener())
}

export const favoritesStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot() {
    return favorites
  },
  toggle(id: number) {
    favorites = new Set(favorites)
    favorites.has(id) ? favorites.delete(id) : favorites.add(id)
    persist()
  },
}