import { Hero } from "@/components/home/Hero"
import { ExploreCategories } from "@/components/home/ExploreCategories"
import {AllRecipes} from "@/components/home/AllRecipes"
import { useSearchParams } from "react-router-dom"
import { SearchResults } from "@/components/home/SearchResults"
import { Seo } from "@/components/shared/Seo"

export function HomePage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") ?? ""

  return (
    <>
      {query ? (
        <Seo title={`Search results for "${query}"`} path="/" noindex/>
      ) : (
        <Seo
          title="Discover, Sve & Create Recipes"
          description="Browse thousands of recipes by cuisine and meal type, save your favorites, and publish your own on Forkful."
          path="/"
        />
      )}

      <Hero />
      <div className="bg-background/95 pb-16">
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