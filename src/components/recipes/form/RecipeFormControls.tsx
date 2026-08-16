import { useState, type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MEAL_TYPES } from "@/lib/mealTypes"
import { cn } from "@/lib/utils"

export const FORM_INPUT_CLASS = "bg-white"

// Meal type toggle
interface MealTypeToggleProps {
  value: string[]
  onChange: (types: string[]) => void
}

export function MealTypeToggle({ value, onChange }: MealTypeToggleProps) {
  const toggle = (type: string) => {
    onChange(value.includes(type) ? value.filter((t) => t !== type) : [...value, type])
  }

  return (
    <div className="flex flex-wrap gap-2">
      {MEAL_TYPES.map((meal) => {
        const selected = value.includes(meal.value)
        return (
          <button
            key={meal.value}
            type="button"
            onClick={() => toggle(meal.value)}
            aria-pressed={selected}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-white text-foreground-muted hover:border-primary hover:text-primary",
            )}
          >
            {meal.label}
          </button>
        )
      })}
    </div>
  )
}

// Tag chip input
interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
}

export function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [draft, setDraft] = useState("")

  const addTag = () => {
    const trimmed = draft.trim()
    if (trimmed && !value.includes(trimmed)) onChange([...value, trimmed])
    setDraft("")
  }

  const removeTag = (tag: string) => onChange(value.filter((t) => t !== tag))

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag()
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      removeTag(value[value.length - 1]!)
    }
  }

  return (
    <div
      className={cn(
        FORM_INPUT_CLASS,
        "flex min-h-11 flex-wrap items-center gap-1.5 rounded-lg border border-input px-2.5 py-1.5",
      )}
    >
      {value.map((tag) => (
        <Badge key={tag} variant="secondary" className="gap-1">
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            aria-label={`Remove ${tag}`}
            className="cursor-pointer"
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={value.length === 0 ? placeholder : undefined}
        className="min-w-24 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </div>
  )
}