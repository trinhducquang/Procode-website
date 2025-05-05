import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CustomCursor from "@/components/custom-cursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DEW. - Portfolio cá nhân",
  description: "Trang web portfolio cá nhân hiện đại",
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="vi" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <CustomCursor />
      </ThemeProvider>
      </body>
      </html>
  )
}
