import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "@/components/Providers"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TeamTracker",
  description: "HITTA DITT JAKTLAG",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="min-h-full min-w-full bg-primarybg">
      <Providers>
        <body className={cn(inter.className)}>{children}</body>
      </Providers>
    </html>
  )
}
