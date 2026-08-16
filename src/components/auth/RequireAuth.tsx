import type { ReactNode } from "react"
import { useAuth } from "@/hooks/useAuth"
import { CenteredMessage } from "@/components/shared/CenteredMessage"

interface RequireAuthProps {
  icon: ReactNode
  message: string
  children: ReactNode
}

export function RequireAuth({ icon, message, children }: RequireAuthProps) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <CenteredMessage icon={icon} message={message} ctaLabel="Sign in" ctaTo="/sign-in" />
  }

  return children
}