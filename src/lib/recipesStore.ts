import type { Recipe } from "@/types/recipe"

const STORAGE_PREFIX = "forkful:recipes:"
const EMPTY_RECIPES: readonly Recipe[] = []

export type RecipeInput = Omit<Recipe, "id" | "userId" | "rating" | "reviewCount">

const cache = new Map<number, Recipe[]>()
const listeners = new Set<() => void>()

function readFromStorage(userId: number): Recipe[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${userId}`)
    return raw ? (JSON.parse(raw) as Recipe[]) : []
  } catch {
    return []
  }
}

function getUserRecipes(userId: number): Recipe[] {
  let recipes = cache.get(userId)
  if (!recipes) {
    recipes = readFromStorage(userId)
    cache.set(userId, recipes)
  }
  return recipes
}

function persist(userId: number, recipes: Recipe[]) {
  cache.set(userId, recipes)
  localStorage.setItem(`${STORAGE_PREFIX}${userId}`, JSON.stringify(recipes))
  listeners.forEach((listener) => listener())
}

export const recipesStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot(userId: number | null): readonly Recipe[] {
    return userId === null ? EMPTY_RECIPES : getUserRecipes(userId)
  },
  getById(userId: number, id: number): Recipe | undefined {
    return getUserRecipes(userId).find((r) => r.id === id)
  },
  add(userId: number, input: RecipeInput): Recipe {
    const recipe: Recipe = { ...input, id: Date.now(), userId, rating: 0, reviewCount: 0 }
    persist(userId, [...getUserRecipes(userId), recipe])
    return recipe
  },
  update(userId: number, id: number, input: RecipeInput) {
    const next = getUserRecipes(userId).map((r) => (r.id === id ? { ...r, ...input } : r))
    persist(userId, next)
  },
  remove(userId: number, id: number) {
    persist(userId, getUserRecipes(userId).filter((r) => r.id !== id))
  },
}