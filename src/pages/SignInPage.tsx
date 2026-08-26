import { AuthLayout } from "@/components/auth/AuthLayout"
import { LoginForm } from "@/components/auth/login-form"
import { Seo } from "@/components/shared/Seo"

export function SignInPage() {
  return (
    <>
      <Seo title="Sign In" path="/sign-in" noindex />
      <AuthLayout
        heading="Welcome"
        headingAccent="back."
        description="Sign in to access your saved recipes and publish creations of your own."
        footerText="Don't have a shelf yet?"
        footerLinkLabel="Create an account"
        footerLinkTo="/sign-up"
      >
        <LoginForm />
      </AuthLayout>
    </>
  )
}