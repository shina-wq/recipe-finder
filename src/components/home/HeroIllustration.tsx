import heroPizza from "@/assets/images/hero-pizza.avif"

export function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      {/* Decorative background shape */}
      <div className="absolute inset-[8%] rotate-6 rounded-[2.5rem] bg-primary/10" />

      {/* Food image */}
      <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-ink/10 shadow-card">
        <img
          src={heroPizza}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}