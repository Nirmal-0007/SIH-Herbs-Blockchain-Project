"use client"
import { useSettings } from "@/components/providers/settings-provider"
import { useNotifications } from "@/components/providers/notification-provider"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Globe, Moon, Sun, Bell, Monitor, Mail, MessageSquare } from "lucide-react"

export default function SettingsPage() {
  const { settings, updateSettings, translations } = useSettings()
  const { addNotification } = useNotifications()

  const handleSave = () => {
    addNotification({
      type: "success",
      title: "Settings Saved",
      message: "Your preferences have been updated successfully.",
    })
  }

  const languages = [
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "hi", label: "हिंदी", flag: "🇮🇳" },
    { value: "mr", label: "मराठी", flag: "🇮🇳" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{translations.settings || "Settings"}</h1>
          <p className="text-muted-foreground">Manage your account preferences and system settings.</p>
        </div>

        <div className="grid gap-6">
          {/* Language & Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language & Appearance
              </CardTitle>
              <CardDescription>Customize your language and visual preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value: "en" | "hi" | "mr") => updateSettings({ language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value: "light" | "dark") => updateSettings({ theme: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        <span>Light</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        <span>Dark</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) =>
                    updateSettings({
                      notifications: { ...settings.notifications, email: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) =>
                    updateSettings({
                      notifications: { ...settings.notifications, push: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={settings.notifications.sms}
                  onCheckedChange={(checked) =>
                    updateSettings({
                      notifications: { ...settings.notifications, sms: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Dashboard Settings
              </CardTitle>
              <CardDescription>Configure dashboard behavior and refresh settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-refresh">Auto Refresh</Label>
                  <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
                </div>
                <Switch
                  id="auto-refresh"
                  checked={settings.dashboard.autoRefresh}
                  onCheckedChange={(checked) =>
                    updateSettings({
                      dashboard: { ...settings.dashboard, autoRefresh: checked },
                    })
                  }
                />
              </div>

              {settings.dashboard.autoRefresh && (
                <div className="space-y-2">
                  <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                  <Select
                    value={settings.dashboard.refreshInterval.toString()}
                    onValueChange={(value) =>
                      updateSettings({
                        dashboard: { ...settings.dashboard, refreshInterval: Number.parseInt(value) },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="px-8">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
