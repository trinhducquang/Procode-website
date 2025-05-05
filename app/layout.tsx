import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CustomCursor from "@/components/custom-cursor"
import { I18nProvider } from "@/lib/i18n/i18n-context"

const inter = Inter({ subsets: ["latin"], display: "swap" })

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
            <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)" />
        </head>
        <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <I18nProvider>
                {children}
                <CustomCursor />
            </I18nProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
