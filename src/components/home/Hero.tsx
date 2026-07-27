import { useState, type FormEvent } from "react"
import { useQuery } from "@tanstack/react-query"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getRecipeTags } from "@/api/recipes"
import { recipeKeys } from "@/lib/queryKeys"

const TRENDING_TAG_COUNT = 4

export function Hero() {
  const [query, setQuery] = useState("")

  const {data: tags} = useQuery({
    queryKey: recipeKeys.tags(),
    queryFn: getRecipeTags,
    staleTime: Infinity,
  })

  const trendingTags = tags?.slice(0, TRENDING_TAG_COUNT) ?? []

  // TODO: wire to the recipes route for search/filtering
  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    console.log("search:", query)
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <Badge className="mb-4">Discover Culinary Excellence</Badge>

      <h1 className="font-display text-4xl font-bold text-balance text-foreground sm:text-5xl">
        Cook with <span className="text-primary">Passion</span>,<br />
        Eat with Pleasure.
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-base text-foreground-muted sm:text-lg">
        Explore thousands of recipes from around the world. Find your next
        favorite meal today.
      </p>

      <form onSubmit={handleSearch} className="mx-auto mt-8 flex max-w-xl gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for recipes (e.g., 'Pasta', 'Chicken')..."
            className="h-11 rounded-full bg-white pl-9 shadow-card"
          />
        </div>
        <Button type="submit" size="lg" className="h-11 rounded-full px-8 shadow-card">
          Search
        </Button>
      </form>

      {trendingTags.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Trending:</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className="rounded-full px-1 font-medium text-foreground-muted underline-offset-2 hover:text-primary hover:underline cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}