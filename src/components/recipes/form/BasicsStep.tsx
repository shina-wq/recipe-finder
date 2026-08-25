import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { DIFFICULTIES, type RecipeFormInput, type RecipeFormValues } from "@/lib/schemas/recipe"
import { FORM_INPUT_CLASS } from "./RecipeFormControls"
import { cn } from "@/lib/utils"

interface BasicsStepProps {
  register: UseFormRegister<RecipeFormInput>
  control: Control<RecipeFormInput>
  errors: FieldErrors<RecipeFormValues>
}

export function BasicsStep({ register, control, errors }: BasicsStepProps) {
  return (
    <FieldGroup>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Recipe name</FieldLabel>
          <Input id="name" placeholder="Weeknight Garlic Butter Pasta" className={FORM_INPUT_CLASS} {...register("name")} />
          <FieldError errors={errors.name ? [errors.name] : undefined} />
        </Field>

        <Field data-invalid={!!errors.cuisine}>
          <FieldLabel htmlFor="cuisine">Cuisine</FieldLabel>
          <Input id="cuisine" placeholder="Italian" className={FORM_INPUT_CLASS} {...register("cuisine")} />
          <FieldError errors={errors.cuisine ? [errors.cuisine] : undefined} />
        </Field>
      </div>

      <Field data-invalid={!!errors.difficulty}>
        <FieldLabel>Difficulty</FieldLabel>
        <Controller
          control={control}
          name="difficulty"
          render={({ field }) => (
            <div className="flex gap-2">
              {DIFFICULTIES.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => field.onChange(level)}
                  aria-pressed={field.value === level}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    field.value === level
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-white text-foreground-muted hover:border-primary hover:text-primary",
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          )}
        />
        <FieldError errors={errors.difficulty ? [errors.difficulty] : undefined} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field data-invalid={!!errors.servings}>
          <FieldLabel htmlFor="servings">Servings</FieldLabel>
          <Input id="servings" type="number" min={1} className={FORM_INPUT_CLASS} {...register("servings")} />
          <FieldError errors={errors.servings ? [errors.servings] : undefined} />
        </Field>

        <Field data-invalid={!!errors.prepTimeMinutes}>
          <FieldLabel htmlFor="prepTime">Prep time (min)</FieldLabel>
          <Input id="prepTime" type="number" min={0} className={FORM_INPUT_CLASS} {...register("prepTimeMinutes")} />
          <FieldError errors={errors.prepTimeMinutes ? [errors.prepTimeMinutes] : undefined} />
        </Field>

        <Field data-invalid={!!errors.cookTimeMinutes}>
          <FieldLabel htmlFor="cookTime">Cook time (min)</FieldLabel>
          <Input id="cookTime" type="number" min={0} className={FORM_INPUT_CLASS} {...register("cookTimeMinutes")} />
          <FieldError errors={errors.cookTimeMinutes ? [errors.cookTimeMinutes] : undefined} />
        </Field>
      </div>

      <Field data-invalid={!!errors.caloriesPerServing}>
        <FieldLabel htmlFor="calories">Calories per serving</FieldLabel>
        <Input id="calories" type="number" min={0} className={FORM_INPUT_CLASS} {...register("caloriesPerServing")} />
        <FieldError errors={errors.caloriesPerServing ? [errors.caloriesPerServing] : undefined} />
      </Field>
    </FieldGroup>
  )
}