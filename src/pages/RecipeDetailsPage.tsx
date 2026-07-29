import { useParams } from "react-router-dom"

export function RecipeDetailsPage() {
  const { id } = useParams()

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <p className="text-foreground-muted">Recipe details for #{id} — coming soon.</p>
    </main>
  )
}