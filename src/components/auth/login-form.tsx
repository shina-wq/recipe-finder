import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signInSchema, type SignInValues } from "@/lib/schemas/auth"
import { AUTH_INPUT_CLASS, AUTH_LABEL_CLASS } from "./authFieldStyles"

export function LoginForm() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({ resolver: zodResolver(signInSchema) })

  const onSubmit = async (values: SignInValues) => {
    setServerError(null)
    try {
      // TODO: wire up to real auth (DummyJSON POST /auth/login)
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log("Sign in", values)
      navigate("/")
    } catch {
      setServerError("Something went wrong. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
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
          <div className="flex items-center">
            <FieldLabel htmlFor="password" className={AUTH_LABEL_CLASS}>
              Password
            </FieldLabel>
            {/* TODO: no forgot-password flow yet */}
            <Link to="#" className="ml-auto text-sm text-primary underline-offset-4 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            {...register("password")}
            className={AUTH_INPUT_CLASS}
          />
          <FieldError errors={errors.password ? [errors.password] : undefined} />
        </Field>

        {serverError && (
          <p role="alert" className="text-sm text-error">
            {serverError}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} size="lg" className="h-11 w-full rounded-full">
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : "Sign in"}
          {!isSubmitting && <ArrowRight className="size-4" data-icon="inline-end" />}
        </Button>
      </FieldGroup>
    </form>
  )
}