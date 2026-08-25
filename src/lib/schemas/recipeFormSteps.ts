import type { FieldPath } from "react-hook-form"
import type { RecipeFormInput } from "./recipe"

export interface RecipeFormStep {
  id: string
  label: string
  fields: FieldPath<RecipeFormInput>[]
}

export const RECIPE_FORM_STEPS: RecipeFormStep[] = [
  {
    id: "basics",
    label: "Basics",
    fields: ["name", "cuisine", "difficulty", "servings", "prepTimeMinutes", "cookTimeMinutes", "caloriesPerServing"],
  },
  { id: "classification", label: "Classification", fields: ["mealType", "tags", "image"] },
  { id: "ingredients", label: "Ingredients", fields: ["ingredients"] },
  { id: "instructions", label: "Instructions", fields: ["instructions"] },
]