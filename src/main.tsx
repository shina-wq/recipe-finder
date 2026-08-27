import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import "./index.css"
import { router } from "./routes"
import { queryClient } from "./lib/queryClient.ts"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster
          position="bottom-right"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                "flex w-full items-center gap-3 rounded-xl border border-ink/10 bg-paper px-4 py-3 font-body text-sm text-ink shadow-card",
              title: "font-medium",
              description: "text-foreground-muted",
              success: "border-herb/30 bg-herb/5 [&_svg]:text-herb",
              error: "border-error/30 bg-error/5 [&_svg]:text-error",
              closeButton:
                "border-ink/10 bg-paper text-foreground-muted hover:text-foreground",
            },
          }}
        />
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>
)