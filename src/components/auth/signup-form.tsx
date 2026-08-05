import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signUpSchema, type SignUpValues } from "@/lib/schemas/auth"
import { AUTH_INPUT_CLASS, AUTH_LABEL_CLASS } from "./authFieldStyles"

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
      // TODO: wire up to real sign-up endpoint once backend strategy is decided
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log("Sign up", values)
      navigate("/")
    } catch {
      setServerError("Something went wrong. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <FieldDescription>We'll only use this to contact you about your account.</FieldDescription>
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
      </FieldGroup>
    </form>
  )
}