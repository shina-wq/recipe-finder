import { Hero } from "@/components/home/Hero"
import { ExploreCategories } from "@/components/home/ExploreCategories"
import {AllRecipes} from "@/components/home/AllRecipes"
import { useSearchParams } from "react-router-dom"
import { SearchResults } from "@/components/home/SearchResults"

export function HomePage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") ?? ""

  return (
    <>
      <Hero />
      <div className="bg-white pb-16">
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-16">
          {query ? (
            <SearchResults query={query}/>
          ) : (
            <>
              <ExploreCategories />
              <AllRecipes />
            </>
          )}
        </main>
      </div>
    </>
  )
}