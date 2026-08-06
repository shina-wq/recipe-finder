import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createUser } from "@/api/users"
import { ApiError } from "@/api/client"
import { authStore } from "@/lib/authStore"
import type { AuthUser } from "@/types/user"
import { signUpSchema, type SignUpValues } from "@/lib/schemas/auth"
import { AUTH_INPUT_CLASS, AUTH_LABEL_CLASS } from "./authFieldStyles"

// DummyJSON's /users/add wants firstName/lastName separately; our form
// collects one "full name" field, so split it on the first space.
function splitName(fullName: string) {
  const [firstName, ...rest] = fullName.trim().split(/\s+/)
  return { firstName: firstName ?? fullName, lastName: rest.join(" ") }
}

export function SignupForm() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema) })

  const onSubmit = async (values: SignUpValues) => {
    setServerError(null)
    try {
      const { firstName, lastName } = splitName(values.name)

      const created = await createUser({
        firstName,
        lastName,
        username: values.username,
        email: values.email,
        password: values.password,
      })

      // No real backend session exists for this user, so accessToken/refreshToken
      // are placeholders - nothing validates them, they just satisfy the AuthUser
      // shape shared with real login.
      const demoUser: AuthUser = {
        id: created.id,
        username: created.username,
        email: created.email,
        firstName: created.firstName,
        lastName: created.lastName,
        gender: "",
        image: `https://dummyjson.com/icon/${created.username}/128`,
        accessToken: "demo-session",
        refreshToken: "demo-session",
      }

      authStore.setUser(demoUser)
      navigate("/")
    } catch (err) {
      setServerError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={isSubmitting}>
      <fieldset disabled={isSubmitting} className="m-0 min-w-0 border-0 p-0">
        <FieldGroup>
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name" className={AUTH_LABEL_CLASS}>
              Full name
            </FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="Jane Doe"
              aria-invalid={!!errors.name}
              {...register("name")}
              className={AUTH_INPUT_CLASS}
            />
            <FieldError errors={errors.name ? [errors.name] : undefined} />
          </Field>

          <Field data-invalid={!!errors.username}>
            <FieldLabel htmlFor="username" className={AUTH_LABEL_CLASS}>
              Username
            </FieldLabel>
            <Input
              id="username"
              type="text"
              placeholder="janedoe"
              aria-invalid={!!errors.username}
              {...register("username")}
              className={AUTH_INPUT_CLASS}
            />
            <FieldError errors={errors.username ? [errors.username] : undefined} />
          </Field>

          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="email" className={AUTH_LABEL_CLASS}>
              Email address
            </FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              {...register("email")}
              className={AUTH_INPUT_CLASS}
            />
            <FieldError errors={errors.email ? [errors.email] : undefined} />
          </Field>

          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password" className={AUTH_LABEL_CLASS}>
              Password
            </FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              {...register("password")}
              className={AUTH_INPUT_CLASS}
            />
            <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            <FieldError errors={errors.password ? [errors.password] : undefined} />
          </Field>

          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel htmlFor="confirm-password" className={AUTH_LABEL_CLASS}>
              Confirm password
            </FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              aria-invalid={!!errors.confirmPassword}
              {...register("confirmPassword")}
              className={AUTH_INPUT_CLASS}
            />
            <FieldError errors={errors.confirmPassword ? [errors.confirmPassword] : undefined} />
          </Field>

          {serverError && (
            <p role="alert" className="text-sm text-error">
              {serverError}
            </p>
          )}

          <Button type="submit" disabled={isSubmitting} size="lg" className="h-11 w-full rounded-full">
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : "Create account"}
            {!isSubmitting && <ArrowRight className="size-4" data-icon="inline-end" />}
          </Button>

          <p className="text-center text-xs text-foreground-muted">
            Demo API - this account won't be saved between sessions, but you can explore
            the app as this profile right now.
          </p>
        </FieldGroup>
      </fieldset>
    </form>
  )
}