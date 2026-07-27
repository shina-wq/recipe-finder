import { apiRequest } from './client';
import type { Recipe, RecipesResponse } from '@/types/recipe';

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