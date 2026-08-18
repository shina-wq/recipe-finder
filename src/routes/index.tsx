import { createBrowserRouter } from "react-router-dom"
import { Layout } from "@/App"
import { HomePage } from "@/pages/HomePage"
import { RecipeDetailsPage } from "@/pages/RecipeDetailsPage"
import { CategoriesPage } from "@/pages/CategoriesPage"
import { FavoritesPage } from "@/pages/FavoritesPage"
import { SignInPage } from "@/pages/SignInPage"
import { SignUpPage } from "@/pages/SignUpPage"
import { MyRecipesPage } from "@/pages/MyRecipesPage"
import { RecipeFormPage } from "@/pages/RecipeFormPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ErrorPage } from "@/pages/ErrorPage"

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "recipes/:id", element: <RecipeDetailsPage /> },
          { path: "categories/:mealType", element: <CategoriesPage /> },
          { path: "favorites", element: <FavoritesPage /> },
          { path: "my-recipes", element: <MyRecipesPage /> },
          { path: "my-recipes/new", element: <RecipeFormPage /> },
          { path: "my-recipes/:id/edit", element: <RecipeFormPage /> },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
    ],
  },
])