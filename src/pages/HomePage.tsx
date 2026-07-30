import { Hero } from "@/components/home/Hero"
import { ExploreCategories } from "@/components/home/ExploreCategories"
import { FeaturedRecipes } from "@/components/home/FeaturedRecipes"

export function HomePage() {
  return (
    <>
      <Hero />
      <div className="bg-white pb-16">
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-16">
          <ExploreCategories />
          <FeaturedRecipes />
        </main>
      </div>
    </>
  )
}