import { useQuery } from "@tanstack/react-query"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getRecipeTags } from "@/api/recipes"
import { recipeKeys } from "@/lib/queryKeys"
import { useSearchNavigation } from "@/hooks/useSearchNavigation"
import { HeroIllustration } from "./HeroIllustration"

const TRENDING_TAG_COUNT = 4

export function Hero() {
  const { query, setQuery, submitNow } = useSearchNavigation()

  const { data: tags } = useQuery({
    queryKey: recipeKeys.tags(),
    queryFn: getRecipeTags,
    staleTime: Infinity,
  })

  const trendingTags = tags?.slice(0, TRENDING_TAG_COUNT) ?? []

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2 md:gap-8">
      <div className="text-center md:text-left">
        <Badge className="mb-4">Discover Culinary Excellence</Badge>

        <h1 className="font-display text-4xl font-bold text-balance text-foreground sm:text-5xl">
          Cook with <span className="text-primary">Passion</span>,<br />
          Eat with Pleasure.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base text-foreground-muted sm:text-lg md:mx-0">
          Explore thousands of recipes from around the world. Find your next
          favorite meal today.
        </p>

        <form onSubmit={submitNow} className="mx-auto mt-8 max-w-xl md:mx-0">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-5 z-10 size-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for recipes (e.g., 'Pasta', 'Chicken')..."
              className="h-16 rounded-full border border-ink/10 bg-white py-3 pr-32 pl-12 shadow-card sm:pr-36"
            />

            <Button
              type="submit"
              size="lg"
              className="absolute top-1/2 right-2 h-12 -translate-y-1/2 rounded-full shadow-sm px-6"
            >
              Search
            </Button>
          </div>
        </form>

        {trendingTags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground md:justify-start">
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
      </div>

      <HeroIllustration />
    </section>
  )
}