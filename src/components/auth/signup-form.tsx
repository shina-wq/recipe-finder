import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Loader2, Eye, EyeOff, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createUser } from "@/api/users"
import { ApiError } from "@/api/client"
import { authStore } from "@/lib/authStore"
import type { AuthUser } from "@/types/user"
import { signUpSchema, type SignUpValues } from "@/lib/schemas/auth"
import { AUTH_INPUT_CLASS, AUTH_LABEL_CLASS } from "./authFieldStyles"
import { cn } from "@/lib/utils"

// DummyJSON's /users/add wants firstName/lastName separately; our form
// collects one "full name" field, so split it on the first space.
function splitName(fullName: string) {
  const [firstName, ...rest] = fullName.trim().split(/\s+/)
  return { firstName: firstName ?? fullName, lastName: rest.join(" ") }
}

export function SignupForm() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema) })

  const password = watch("password")
  const confirmPassword = watch("confirmPassword")
  const confirmHasValue = confirmPassword?.length > 0
  const passwordsMatch = confirmHasValue && password === confirmPassword
  const showMismatch = confirmHasValue && !passwordsMatch && !!touchedFields.confirmPassword

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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                {...register("password")}
                className={cn(AUTH_INPUT_CLASS, "pr-10")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-foreground-muted hover:text-primary cursor-pointer"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            <FieldError errors={errors.password ? [errors.password] : undefined} />
          </Field>

          <Field data-invalid={showMismatch}>
            <FieldLabel htmlFor="confirm-password" className={AUTH_LABEL_CLASS}>
              Confirm password
            </FieldLabel>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                aria-invalid={showMismatch}
                {...register("confirmPassword")}
                className={cn(
                  AUTH_INPUT_CLASS,
                  "pr-16 transition-shadow",
-                  passwordsMatch && "ring-2 ring-success/40",
                  showMismatch && "ring-2 ring-destructive/30",
                )}
              />

              {/* Match/mismatch indicator, sits left of the visibility toggle */}
              {confirmHasValue && (
                <span
                  className={cn(
                    "absolute top-1/2 right-10 -translate-y-1/2 animate-in fade-in duration-150",
                    passwordsMatch && "text-success",
                    showMismatch && "text-error",
                  )}
                >
                  {passwordsMatch ? <Check className="size-4" /> : showMismatch ? <X className="size-4" /> : null}
                </span>
              )}

              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                aria-pressed={showConfirmPassword}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-foreground-muted hover:text-primary cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            {confirmHasValue && (passwordsMatch || showMismatch) && (
              <p
                className={cn(
                  "mt-1 flex items-center gap-1 text-xs animate-in fade-in duration-150",
                  passwordsMatch ? "text-success" : "text-error",
                )}
              >
                {passwordsMatch ? "Passwords match" : "Passwords don't match"}
              </p>
            )}

            <FieldError
              errors={
                errors.confirmPassword && errors.confirmPassword.message !== "Passwords don't match"
                  ? [errors.confirmPassword]
                  : undefined
              }
            />
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