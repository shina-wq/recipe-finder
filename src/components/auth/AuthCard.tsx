import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"

interface AuthCardProps {
  title: string
  description: string
  children: ReactNode
  footerText: string
  footerLinkLabel: string
  footerLinkTo: string
}

export function AuthCard({
  title,
  description,
  children,
  footerText,
  footerLinkLabel,
  footerLinkTo,
}: AuthCardProps) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-foreground-muted">{description}</p>
      </div>

      <Card className="p-6 shadow-card">{children}</Card>

      <p className="mt-6 text-center text-sm text-foreground-muted">
        {footerText}{" "}
        <Link to={footerLinkTo} className="font-medium text-primary hover:underline">
          {footerLinkLabel}
        </Link>
      </p>
    </main>
  )
}