import { useFieldArray, type Control, type UseFormRegister } from "react-hook-form"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import type { RecipeFormInput } from "@/lib/schemas/recipe"
import { FORM_INPUT_CLASS } from "./RecipeFormControls"

interface DynamicListFieldProps {
  control: Control<RecipeFormInput>
  register: UseFormRegister<RecipeFormInput>
  name: "ingredients" | "instructions"
  label: string
  placeholder: string
  numbered?: boolean
  errorMessage?: string
}

export function DynamicListField({
  control,
  register,
  name,
  label,
  placeholder,
  numbered,
  errorMessage,
}: DynamicListFieldProps) {
  const { fields, append, remove } = useFieldArray({ control, name })

  return (
    <Field data-invalid={!!errorMessage}>
      <FieldLabel>{label}</FieldLabel>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            {numbered && (
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {index + 1}
              </span>
            )}
            <Input
              placeholder={placeholder}
              className={FORM_INPUT_CLASS}
              {...register(`${name}.${index}.value` as const)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              aria-label={`Remove ${label.toLowerCase()} ${index + 1}`}
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ value: "" })}
        className="mt-2 w-fit rounded-full"
      >
        <Plus className="size-3.5" data-icon="inline-start" />
        Add {label.toLowerCase().replace(/s$/, "")}
      </Button>

      <FieldError errors={errorMessage ? [{ message: errorMessage }] : undefined} />
    </Field>
  )
}