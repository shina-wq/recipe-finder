import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom"
import { AlertTriangle, Home, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ErrorPage() {
  const error = useRouteError()

  const is404 = isRouteErrorResponse(error) && error.status === 404

  // TODO: wire up to an error-tracking service (e.g. Sentry) once one is added.
  if (!is404) console.error(error)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" />
      </span>

      <div className="space-y-1.5">
        <h1 className="font-display text-2xl font-bold text-foreground">
          {is404 ? "Page not found" : "Something went wrong"}
        </h1>
        <p className="max-w-sm text-sm text-foreground-muted">
          {is404
            ? "The page you're looking for doesn't exist or may have moved."
            : "An unexpected error occurred. Try reloading, or head back home."}
        </p>
      </div>

      {import.meta.env.DEV && !is404 && (
        <pre className="mt-1 max-w-md overflow-x-auto rounded-lg bg-muted/40 p-3 text-left text-xs text-foreground-muted">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      )}

      <div className="mt-2 flex gap-2">
        {!is404 && (
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => window.location.reload()}
          >
            <RotateCw className="size-3.5" data-icon="inline-start" />
            Reload
          </Button>
        )}
        <Button render={<Link to="/" />} size="sm" className="rounded-full">
          <Home className="size-3.5" data-icon="inline-start" />
          Back home
        </Button>
      </div>
    </div>
  )
}