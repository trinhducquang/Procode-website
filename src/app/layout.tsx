import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./weather-effects.css"
import { ThemeProvider } from "@/components/common/ThemeProvider/theme-provider"
import CustomCursor from "@/components/custom-cursor"
import { I18nProvider } from "@/lib/i18n/i18n-context"
import { WeatherProvider } from "@/lib/weather/weather-context"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
    title: "Procode - Portfolio cá nhân chuyên nghiệp",
    description:
        "Trang web portfolio cá nhân hiện đại, chuyên nghiệp với các dự án web, thiết kế UI/UX và phát triển front-end",
    keywords: ["portfolio", "web developer", "front-end", "UI/UX", "design", "freelancer", "procode", "web design"],
    authors: [{ name: "Procode", url: "https://procode-website.vercel.app" }],
    creator: "Procode",
    publisher: "Procode",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-video-preview": -1,
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "vi_VN",
        url: "https://procode-website.vercel.app",
        title: "Procode - Portfolio cá nhân chuyên nghiệp",
        description:
            "Trang web portfolio cá nhân hiện đại, chuyên nghiệp với các dự án web, thiết kế UI/UX và phát triển front-end",
        siteName: "Procode Portfolio",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Procode Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Procode - Portfolio cá nhân chuyên nghiệp",
        description:
            "Trang web portfolio cá nhân hiện đại, chuyên nghiệp với các dự án web, thiết kế UI/UX và phát triển front-end",
        images: ["/og-image.jpg"],
    },
    alternates: {
        canonical: "https://procode-website.vercel.app",
        languages: {
            en: "https://procode-website.vercel.app/en",
            ja: "https://procode-website.vercel.app/ja",
            vi: "https://procode-website.vercel.app/vi",
        },
    },
    verification: {
        google: "google-site-verification-code",
    },
    category: "technology",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="vi" suppressHydrationWarning>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
            <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)" />
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />
        </head>
        <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <I18nProvider>
                <WeatherProvider>
                    {children}
                    <CustomCursor />
                </WeatherProvider>
            </I18nProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
