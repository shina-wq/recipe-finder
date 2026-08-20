import { useEffect, useRef, useState } from "react"

interface UseIntersectionObserverOptions {
  rootMargin?: string
  enabled?: boolean
}

export function useIntersectionObserver<T extends Element>({
  rootMargin = "100px",
  enabled = true,
}: UseIntersectionObserverOptions = {}) {
  const targetRef = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const target = targetRef.current
    if (!target || !enabled) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry?.isIntersecting ?? false),
      { rootMargin },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [rootMargin, enabled])

  return { targetRef, isIntersecting }
}