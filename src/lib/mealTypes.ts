export interface MealType {
  label: string
  value: string
  image: string
}

export const MEAL_TYPES: MealType[] = [
  { label: "Breakfast", value: "Breakfast", image: "/images/categories/breakfast.avif" },
  { label: "Lunch", value: "Lunch", image: "/images/categories/lunch.avif" },
  { label: "Dinner", value: "Dinner", image: "/images/categories/dinner.avif" },
  { label: "Snack", value: "Snack", image: "/images/categories/snack.avif" },
  { label: "Dessert", value: "Dessert", image: "/images/categories/dessert.avif" },
  { label: "Appetizer", value: "Appetizer", image: "/images/categories/appetizer.avif" },
]