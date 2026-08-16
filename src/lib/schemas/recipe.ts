import { z } from "zod"

export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const

export const recipeFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  cuisine: z.string().min(1, "Cuisine is required"),
  difficulty: z.enum(DIFFICULTIES),
  servings: z.coerce.number().int().min(1, "Must serve at least 1"),
  prepTimeMinutes: z.coerce.number().int().min(0, "Can't be negative"),
  cookTimeMinutes: z.coerce.number().int().min(0, "Can't be negative"),
  caloriesPerServing: z.coerce.number().int().min(0, "Can't be negative"),
  mealType: z.array(z.string()).min(1, "Select at least one meal type"),
  tags: z.array(z.string()).default([]),
  image: z.string().url("Enter a valid image URL").or(z.literal("")).optional(),

  ingredients: z
    .array(z.object({ value: z.string().min(1) }))
    .min(1, "Add at least one ingredient"),

  instructions: z
    .array(z.object({ value: z.string().min(1) }))
    .min(1, "Add at least one instruction"),
})

export type RecipeFormInput = z.input<typeof recipeFormSchema>
export type RecipeFormValues = z.output<typeof recipeFormSchema>