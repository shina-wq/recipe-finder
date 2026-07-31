import { useState } from "react"
import {Link, NavLink} from "react-router-dom"
import { UtensilsCrossed, X, MenuIcon } from "lucide-react"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

const NAV_LINKS = [
  {label: "Home", to: "/"},
  {label: "Favorites", to: "/favorites"},
] as const

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  const navLinkClass = ({ isActive}: {isActive: boolean}) =>
    cn(
      "text-sm font-medium text-foreground-muted transition-colors hover:text-primary",
      isActive && "text-primary",
    )

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <UtensilsCrossed className="size-4" />
          </span>
          <span className="font-display text-xl font-bold text-foreground">forkful</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop auth actions */}
          <Link
            to="/sign-in"
            className="hidden text-sm font-medium text-foreground-muted hover:text-primary sm:block"
          >
            Sign in
          </Link>

          <Button
            render={<Link to="/sign-up" />}
            className="hidden rounded-full px-4 sm:inline-flex"
          >
            Get Started
          </Button>

          {/* Mobile hamburger toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="size-5"/> : <MenuIcon className="size-5"/>}
          </Button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="animate-in fade-in slide-in-from-top-2 border-t border-border bg-background px-4 py-4 duration-150 sm:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={navLinkClass}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="flex flex-col gap-3 border-t border-border pt-4">
              <Link
                to="/sign-in"
                onClick={closeMenu}
                className="text-sm font-medium text-foreground-muted hover:text-primary"
              >
                Sign in
              </Link>
              <Button render={<Link to="/sign-up" onClick={closeMenu} />} size="sm" className="rounded-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}