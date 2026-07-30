import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "./components/layout/Footer"

export function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}