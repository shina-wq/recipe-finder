import { createBrowserRouter } from "react-router-dom"
import { Layout } from "@/App"
import { HomePage } from "@/pages/HomePage"
import { RecipeDetailsPage } from "@/pages/RecipeDetailsPage"
import { CategoriesPage } from "@/pages/CategoriesPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "recipes/:id", element: <RecipeDetailsPage /> },
      { path: "categories/:mealType?", element: <CategoriesPage /> },
    ],
  },
])