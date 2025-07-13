"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  TrendingUp,
  Briefcase,
  DollarSign,
  Calendar,
  MessageSquare,
  Star,
  Clock,
  ArrowRight,
  Plus,
  CheckCircle,
  Target,
  BarChart3,
  FileText,
  Video,
  Zap,
  Brain,
  Search,
  Gavel,
} from "lucide-react"
import Link from "next/link"

interface ClientCase {
  id: string
  title: string
  category: string
  status: "open" | "in-progress" | "completed" | "closed"
  lawyer?: string
  budget: string
  bids: number
  postedDate: string
  priority: "low" | "medium" | "high"
}

interface RecommendedLawyer {
  id: string
  name: string
  specialization: string
  rating: number
  experience: number
  hourlyRate: number
  location: string
  avatar: string
  verified: boolean
}

export default function ClientDashboardPage() {
  const [activeCases] = useState<ClientCase[]>([
    {
      id: "1",
      title: "Startup Legal Setup and Compliance",
      category: "Corporate Law",
      status: "in-progress",
      lawyer: "Adv. Priya Sharma",
      budget: "₹75,000",
      bids: 8,
      postedDate: "2024-01-10",
      priority: "high",
    },
    {
      id: "2",
      title: "Employment Contract Review",
      category: "Employment Law",
      status: "open",
      budget: "₹25,000",
      bids: 5,
      postedDate: "2024-01-12",
      priority: "medium",
    },
    {
      id: "3",
      title: "Intellectual Property Filing",
      category: "IP Law",
      status: "completed",
      lawyer: "Adv. Meera Patel",
      budget: "₹1,50,000",
      bids: 12,
      postedDate: "2024-01-05",
      priority: "low",
    },
  ])

  const [recommendedLawyers] = useState<RecommendedLawyer[]>([
    {
      id: "1",
      name: "Adv. Rajesh Kumar",
      specialization: "Criminal Law",
      rating: 4.8,
      experience: 12,
      hourlyRate: 4000,
      location: "Delhi, NCR",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
    {
      id: "2",
      name: "Adv. Anita Singh",
      specialization: "Family Law",
      rating: 4.9,
      experience: 8,
      hourlyRate: 3500,
      location: "Mumbai, Maharashtra",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
    {
      id: "3",
      name: "Adv. Vikram Patel",
      specialization: "Real Estate",
      rating: 4.7,
      experience: 15,
      hourlyRate: 5000,
      location: "Bangalore, Karnataka",
      avatar: "/placeholder.svg?height=60&width=60",
      verified: true,
    },
  ])

  const [upcomingAppointments] = useState([
    {
      id: "1",
      lawyer: "Adv. Priya Sharma",
      type: "consultation",
      date: "Today",
      time: "2:00 PM",
      duration: "1 hour",
      status: "confirmed",
    },
    {
      id: "2",
      lawyer: "Adv. Meera Patel",
      type: "follow-up",
      date: "Tomorrow",
      time: "10:30 AM",
      duration: "30 mins",
      status: "pending",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "open":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "completed":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const stats = {
    totalCases: activeCases.length,
    activeCases: activeCases.filter((c) => c.status === "in-progress").length,
    completedCases: activeCases.filter((c) => c.status === "completed").length,
    totalSpent: 250000,
  }

  return (
    <DashboardLayout userType="client">
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John Doe</h1>
            <p className="text-gray-400 text-lg">
              You have {stats.activeCases} active cases and {upcomingAppointments.length} upcoming appointments
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
              asChild
            >
              <Link href="/post-case">
                <Plus className="w-4 h-4 mr-2" />
                Post New Case
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
              asChild
            >
              <Link href="/marketplace">
                <Search className="w-4 h-4 mr-2" />
                Find Lawyers
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Cases</p>
                  <p className="text-3xl font-bold text-white">{stats.totalCases}</p>
                  <p className="text-blue-400 text-sm flex items-center mt-1">
                    <Briefcase className="w-4 h-4 mr-1" />
                    All time cases
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-[#FCD34D]/20 to-yellow-600/20 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[#FCD34D]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Active Cases</p>
                  <p className="text-3xl font-bold text-white">{stats.activeCases}</p>
                  <p className="text-green-400 text-sm flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    In progress
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Completed</p>
                  <p className="text-3xl font-bold text-white">{stats.completedCases}</p>
                  <p className="text-purple-400 text-sm flex items-center mt-1">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Successfully resolved
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Spent</p>
                  <p className="text-3xl font-bold text-white">₹{stats.totalSpent.toLocaleString()}</p>
                  <p className="text-blue-400 text-sm flex items-center mt-1">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Legal services
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-800/50 border border-[#FCD34D]/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
                Overview
              </TabsTrigger>
              <TabsTrigger value="cases" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
                My Cases
              </TabsTrigger>
              <TabsTrigger value="lawyers" className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black">
                Recommended Lawyers
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="data-[state=active]:bg-[#FCD34D] data-[state=active]:text-black"
              >
                Appointments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="lg:col-span-2 bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#FCD34D]" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>Your latest case updates and interactions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-[#FCD34D]/10 rounded-lg border border-[#FCD34D]/20">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Case completed successfully</p>
                        <p className="text-gray-400 text-sm">Intellectual Property Filing - Adv. Meera Patel</p>
                        <p className="text-gray-500 text-xs">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">New message from lawyer</p>
                        <p className="text-gray-400 text-sm">Startup Legal Setup - Adv. Priya Sharma</p>
                        <p className="text-gray-500 text-xs">5 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Gavel className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">New bid received</p>
                        <p className="text-gray-400 text-sm">Employment Contract Review - 5 bids total</p>
                        <p className="text-gray-500 text-xs">1 day ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#FCD34D]" />
                      Quick Actions
                    </CardTitle>
                    <CardDescription>Get legal help and use AI tools</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      className="w-full bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                      asChild
                    >
                      <Link href="/post-case">
                        <Plus className="w-4 h-4 mr-2" />
                        Post New Case
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                      asChild
                    >
                      <Link href="/ai-assistant">
                        <Brain className="w-4 h-4 mr-2" />
                        AI Legal Assistant
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                      asChild
                    >
                      <Link href="/document-generator">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Documents
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10 bg-transparent"
                      asChild
                    >
                      <Link href="/marketplace">
                        <Search className="w-4 h-4 mr-2" />
                        Find Lawyers
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cases" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">My Cases</h3>
                <Button
                  className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                  asChild
                >
                  <Link href="/post-case">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Case
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {activeCases.map((case_item, index) => (
                  <motion.div
                    key={case_item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm hover:border-[#FCD34D]/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg font-semibold text-white">{case_item.title}</h4>
                              <Badge className={getStatusColor(case_item.status)}>
                                {case_item.status.replace("-", " ")}
                              </Badge>
                              <Badge className={getPriorityColor(case_item.priority)}>
                                {case_item.priority} priority
                              </Badge>
                            </div>
                            <p className="text-gray-400 mb-3">Category: {case_item.category}</p>
                            {case_item.lawyer && <p className="text-[#FCD34D] mb-3">Assigned to: {case_item.lawyer}</p>}
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                <span>{case_item.budget}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Gavel className="w-4 h-4" />
                                <span>{case_item.bids} bids</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>Posted: {case_item.postedDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {case_item.status === "open" && (
                              <Button
                                variant="outline"
                                className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                              >
                                View Bids
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lawyers" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Recommended Lawyers</h3>
                <Button
                  className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                  asChild
                >
                  <Link href="/marketplace">
                    View All Lawyers
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedLawyers.map((lawyer, index) => (
                  <motion.div
                    key={lawyer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm hover:border-[#FCD34D]/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={lawyer.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#FCD34D] text-black font-bold">
                              {lawyer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white flex items-center gap-2">
                              {lawyer.name}
                              {lawyer.verified && <CheckCircle className="w-4 h-4 text-green-400" />}
                            </h4>
                            <p className="text-[#FCD34D] text-sm">{lawyer.specialization}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 text-[#FCD34D] fill-current" />
                              <span className="text-white text-sm">{lawyer.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Experience</span>
                            <span className="text-white">{lawyer.experience} years</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Rate</span>
                            <span className="text-white">₹{lawyer.hourlyRate}/hr</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Location</span>
                            <span className="text-white">{lawyer.location}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1 bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold text-sm">
                            View Profile
                          </Button>
                          <Button
                            variant="outline"
                            className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Upcoming Appointments</h3>
                <Button
                  className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                  asChild
                >
                  <Link href="/client/appointments/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Book Consultation
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {upcomingAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm hover:border-[#FCD34D]/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#FCD34D]/20 to-yellow-600/20 rounded-xl flex items-center justify-center">
                              <Video className="w-6 h-6 text-[#FCD34D]" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-white">{appointment.lawyer}</h4>
                              <p className="text-gray-400 capitalize">{appointment.type}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{appointment.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{appointment.time}</span>
                                </div>
                                <span>{appointment.duration}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={
                                appointment.status === "confirmed"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              }
                            >
                              {appointment.status}
                            </Badge>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                              >
                                <Video className="w-4 h-4 mr-2" />
                                Join
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
