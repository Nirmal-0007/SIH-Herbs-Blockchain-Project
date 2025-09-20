"use client"

import React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  MapPin,
  Truck,
  FileText,
  QrCode,
  Shield,
  Users,
  Settings,
  Blocks,
  LogOut,
  Camera,
  Search,
  HelpCircle,
} from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { useNotifications } from "@/components/providers/notification-provider"
import { useSettings } from "@/components/providers/settings-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { NotificationPanel } from "@/components/notification-panel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: BarChart3,
    key: "dashboard",
    description: "Overview & Analytics",
  },
  {
    name: "Supply Chain",
    href: "/supply-chain",
    icon: Truck,
    key: "supply-chain",
    description: "Track Products",
  },
  {
    name: "Geo-Tracking",
    href: "/geo-tracking",
    icon: MapPin,
    key: "geo-tracking",
    description: "Location Monitoring",
  },
  {
    name: "Blockchain",
    href: "/blockchain",
    icon: Blocks,
    key: "blockchain",
    description: "Network Status",
  },
  {
    name: "Smart Contracts",
    href: "/smart-contracts",
    icon: FileText,
    key: "smart-contracts",
    description: "Contract Management",
  },
  {
    name: "QR Verification",
    href: "/qr-verification",
    icon: QrCode,
    key: "qr-verification",
    description: "Product Verification",
  },
  {
    name: "QR Scanner",
    href: "/qr-scanner",
    icon: Camera,
    key: "qr-scanner",
    description: "Scan & Verify",
  },
  {
    name: "Compliance",
    href: "/compliance",
    icon: Shield,
    key: "compliance",
    description: "Regulatory Checks",
  },
  {
    name: "Stakeholders",
    href: "/stakeholders",
    icon: Users,
    key: "stakeholders",
    description: "Manage Partners",
  },
]

const generateBreadcrumbs = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs = [{ name: "Dashboard", href: "/" }]

  segments.forEach((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const navItem = navigation.find((item) => item.href === href)
    if (navItem) {
      breadcrumbs.push({ name: navItem.name, href })
    }
  })

  return breadcrumbs
}

interface DashboardLayoutProps {
  children: any
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const { unreadCount } = useNotifications()
  const { translations } = useSettings()

  if (!user) {
    router.push("/login")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const breadcrumbs = generateBreadcrumbs(pathname)
  const currentPage = navigation.find((item) => item.href === pathname)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Sidebar with better visual hierarchy */}
      <div className="fixed inset-y-0 left-0 w-72 bg-card/95 backdrop-blur-sm shadow-xl border-r border-border/50">
        {/* Enhanced Logo Section */}
        <div className="flex items-center gap-4 px-6 py-8 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full"></div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HerbTrust
            </h1>
            <p className="text-xs text-muted-foreground font-medium">Advanced Blockchain Traceability</p>
          </div>
        </div>

        {/* Enhanced Navigation with descriptions */}
        <nav className="px-4 py-6 space-y-1">
          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Main Navigation
            </h3>
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative",
                  isActive
                    ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:shadow-sm",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    isActive ? "scale-110" : "group-hover:scale-105",
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{translations[item.key] || item.name}</div>
                  <div
                    className={cn(
                      "text-xs opacity-75 truncate",
                      isActive ? "text-primary-foreground/80" : "text-muted-foreground",
                    )}
                  >
                    {item.description}
                  </div>
                </div>
                {isActive && <div className="w-1 h-8 bg-white/30 rounded-full absolute right-2"></div>}
              </Link>
            )
          })}
        </nav>

        {/* Enhanced User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50 bg-gradient-to-t from-muted/20 to-transparent">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <Avatar className="w-10 h-10 ring-2 ring-primary/20">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  {user.role}
                </Badge>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                  <Settings className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  {translations.settings || "Settings"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  {translations.logout || "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content with enhanced header */}
      <div className="pl-72">
        {/* Professional Header with breadcrumbs and search */}
        <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm shadow-sm border-b border-border/50">
          <div className="px-6 py-4">
            {/* Top row with breadcrumbs and actions */}
            <div className="flex items-center justify-between mb-3">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.href}>
                      <BreadcrumbItem>
                        {index === breadcrumbs.length - 1 ? (
                          <BreadcrumbPage className="font-medium">{crumb.name}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={crumb.href} className="text-muted-foreground hover:text-foreground">
                            {crumb.name}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>

              <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 w-64 bg-muted/50 border-border/50 focus:bg-background"
                  />
                </div>

                {/* Status Indicators */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">Blockchain Active</span>
                </div>

                <NotificationPanel />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/settings")}
                  className="hover:bg-muted/50"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Page title and description */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  {currentPage && <currentPage.icon className="w-8 h-8 text-primary" />}
                  {currentPage?.name || "Dashboard"}
                </h1>
                <p className="text-muted-foreground mt-1 text-base">
                  {currentPage?.description || "Blockchain-based botanical traceability system"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Page Content */}
        <main className="p-6 min-h-[calc(100vh-140px)]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
