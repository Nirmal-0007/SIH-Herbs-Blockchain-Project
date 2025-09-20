"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "viewer"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false)
      return
    }

    // Check for stored user session
    const storedUser = localStorage.getItem("herbtrust-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        // Clear invalid stored data
        localStorage.removeItem("herbtrust-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Mock authentication - in real app, this would call your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email && password.length >= 6) {
        const mockUser: User = {
          id: "1",
          email,
          name: email.split("@")[0],
          role: "admin",
        }

        setUser(mockUser)
        if (typeof window !== "undefined") {
          localStorage.setItem("herbtrust-user", JSON.stringify(mockUser))
        }
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Mock signup
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email && password.length >= 6 && name) {
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          name,
          role: "viewer",
        }

        setUser(mockUser)
        if (typeof window !== "undefined") {
          localStorage.setItem("herbtrust-user", JSON.stringify(mockUser))
        }
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return false
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("herbtrust-user")
    }
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
