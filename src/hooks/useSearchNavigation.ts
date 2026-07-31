import { useEffect, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useDebouncedValue } from "./useDebouncedValue"

const MIN_QUERY_LENGTH = 2
const DEBOUNCE_MS = 400

export function useSearchNavigation() {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebouncedValue(query, DEBOUNCE_MS)
  const navigate = useNavigate()

  useEffect(() => {
    const trimmed = debouncedQuery.trim()
    if (trimmed.length >= MIN_QUERY_LENGTH) {
      navigate(`/recipes/search?q=${encodeURIComponent(trimmed)}`)
    }
  }, [debouncedQuery, navigate])

  const submitNow = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) navigate(`/recipes/search?q=${encodeURIComponent(trimmed)}`)
  }

  return { query, setQuery, submitNow }
}