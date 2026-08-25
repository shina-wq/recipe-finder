import { Controller, type Control, type FieldErrors, type UseFormRegister, type UseFormWatch } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { RecipeFormInput, RecipeFormValues } from "@/lib/schemas/recipe"
import { FORM_INPUT_CLASS, MealTypeToggle, TagInput } from "./RecipeFormControls"

interface ClassificationStepProps {
  register: UseFormRegister<RecipeFormInput>
  control: Control<RecipeFormInput>
  watch: UseFormWatch<RecipeFormInput>
  errors: FieldErrors<RecipeFormValues>
}

export function ClassificationStep({ register, control, watch, errors }: ClassificationStepProps) {
  const imageUrl = watch("image")

  return (
    <div className="space-y-8">
      <Field data-invalid={!!errors.mealType}>
        <FieldLabel>Meal types</FieldLabel>
        <Controller
          control={control}
          name="mealType"
          render={({ field }) => <MealTypeToggle value={field.value} onChange={field.onChange} />}
        />
        <FieldError errors={errors.mealType ? [errors.mealType] : undefined} />
      </Field>

      <Field>
        <FieldLabel>Tags</FieldLabel>
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <TagInput value={field.value ?? []} onChange={field.onChange} placeholder="Add a tag and press Enter..." />
          )}
        />
      </Field>

      <Field data-invalid={!!errors.image}>
        <FieldLabel htmlFor="image">Image URL</FieldLabel>
        <Input id="image" placeholder="https://..." className={FORM_INPUT_CLASS} {...register("image")} />
        <FieldError errors={errors.image ? [errors.image] : undefined} />

        {imageUrl && (
          <div className="mt-3 aspect-4/3 w-48 overflow-hidden rounded-xl ring-1 ring-border">
            <img src={imageUrl} alt="Recipe preview" className="size-full object-cover" />
          </div>
        )}
      </Field>
    </div>
  )
}