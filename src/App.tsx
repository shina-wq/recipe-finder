import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"

export function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}