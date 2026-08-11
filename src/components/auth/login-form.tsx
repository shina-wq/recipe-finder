import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { login } from "@/api/auth"
import { ApiError } from "@/api/client"
import { authStore } from "@/lib/authStore"
import { signInSchema, type SignInValues } from "@/lib/schemas/auth"
import { AUTH_INPUT_CLASS, AUTH_LABEL_CLASS } from "./authFieldStyles"
import {cn} from "@/lib/utils"

export function LoginForm() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({ resolver: zodResolver(signInSchema) })

  const onSubmit = async (values: SignInValues) => {
    setServerError(null)
    try {
      const user = await login(values)
      authStore.setUser(user)
      navigate("/")
    } catch (err) {
      setServerError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={isSubmitting}>
      <fieldset disabled={isSubmitting} className="m-0 min-w-0 border-0 p-0">
        <FieldGroup>
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
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4"/>}
              </button>
            </div>

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
      </fieldset>
    </form>
  )
}