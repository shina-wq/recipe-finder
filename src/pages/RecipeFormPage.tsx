import { useState, type KeyboardEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, ArrowRight, ChefHat, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { useAuth } from "@/hooks/useAuth"
import { useRecipes } from "@/hooks/useRecipes"
import type { RecipeInput } from "@/lib/recipesStore"
import type { Recipe } from "@/types/recipe"
import { DynamicListField } from "@/components/recipes/form/DynamicListField"
import { BasicsStep } from "@/components/recipes/form/BasicsStep"
import { ClassificationStep } from "@/components/recipes/form/ClassificationStep"
import { RecipeStepper } from "@/components/recipes/form/RecipeStepper"
import { RECIPE_FORM_STEPS } from "@/lib/schemas/recipeFormSteps"
import { recipeFormSchema, type RecipeFormInput, type RecipeFormValues } from "@/lib/schemas/recipe"
import { Seo } from "@/components/shared/Seo"

const DEFAULT_VALUES: RecipeFormValues = {
  name: "",
  cuisine: "",
  difficulty: "Easy",
  servings: 4,
  prepTimeMinutes: 0,
  cookTimeMinutes: 0,
  caloriesPerServing: 0,
  mealType: [],
  tags: [],
  image: "",
  ingredients: [{ value: "" }],
  instructions: [{ value: "" }],
}

function toFormValues(recipe: Recipe | undefined): RecipeFormValues {
  if (!recipe) return DEFAULT_VALUES
  return {
    name: recipe.name,
    cuisine: recipe.cuisine,
    difficulty: recipe.difficulty,
    servings: recipe.servings,
    prepTimeMinutes: recipe.prepTimeMinutes,
    cookTimeMinutes: recipe.cookTimeMinutes,
    caloriesPerServing: recipe.caloriesPerServing,
    mealType: recipe.mealType,
    tags: recipe.tags,
    image: recipe.image,
    ingredients: recipe.ingredients.map((value) => ({ value })),
    instructions: recipe.instructions.map((value) => ({ value })),
  }
}

export function RecipeFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)
  const recipeId = Number(id)

  const { isAuthenticated } = useAuth()
  const { getRecipeById, addRecipe, updateRecipe } = useRecipes()
  const existingRecipe = isEditMode ? getRecipeById(recipeId) : undefined

  const [currentStep, setCurrentStep] = useState(0)
  const isLastStep = currentStep === RECIPE_FORM_STEPS.length - 1

  const {
    register,
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormInput, unknown, RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: toFormValues(existingRecipe),
  })

  if (isEditMode && isAuthenticated && !existingRecipe) {
    return (
      <div className="bg-background/95">
        <Seo
          title={isEditMode ? "Edit Recipe" : "New Recipe"}
          path={isEditMode ? `/my-recipes/${id}/edit` : "/my-recipes/new"}
          noindex
        />
        <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <p className="text-foreground-muted">Couldn't find that recipe.</p>
          <Link to="/my-recipes" className="mt-2 inline-block text-primary hover:underline">
            Back to My Recipes
          </Link>
        </main>
      </div>
    )
  }

  const goNext = async () => {
    // Create mode: gate advancement on the current step's own fields validating.
    // Edit mode: data already exists and is presumed valid, so skip the gate.
    if (!isEditMode) {
      const valid = await trigger(RECIPE_FORM_STEPS[currentStep]!.fields)
      if (!valid) return
    }
    setCurrentStep((step) => Math.min(step + 1, RECIPE_FORM_STEPS.length - 1))
  }

  const goBack = () => setCurrentStep((step) => Math.max(step - 1, 0))

  // Create mode: only steps already passed are safe to jump back to.
  // Edit mode: every step holds valid data, so jump anywhere.
  const isStepClickable = (index: number) => isEditMode || index < currentStep

  const jumpToStep = (index: number) => {
    if (isStepClickable(index)) setCurrentStep(index)
  }

  // Enter shouldn't submit the whole form from a mid-flow step - advance instead.
  // Bail if something upstream (e.g. the tag input's own Enter handler) already
  // handled the key, or if we're on the last step where submitting is correct.
  const handleFormKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter" || e.defaultPrevented || isLastStep) return
    if ((e.target as HTMLElement).tagName === "TEXTAREA") return
    e.preventDefault()
    goNext()
  }

  const onSubmit = (values: RecipeFormValues) => {
    const payload: RecipeInput = {
      name: values.name,
      cuisine: values.cuisine,
      difficulty: values.difficulty,
      servings: values.servings,
      prepTimeMinutes: values.prepTimeMinutes,
      cookTimeMinutes: values.cookTimeMinutes,
      caloriesPerServing: values.caloriesPerServing,
      mealType: values.mealType,
      tags: values.tags,
      image: values.image ?? "",
      ingredients: values.ingredients.map((row) => row.value),
      instructions: values.instructions.map((row) => row.value),
    }

    if (isEditMode && existingRecipe) {
      updateRecipe(existingRecipe.id, payload)
    } else {
      addRecipe(payload)
    }

    navigate("/my-recipes")
  }

  return (
    <div className="bg-background/95">
      <Seo
        title={isEditMode ? "Edit Recipe" : "New Recipe"}
        path={isEditMode ? `/my-recipes/${id}/edit` : "/my-recipes/new"}
        noindex
      />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <RequireAuth
          icon={<ChefHat className="size-10 text-muted-foreground" />}
          message="Sign in to create and manage your own recipes."
        >
          <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleFormKeyDown} noValidate aria-busy={isSubmitting}>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {isEditMode ? "Edit Recipe" : "New Recipe"}
            </h1>

            <Card className="mt-6 shadow-card">
              <CardHeader className="border-b border-ink/8">
                <RecipeStepper
                  steps={RECIPE_FORM_STEPS}
                  currentStep={currentStep}
                  onStepClick={jumpToStep}
                  isStepClickable={isStepClickable}
                />
              </CardHeader>

              <CardContent>
                {currentStep === 0 && <BasicsStep register={register} control={control} errors={errors} />}

                {currentStep === 1 && (
                  <ClassificationStep register={register} control={control} watch={watch} errors={errors} />
                )}

                {currentStep === 2 && (
                  <DynamicListField
                    control={control}
                    register={register}
                    name="ingredients"
                    label="Ingredients"
                    placeholder="2 cups flour"
                    errorMessage={errors.ingredients?.message}
                  />
                )}

                {currentStep === 3 && (
                  <DynamicListField
                    control={control}
                    register={register}
                    name="instructions"
                    label="Instructions"
                    placeholder="Preheat oven to 350°F..."
                    numbered
                    errorMessage={errors.instructions?.message}
                  />
                )}
              </CardContent>
            </Card>

            <div className="mt-6 -mx-4 flex items-center justify-between gap-2 bg-background/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6">
              <div>
                {currentStep > 0 && (
                  <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={goBack}>
                    <ArrowLeft className="size-3.5" data-icon="inline-start" />
                    Back
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full" render={<Link to="/my-recipes" />}>
                  Cancel
                </Button>

                {isLastStep || isEditMode ? (
                  <Button type="submit" size="sm" className="rounded-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="size-3.5 animate-spin" />}
                    Save
                  </Button>
                ) : (
                  <Button type="button" size="sm" className="rounded-full" onClick={goNext}>
                    Next
                    <ArrowRight className="size-3.5" data-icon="inline-end" />
                  </Button>
                )}
              </div>
            </div>
          </form>
        </RequireAuth>
      </main>
    </div>
  )
}