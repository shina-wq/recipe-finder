import { Compass } from "lucide-react"
import { CenteredMessage } from "@/components/shared/CenteredMessage"

export function NotFoundPage() {
  return (
    <div className="bg-background/95">
      <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6">
        <span className="font-display text-7xl font-bold text-primary/50">404</span>
        <CenteredMessage
          icon={<Compass className="size-10 text-muted-foreground" />}
          message="We couldn't find the page you're looking for. It may have been moved or doesn't exist."
          ctaLabel="Back to recipes"
          ctaTo="/"
        />
      </main>
    </div>
  )
}