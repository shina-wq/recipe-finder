import { apiRequest } from './client';
import type { Recipe, RecipesResponse } from '@/types/recipe';
import type { RecipeInput } from '@/lib/recipesStore';

export interface GetRecipesParams extends Record<string, string | number | undefined> {
  limit?: number;
  skip?: number;
  sortBy?: keyof Recipe;
  order?: 'asc' | 'desc';
}

export function getRecipes(params: GetRecipesParams = {}) {
  return apiRequest<RecipesResponse>('/recipes', { params });
}

export function getRecipeById(id: number) {
  return apiRequest<Recipe>(`/recipes/${id}`);
}

export function searchRecipes(query: string, params: GetRecipesParams = {}) {
  return apiRequest<RecipesResponse>('/recipes/search', { params: { q: query, ...params } });
}

export function getRecipeTags() {
  return apiRequest<string[]>('/recipes/tags');
}

export function getRecipesByMealType(mealType: string, params: GetRecipesParams = {}) {
  return apiRequest<RecipesResponse>(`/recipes/meal-type/${mealType}`, { params });
}

export function createRecipe(payload: RecipeInput) {
  return apiRequest<Recipe>('/recipes/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export function updateRecipe(id: number, payload: RecipeInput) {
  return apiRequest<Recipe>(`/recipes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export function deleteRecipe(id: number) {
  return apiRequest<Recipe>(`/recipes/${id}`, { method: 'DELETE' });
}