import { createBrowserRouter } from "react-router-dom"
import { Layout } from "@/App"
import { HomePage } from "@/pages/HomePage"
import { RecipeDetailsPage } from "@/pages/RecipeDetailsPage"
import { CategoriesPage } from "@/pages/CategoriesPage"
import { FavoritesPage } from "@/pages/FavoritesPage"
import { SignInPage } from "@/pages/SignInPage"
import { SignUpPage } from "@/pages/SignUpPage"
import { MyRecipesPage } from "@/pages/MyRecipesPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "recipes/:id", element: <RecipeDetailsPage /> },
      { path: "categories/:mealType", element: <CategoriesPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "my-recipes", element: <MyRecipesPage /> },
    ],
  },
  { path: "/sign-in", element: <SignInPage /> },
  { path: "/sign-up", element: <SignUpPage /> },
])