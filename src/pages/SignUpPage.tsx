import { AuthLayout } from "@/components/auth/AuthLayout"
import { SignupForm } from "@/components/auth/signup-form"
import { Seo } from "@/components/shared/Seo"

export function SignUpPage() {
  return (
    <>
      <Seo title="Create Account" path="/sign-up" noindex />
      <AuthLayout
        heading="Claim your"
        headingAccent="shelf."
        description="Create an account to save recipes, and create, edit, and publish your own."
        footerText="Already have a shelf?"
        footerLinkLabel="Sign in here"
        footerLinkTo="/sign-in"
      >
        <SignupForm />
      </AuthLayout>
    </>
  )
}