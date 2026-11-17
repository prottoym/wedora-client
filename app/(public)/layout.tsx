import { Suspense } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Suspense fallback={<div className="h-14 border-b border-white/10" />}>
        <Navbar />
      </Suspense>
      <main>{children}</main>
      <Footer />
    </>
  )
}
