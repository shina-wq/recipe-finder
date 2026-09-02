import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { RecipeFormStep } from "@/lib/schemas/recipeFormSteps"

interface RecipeStepperProps {
  steps: RecipeFormStep[]
  currentStep: number
  onStepClick: (index: number) => void
  isStepClickable: (index: number) => boolean
}

export function RecipeStepper({ steps, currentStep, onStepClick, isStepClickable }: RecipeStepperProps) {
  return (
    <ol className="flex items-center gap-2 sm:gap-4">
      {steps.map((step, index) => {
        const isComplete = index < currentStep
        const isActive = index === currentStep
        const clickable = isStepClickable(index)

        return (
          <li key={step.id} className="flex flex-1 items-center gap-2 sm:gap-4">
            <button
              type="button"
              disabled={!clickable}
              onClick={() => onStepClick(index)}
              className={cn("flex items-center gap-2 text-left", clickable ? "cursor-pointer" : "cursor-default")}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  isActive && "bg-primary text-primary-foreground",
                  isComplete && !isActive && "bg-primary/15 text-primary",
                  !isActive && !isComplete && "bg-muted/60 text-foreground-muted",
                )}
              >
                {isComplete ? <Check className="size-3.5" /> : index + 1}
              </span>
              <span className={cn("hidden text-sm font-medium sm:block", isActive ? "text-foreground" : "text-foreground-muted")}>
                {step.label}
              </span>
            </button>

            {index < steps.length - 1 && (
              <span className={cn("h-px flex-1", isComplete ? "bg-primary/40" : "bg-ink/15")} />
            )}
          </li>
        )
      })}
    </ol>
  )
}