import { Link } from "react-router-dom"
import { UtensilsCrossed } from "lucide-react"

const EXPLORE_LINKS = [
  { label: "Discover Recipes", to: "/" },
  { label: "Search", to: "/" },
  { label: "My Favorites", to: "/favorites" },
]

const RESOURCE_LINKS = [
  { label: "About Us", to: "#" }, // TODO: no About page yet
  { label: "Privacy Policy", to: "#" }, // TODO
  { label: "Terms of Service", to: "#" }, // TODO
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-4 bg-ink text-paper/70">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[2fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <UtensilsCrossed className="size-4" />
              </span>
              <span className="font-display text-xl font-bold text-paper">Forkful</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm text-paper/60">
              Your gateway to culinary inspiration. Discover, save, and create delicious meals
              from around the world.
            </p>

            <div className="mt-4 flex items-center gap-3 text-paper/60">
              <a href="#" aria-label="Instagram" className="hover:text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-primary">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.6L4.5 22H1.4l8.1-9.3L1 2h7l4.9 6.1L18.9 2Zm-1.2 18h1.9L7.1 4H5.1l12.6 16Z" />
                </svg>
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-primary">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.75c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.34 1.12 2.91.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.56 1.4.2 2.44.1 2.7.65.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.04.36.32.68.95.68 1.92v2.85c0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore column */}
          <nav aria-label="Explore">
            <h3 className="font-display font-semibold text-white">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm text-paper/60">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources column */}
          <nav aria-label="Resources">
            <h3 className="font-display font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-3 text-sm text-paper/60">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.to} className="hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/10 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Forkful. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}