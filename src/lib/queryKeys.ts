import type { GetRecipesParams } from '@/api/recipes';

export const recipeKeys = {
  all: ['recipes'] as const,
  lists: () => [...recipeKeys.all, 'list'] as const,
  list: (params: GetRecipesParams) => [...recipeKeys.lists(), params] as const,
  search: (query: string, params: GetRecipesParams = {}) =>
    [...recipeKeys.all, 'search', query, params] as const,
  details: () => [...recipeKeys.all, 'detail'] as const,
  detail: (id: number) => [...recipeKeys.details(), id] as const,
  tags: () => [...recipeKeys.all, 'tags'] as const,
};