import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, UtensilsCrossed } from "lucide-react"

interface AuthLayoutProps {
  heading: string
  headingAccent: string
  description: string
  footerText: string
  footerLinkLabel: string
  footerLinkTo: string
  children: ReactNode
}

export function AuthLayout({
  heading,
  headingAccent,
  description,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-primary sm:top-8 sm:left-8"
      >
        <ArrowLeft className="size-4" />
        Back to recipes
      </Link>

      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <UtensilsCrossed className="size-4" />
          </span>
          <span className="font-display text-xl font-bold text-foreground">forkful</span>
        </Link>

        <h1 className="mt-6 font-display text-4xl leading-tight font-bold text-foreground">
          {heading} <span className="text-primary">{headingAccent}</span>
        </h1>

        <p className="mt-4 text-foreground-muted">{description}</p>

        <div className="mt-8">{children}</div>

        <p className="mt-8 text-sm text-foreground-muted">
          {footerText}{" "}
          <Link to={footerLinkTo} className="font-semibold text-foreground hover:text-primary">
            {footerLinkLabel}
          </Link>
        </p>
      </div>
    </div>
  )
}