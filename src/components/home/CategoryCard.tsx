import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"

interface CategoryCardProps {
  label: string
  value: string
  image: string
}

export function CategoryCard({ label, value, image }: CategoryCardProps) {
  return (
    <Link
      to={`/categories/${value}`}
      className="group block"
    >
      <Card className="relative aspect-4/3 overflow-hidden rounded-2xl border-none p-0 shadow-card">
        <img
          src={image}
          alt={label}
          className="absolute inset-0 size-full object-cover brightness-75 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
        <span className="absolute bottom-3 left-4 font-display text-lg font-semibold text-white">
          {label}
        </span>
      </Card>
    </Link>
  )
}