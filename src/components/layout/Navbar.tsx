import { useEffect, useRef, useState } from "react"
import { Search, UtensilsCrossed, X } from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSearchOpen) inputRef.current?.focus()
  }, [isSearchOpen])

  const closeSearch = () => setIsSearchOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <UtensilsCrossed className="size-4" />
          </span>
          <span className="font-display text-xl font-bold text-foreground">forkful</span>
        </a>

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
      </nav>
    </header>
  )
}