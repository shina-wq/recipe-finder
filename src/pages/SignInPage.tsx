import { AuthLayout } from "@/components/auth/AuthLayout"
import { LoginForm } from "@/components/auth/login-form"

export function SignInPage() {
  return (
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
  )
}