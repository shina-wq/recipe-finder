import { useEffect, useState, type FormEvent } from "react"
import { useSearchParams } from "react-router-dom"
import { useDebouncedValue } from "./useDebouncedValue"

const MIN_QUERY_LENGTH = 2
const DEBOUNCE_MS = 500

export function useSearchNavigation() {
  const [, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebouncedValue(query, DEBOUNCE_MS)

  useEffect(() => {
    const trimmed = debouncedQuery.trim()
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        trimmed.length >= MIN_QUERY_LENGTH ? next.set("q", trimmed) : next.delete("q")
        return next
      },
      {replace: true},
    )
  }, [debouncedQuery, setSearchParams])

  const submitNow = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) setSearchParams({q: trimmed})
  }

  return { query, setQuery, submitNow }
}