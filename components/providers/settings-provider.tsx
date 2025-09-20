"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "hi" | "mr"
type Theme = "light" | "dark"

interface Settings {
  language: Language
  theme: Theme
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  dashboard: {
    autoRefresh: boolean
    refreshInterval: number
  }
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (updates: Partial<Settings>) => void
  translations: Record<string, string>
}

const defaultSettings: Settings = {
  language: "en",
  theme: "light",
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  dashboard: {
    autoRefresh: true,
    refreshInterval: 30,
  },
}

const translations = {
  en: {
    dashboard: "Dashboard",
    blockchain: "Blockchain",
    "supply-chain": "Supply Chain",
    "geo-tracking": "Geo Tracking",
    stakeholders: "Stakeholders",
    settings: "Settings",
    notifications: "Notifications",
    logout: "Logout",
    login: "Login",
    signup: "Sign Up",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    blockchain: "ब्लॉकचेन",
    "supply-chain": "आपूर्ति श्रृंखला",
    "geo-tracking": "भू-ट्रैकिंग",
    stakeholders: "हितधारक",
    settings: "सेटिंग्स",
    notifications: "सूचनाएं",
    logout: "लॉग आउट",
    login: "लॉग इन",
    signup: "साइन अप",
  },
  mr: {
    dashboard: "डॅशबोर्ड",
    blockchain: "ब्लॉकचेन",
    "supply-chain": "पुरवठा साखळी",
    "geo-tracking": "भू-ट्रॅकिंग",
    stakeholders: "भागधारक",
    settings: "सेटिंग्ज",
    notifications: "सूचना",
    logout: "लॉग आउट",
    login: "लॉग इन",
    signup: "साइन अप",
  },
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  useEffect(() => {
    const stored = localStorage.getItem("herbtrust-settings")
    if (stored) {
      setSettings({ ...defaultSettings, ...JSON.parse(stored) })
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.theme === "dark")
    document.documentElement.lang = settings.language
  }, [settings.theme, settings.language])

  const updateSettings = (updates: Partial<Settings>) => {
    const newSettings = { ...settings, ...updates }
    setSettings(newSettings)
    localStorage.setItem("herbtrust-settings", JSON.stringify(newSettings))
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        translations: translations[settings.language],
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
