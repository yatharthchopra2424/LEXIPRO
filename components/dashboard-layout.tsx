"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Scale,
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  Brain,
  Zap,
  Shield,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  CreditCard,
  HelpCircle,
  Sparkles,
  BookOpen,
  Video,
  TrendingUp,
  Target,
  CheckCircle,
  Plus,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType?: "lawyer" | "client"
  user?: {
    name: string
    email: string
    avatar?: string
    role?: string
    verified?: boolean
  }
}

export function DashboardLayout({ children, userType = "lawyer", user }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [notifications] = useState(3)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const defaultUser = {
    name: userType === "lawyer" ? "Adv. Priya Sharma" : "John Doe",
    email: userType === "lawyer" ? "priya@sharma-law.com" : "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: userType === "lawyer" ? "Senior Partner" : "Business Owner",
    verified: userType === "lawyer",
  }

  const currentUser = user || defaultUser

  const lawyerMenuItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      title: "Cases & Bids",
      url: "/cases",
      icon: Briefcase,
      badge: "5 new",
    },
    {
      title: "Clients",
      url: "/clients",
      icon: Users,
      badge: null,
    },
    {
      title: "Calendar",
      url: "/appointments",
      icon: Calendar,
      badge: null,
    },
    {
      title: "Messages",
      url: "/messages",
      icon: MessageSquare,
      badge: "3",
    },
    {
      title: "Documents",
      url: "/document-generator",
      icon: FileText,
      badge: null,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
      badge: null,
    },
  ]

  const clientMenuItems = [
    {
      title: "Dashboard",
      url: "/client/dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      title: "My Cases",
      url: "/client/cases",
      icon: Briefcase,
      badge: "2 active",
    },
    {
      title: "Find Lawyers",
      url: "/marketplace",
      icon: Users,
      badge: null,
    },
    {
      title: "Appointments",
      url: "/client/appointments",
      icon: Calendar,
      badge: null,
    },
    {
      title: "Messages",
      url: "/client/messages",
      icon: MessageSquare,
      badge: "1",
    },
    {
      title: "Documents",
      url: "/client/documents",
      icon: FileText,
      badge: null,
    },
    {
      title: "Billing",
      url: "/client/billing",
      icon: CreditCard,
      badge: null,
    },
  ]

  const aiToolsItems = [
    {
      title: "AI Assistant",
      url: "/ai-assistant",
      icon: Brain,
      badge: "New",
    },
    {
      title: "Document Generator",
      url: "/document-generator",
      icon: FileText,
      badge: null,
    },
    {
      title: "Story Mode",
      url: "/story-mode",
      icon: BookOpen,
      badge: "Beta",
    },
    {
      title: "Blockchain",
      url: "/blockchain",
      icon: Shield,
      badge: null,
    },
  ]

  const labsItems = [
    {
      title: "Legal Triage",
      url: "/labs/triage",
      icon: Target,
      badge: "Live",
    },
    {
      title: "Outcome Predictor",
      url: "/labs/predictor",
      icon: TrendingUp,
      badge: "Beta",
    },
    {
      title: "Virtual Courtroom",
      url: "/labs/courtroom",
      icon: Video,
      badge: "Soon",
    },
    {
      title: "Voice-to-Case",
      url: "/labs/voice",
      icon: Sparkles,
      badge: "Beta",
    },
  ]

  const menuItems = userType === "lawyer" ? lawyerMenuItems : clientMenuItems

  const isActive = (url: string) => pathname === url

  const getBadgeColor = (badge: string | null) => {
    if (!badge) return ""
    if (badge.includes("new") || badge.includes("New")) return "bg-green-500/20 text-green-400 border-green-500/30"
    if (badge.includes("Beta") || badge.includes("beta")) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    if (badge.includes("Soon") || badge.includes("soon")) return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    if (badge.includes("Live") || badge.includes("live")) return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    return "bg-[#FCD34D]/20 text-[#FCD34D] border-[#FCD34D]/30"
  }

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    // Redirect to login
    router.push("/auth/login")
  }

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div className="min-h-screen bg-[#0B0F19] flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-r border-[#FCD34D]/20 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-[#FCD34D]/20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#FCD34D] to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <Scale className="w-6 h-6 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                LexiPro
              </span>
              <span className="text-xs text-[#FCD34D] font-medium -mt-1">Legal OS</span>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-6">
            {/* Main Navigation */}
            <div className="px-6 mb-8">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Main Menu</h3>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.url)
                        ? "bg-[#FCD34D]/20 text-[#FCD34D] border border-[#FCD34D]/30"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <Badge className={`ml-auto text-xs ${getBadgeColor(item.badge)}`}>{item.badge}</Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* AI Tools */}
            <div className="px-6 mb-8">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI Tools
              </h3>
              <nav className="space-y-2">
                {aiToolsItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.url)
                        ? "bg-[#FCD34D]/20 text-[#FCD34D] border border-[#FCD34D]/30"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <Badge className={`ml-auto text-xs ${getBadgeColor(item.badge)}`}>{item.badge}</Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* AI Labs */}
            <div className="px-6 mb-8">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                AI Labs
              </h3>
              <nav className="space-y-2">
                {labsItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.url)
                        ? "bg-[#FCD34D]/20 text-[#FCD34D] border border-[#FCD34D]/30"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <Badge className={`ml-auto text-xs ${getBadgeColor(item.badge)}`}>{item.badge}</Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Settings */}
            <div className="px-6">
              <nav className="space-y-2">
                <Link
                  href="/settings"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive("/settings")
                      ? "bg-[#FCD34D]/20 text-[#FCD34D] border border-[#FCD34D]/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </Link>
                <Link
                  href="/help"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                  onClick={() => setSidebarOpen(false)}
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="font-medium">Help & Support</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-6 border-t border-[#FCD34D]/20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-3 h-auto hover:bg-white/5">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                    <AvatarFallback className="bg-[#FCD34D] text-black font-bold">
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-white flex items-center gap-2">
                      {currentUser.name}
                      {currentUser.verified && <CheckCircle className="w-4 h-4 text-green-400" />}
                    </div>
                    <div className="text-xs text-gray-400">{currentUser.role}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-gray-900/95 backdrop-blur-md border-[#FCD34D]/20"
                side="top"
                align="end"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-white">{currentUser.name}</p>
                    <p className="text-xs text-gray-400">{currentUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#FCD34D]/20" />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/billing" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Billing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#FCD34D]/20" />
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-400 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="h-16 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border-b border-[#FCD34D]/20 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-white">
              {userType === "lawyer" ? "Lawyer Dashboard" : "Client Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Search className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Quick Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Quick Action
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-md border-[#FCD34D]/20">
                {userType === "lawyer" ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/cases/new">New Case</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/document-generator">Generate Document</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/appointments/new">Schedule Meeting</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/post-case">Post New Case</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/marketplace">Find Lawyers</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/client/appointments/new">Book Consultation</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
