import { useEffect, useRef, useState } from "react"
import {Link, NavLink} from "react-router-dom"
import { Search, UtensilsCrossed, X, MenuIcon } from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {cn} from "@/lib/utils"

const NAV_LINKS = [
  {label: "Home", to: "/"},
  {label: "Favorites", to: "/favorites"},
] as const

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen) inputRef.current?.focus()
  }, [isSearchOpen])

  const closeSearch = () => setIsSearchOpen(false)
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

        {/* search */}
        <div className="flex items-center gap-3">
          {isSearchOpen ? (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-150">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    ref={inputRef}
                    type="search"
                    placeholder="Search recipes..."
                    className="w-40 rounded-full pl-9 sm:w-64"
                    onBlur={(e) => !e.target.value && closeSearch()}
                    onKeyDown={(e) => e.key === "Escape" && closeSearch}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={closeSearch}
                    aria-label="Close search"
                  >
                    <X className="size-4"/>
                  </Button>
                </div>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <Search className="size-5" />
            </Button>
          )}

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