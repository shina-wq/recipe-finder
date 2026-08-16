import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChefHat, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RequireAuth } from "@/components/auth/RequireAuth"
import { useAuth } from "@/hooks/useAuth"
import { useRecipes } from "@/hooks/useRecipes"
import type { RecipeInput } from "@/lib/recipesStore"
import type { Recipe } from "@/types/recipe"
import { DynamicListField } from "@/components/recipes/form/DynamicListField"
import { MealTypeToggle, TagInput, FORM_INPUT_CLASS } from "@/components/recipes/form/RecipeFormControls"
import { recipeFormSchema, DIFFICULTIES, type RecipeFormInput, type RecipeFormValues } from "@/lib/schemas/recipe"
import { cn } from "@/lib/utils"

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

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormInput, unknown, RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: toFormValues(existingRecipe),
  })

  const imageUrl = watch("image")

  if (isEditMode && isAuthenticated && !existingRecipe) {
    return (
      <div className="bg-background/95">
        <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <p className="text-foreground-muted">Couldn't find that recipe.</p>
          <Link to="/my-recipes" className="mt-2 inline-block text-primary hover:underline">
            Back to My Recipes
          </Link>
        </main>
      </div>
    )
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
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <RequireAuth
          icon={<ChefHat className="size-10 text-muted-foreground" />}
          message="Sign in to create and manage your own recipes."
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={isSubmitting}>
            <div className="flex items-center justify-between">
              <h1 className="font-display text-2xl font-bold text-foreground">
                {isEditMode ? "Edit Recipe" : "New Recipe"}
              </h1>
            </div>

            {/* Basic Info */}
            <section className="mt-8">
              <h2 className="font-display text-lg font-semibold text-foreground">Basic Info</h2>

              <FieldGroup className="mt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field data-invalid={!!errors.name}>
                    <FieldLabel htmlFor="name">Recipe name</FieldLabel>
                    <Input
                      id="name"
                      placeholder="Weeknight Garlic Butter Pasta"
                      className={FORM_INPUT_CLASS}
                      {...register("name")}
                    />
                    <FieldError errors={errors.name ? [errors.name] : undefined} />
                  </Field>

                  <Field data-invalid={!!errors.cuisine}>
                    <FieldLabel htmlFor="cuisine">Cuisine</FieldLabel>
                    <Input
                      id="cuisine"
                      placeholder="Italian"
                      className={FORM_INPUT_CLASS}
                      {...register("cuisine")}
                    />
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
                    <Input
                      id="servings"
                      type="number"
                      min={1}
                      className={FORM_INPUT_CLASS}
                      {...register("servings")}
                    />
                    <FieldError errors={errors.servings ? [errors.servings] : undefined} />
                  </Field>

                  <Field data-invalid={!!errors.prepTimeMinutes}>
                    <FieldLabel htmlFor="prepTime">Prep time (min)</FieldLabel>
                    <Input
                      id="prepTime"
                      type="number"
                      min={0}
                      className={FORM_INPUT_CLASS}
                      {...register("prepTimeMinutes")}
                    />
                    <FieldError errors={errors.prepTimeMinutes ? [errors.prepTimeMinutes] : undefined} />
                  </Field>

                  <Field data-invalid={!!errors.cookTimeMinutes}>
                    <FieldLabel htmlFor="cookTime">Cook time (min)</FieldLabel>
                    <Input
                      id="cookTime"
                      type="number"
                      min={0}
                      className={FORM_INPUT_CLASS}
                      {...register("cookTimeMinutes")}
                    />
                    <FieldError errors={errors.cookTimeMinutes ? [errors.cookTimeMinutes] : undefined} />
                  </Field>
                </div>

                <Field data-invalid={!!errors.caloriesPerServing}>
                  <FieldLabel htmlFor="calories">Calories per serving</FieldLabel>
                  <Input
                    id="calories"
                    type="number"
                    min={0}
                    className={FORM_INPUT_CLASS}
                    {...register("caloriesPerServing")}
                  />
                  <FieldError errors={errors.caloriesPerServing ? [errors.caloriesPerServing] : undefined} />
                </Field>
              </FieldGroup>
            </section>

            {/* Meal Types */}
            <section className="mt-8">
              <h2 className="font-display text-lg font-semibold text-foreground">Meal Types</h2>
              <Field data-invalid={!!errors.mealType} className="mt-4">
                <Controller
                  control={control}
                  name="mealType"
                  render={({ field }) => <MealTypeToggle value={field.value} onChange={field.onChange} />}
                />
                <FieldError errors={errors.mealType ? [errors.mealType] : undefined} />
              </Field>
            </section>

            {/* Tags */}
            <section className="mt-8">
              <h2 className="font-display text-lg font-semibold text-foreground">Tags</h2>
              <Field className="mt-4">
                <Controller
                  control={control}
                  name="tags"
                  render={({ field }) => (
                    <TagInput value={field.value ?? []} onChange={field.onChange} placeholder="Add a tag and press Enter..." />
                  )}
                />
              </Field>
            </section>

            {/* Image */}
            <section className="mt-8">
              <h2 className="font-display text-lg font-semibold text-foreground">Image</h2>
              <Field data-invalid={!!errors.image} className="mt-4">
                <FieldLabel htmlFor="image">Image URL</FieldLabel>
                <Input
                  id="image"
                  placeholder="https://..."
                  className={FORM_INPUT_CLASS}
                  {...register("image")}
                />
                <FieldError errors={errors.image ? [errors.image] : undefined} />
              </Field>

              {imageUrl && (
                <div className="mt-3 aspect-4/3 w-48 overflow-hidden rounded-xl ring-1 ring-border">
                  <img src={imageUrl} alt="Recipe preview" className="size-full object-cover" />
                </div>
              )}
            </section>

            {/* Ingredients */}
            <section className="mt-8">
              <h2 className="font-display text-lg font-semibold text-foreground">Ingredients</h2>
              <div className="mt-4">
                <DynamicListField
                  control={control}
                  register={register}
                  name="ingredients"
                  label="Ingredients"
                  placeholder="2 cups flour"
                  errorMessage={errors.ingredients?.message}
                />
              </div>
            </section>

            {/* Instructions */}
            <section className="mt-8">
              <h2 className="font-display text-lg font-semibold text-foreground">Instructions</h2>
              <div className="mt-4">
                <DynamicListField
                  control={control}
                  register={register}
                  name="instructions"
                  label="Instructions"
                  placeholder="Preheat oven to 350°F..."
                  numbered
                  errorMessage={errors.instructions?.message}
                />
              </div>
            </section>

            {/* Actions */}
            <div className="mt-10 -mx-4 flex justify-end gap-2 bg-background/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6">
              <Button variant="outline" size="sm" className="rounded-full" render={<Link to="/my-recipes" />}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="rounded-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="size-3.5 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </RequireAuth>
      </main>
    </div>
  )
}