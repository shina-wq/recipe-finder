import { MEAL_TYPES } from "@/lib/mealTypes"
import { CategoryCard } from "./CategoryCard"

export function ExploreCategories() {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-foreground">Explore Categories</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {MEAL_TYPES.map((meal) => (
          <CategoryCard key={meal.value} label={meal.label} value={meal.value} image={meal.image} />
        ))}
      </div>
    </section>
  )
}