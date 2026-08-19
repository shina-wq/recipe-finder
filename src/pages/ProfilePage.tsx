import { User } from "lucide-react"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { CenteredMessage } from "@/components/shared/CenteredMessage"

export function ProfilePage() {
  return (
    <div className="bg-background/95">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-bold text-foreground">My Profile</h1>

        <RequireAuth
          icon={<User className="size-10 text-muted-foreground" />}
          message="Sign in to view your profile."
        >
          <CenteredMessage
            icon={<User className="size-10 text-muted-foreground" />}
            message="Profile editing is on the way - check back soon."
            ctaLabel="Back to recipes"
            ctaTo="/"
            ctaVariant="outline"
          />
        </RequireAuth>
      </main>
    </div>
  )
}