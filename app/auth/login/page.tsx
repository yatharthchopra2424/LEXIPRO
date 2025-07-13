"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, Scale, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleInputChange = (field: keyof LoginFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock authentication logic
      if (formData.email.includes("lawyer")) {
        router.push("/lawyer/dashboard")
      } else {
        router.push("/client/dashboard")
      }
    } catch (error) {
      setErrors({ general: "Invalid email or password" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FCD34D]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border-[#FCD34D]/20 shadow-2xl">
          <CardHeader className="text-center pb-8 pt-8">
            <div className="flex justify-center mb-6">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FCD34D] to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Scale className="w-7 h-7 text-black" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    LexiPro
                  </span>
                  <span className="text-xs text-[#FCD34D] font-medium -mt-1">Legal OS</span>
                </div>
              </Link>
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-3">Welcome Back</CardTitle>
            <CardDescription className="text-gray-300 text-lg">Sign in to your LexiPro account</CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{errors.general}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-white font-medium">
                    Password
                  </Label>
                  <Link href="/auth/forgot-password" className="text-[#FCD34D] hover:underline text-sm">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-12 pr-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked)}
                    className="border-[#FCD34D]/30 data-[state=checked]:bg-[#FCD34D] data-[state=checked]:border-[#FCD34D]"
                  />
                  <Label htmlFor="rememberMe" className="text-gray-300 text-sm cursor-pointer">
                    Remember me
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold text-lg disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>
            </form>

            <Separator className="my-8 bg-[#FCD34D]/20" />

            <div className="text-center space-y-4">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-[#FCD34D] hover:underline font-medium">
                  Sign up here
                </Link>
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                  asChild
                >
                  <Link href="/auth/signup?type=client">Join as Client</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                  asChild
                >
                  <Link href="/auth/signup?type=lawyer">Join as Lawyer</Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-[#FCD34D]/10 border border-[#FCD34D]/20 rounded-lg">
              <h4 className="font-semibold text-[#FCD34D] mb-2">Demo Accounts</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <strong>Lawyer:</strong> lawyer@demo.com / password123
                </p>
                <p>
                  <strong>Client:</strong> client@demo.com / password123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
