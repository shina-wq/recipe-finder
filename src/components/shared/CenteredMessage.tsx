import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface CenteredMessageProps {
  icon: ReactNode
  message: string
  ctaLabel: string
  ctaTo: string
  ctaVariant?: "default" | "outline"
}

export function CenteredMessage({ icon, message, ctaLabel, ctaTo, ctaVariant = "default" }: CenteredMessageProps) {
  return (
    <div className="mt-16 flex flex-col items-center text-center">
      {icon}
      <p className="mt-4 max-w-sm text-foreground-muted">{message}</p>
      <Button render={<Link to={ctaTo} />} variant={ctaVariant} className="mt-4 rounded-full px-6">
        {ctaLabel}
      </Button>
    </div>
  )
}