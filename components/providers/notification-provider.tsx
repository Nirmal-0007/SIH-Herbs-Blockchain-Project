"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  removeNotification: (id: string) => void
  clearAll: () => void
  unreadCount: number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "info",
      title: "System Update",
      message: "Blockchain network synchronized successfully",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Compliance Alert",
      message: "Product batch #BT-2024-001 requires verification",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
    },
    {
      id: "3",
      type: "success",
      title: "Transaction Confirmed",
      message: "Smart contract executed successfully",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
    },
  ])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        removeNotification,
        clearAll,
        unreadCount,
      }}
    >
      {children}
      <NotificationToasts />
    </NotificationContext.Provider>
  )
}

function NotificationToasts() {
  const { notifications, removeNotification } = useNotifications()
  const recentNotifications = notifications
    .filter((n) => Date.now() - n.timestamp.getTime() < 5000 && !n.read)
    .slice(0, 3)

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {recentNotifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-background border border-border rounded-lg shadow-lg p-4 max-w-sm animate-in slide-in-from-right"
        >
          <div className="flex items-start gap-3">
            {getIcon(notification.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{notification.title}</p>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
