const STORAGE_PREFIX = "forkful:favorites:"

const EMPTY_FAVORITES: ReadonlySet<number> = new Set()

const cache = new Map<number, Set<number>>()
const listeners = new Set<() => void>()

function readFromStorage(userId: number): Set<number> {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${userId}`)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function getUserFavorites(userId: number): Set<number> {
  let favorites = cache.get(userId)
  if (!favorites) {
    favorites = readFromStorage(userId)
    cache.set(userId, favorites)
  }
  return favorites
}

function persist(userId: number, favorites: Set<number>) {
  cache.set(userId, favorites)
  localStorage.setItem(`${STORAGE_PREFIX}${userId}`, JSON.stringify([...favorites]))
  listeners.forEach((listener) => listener())
}

export const favoritesStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot(userId: number | null): ReadonlySet<number> {
    return userId === null ? EMPTY_FAVORITES : getUserFavorites(userId)
  },
  toggle(userId: number, recipeId: number) {
    const next = new Set(getUserFavorites(userId))
    next.has(recipeId) ? next.delete(recipeId) : next.add(recipeId)
    persist(userId, next)
  },
  clear(userId: number) {
    persist(userId, new Set())
  },
}