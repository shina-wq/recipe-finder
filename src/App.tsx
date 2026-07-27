import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/home/Hero"

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Recipe grid goes here — Phase 2 */}
      </main>
    </>
  )
}

export default App