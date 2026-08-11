import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { UtensilsCrossed, X, MenuIcon, LogOut, Bookmark, SettingsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Favorites", to: "/favorites" },
] as const

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const closeMenu = () => setIsMenuOpen(false)

  const handleSignOut = () => {
    logout()
    closeMenu()
    navigate("/")
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium text-foreground-muted transition-colors hover:text-primary",
      isActive && "text-primary",
    )

  const initials = user ? `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase() : ""

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
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="hidden sm:block" aria-label="Account menu">
                <Avatar className="size-9">
                  <AvatarImage src={user.image} alt={user.username} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="flex items-center gap-3 px-1.5 py-2">
                  <Avatar className="size-9">
                    <AvatarImage src={user.image} alt={user.username} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem render={<Link to="/favorites" />}>
                    <Bookmark className="size-4" data-icon="inline-start" />
                    Your shelf
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon className="size-4" data-icon="inline-start" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
                  <LogOut className="size-4" data-icon="inline-start" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
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
            </>
          )}

          {/* Mobile hamburger toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="size-5" /> : <MenuIcon className="size-5" />}
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
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage src={user.image} alt={user.username} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full" onClick={handleSignOut}>
                    <LogOut className="size-4" data-icon="inline-start" />
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    onClick={closeMenu}
                    className="text-sm font-medium text-foreground-muted hover:text-primary"
                  >
                    Sign in
                  </Link>
                  <Button
                    render={<Link to="/sign-up" onClick={closeMenu} />}
                    size="sm"
                    className="rounded-full"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}