import { Hero } from "@/components/home/Hero"
import { ExploreCategories } from "@/components/home/ExploreCategories"

export function HomePage() {
  return (
    <>
      <Hero />
      <div className="bg-white">
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <ExploreCategories />
        </main>
      </div>
    </>
  )
}