import { SettingsIcon } from "lucide-react"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { CenteredMessage } from "@/components/shared/CenteredMessage"

export function SettingsPage() {
  return (
    <div className="bg-background/95">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>

        <RequireAuth
          icon={<SettingsIcon className="size-10 text-muted-foreground" />}
          message="Sign in to manage your settings."
        >
          <CenteredMessage
            icon={<SettingsIcon className="size-10 text-muted-foreground" />}
            message="Account settings are on the way - check back soon."
            ctaLabel="Back to recipes"
            ctaTo="/"
            ctaVariant="outline"
          />
        </RequireAuth>
      </main>
    </div>
  )
}