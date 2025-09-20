import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/components/providers/auth-provider"
import { NotificationProvider } from "@/components/providers/notification-provider"
import { SettingsProvider } from "@/components/providers/settings-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "HerbTrust Supply Chain Dashboard",
  description: "Blockchain-powered supply chain management platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider>
            <SettingsProvider>
              <AuthProvider>
                <NotificationProvider>{children}</NotificationProvider>
              </AuthProvider>
            </SettingsProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
