"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, CheckCircle, Brain, Sparkles, Shield, ArrowRight, ArrowLeft, Info } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface CaseForm {
  title: string
  category: string
  description: string
  budget: string
  urgency: string
  location: string
  timeline: string
  documents: File[]
  requirements: string[]
  confidential: boolean
  clientName: string
  clientEmail: string
  clientPhone: string
}

export default function PostCasePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<CaseForm>({
    title: "",
    category: "",
    description: "",
    budget: "",
    urgency: "",
    location: "",
    timeline: "",
    documents: [],
    requirements: [],
    confidential: false,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
  })
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const categories = [
    "Corporate Law",
    "Criminal Law",
    "Civil Law",
    "Family Law",
    "Employment Law",
    "Intellectual Property",
    "Real Estate",
    "Tax Law",
    "Immigration",
    "Constitutional Law",
    "Consumer Protection",
    "Environmental Law",
  ]

  const budgetRanges = [
    "₹10,000 - ₹25,000",
    "₹25,000 - ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹2,50,000",
    "₹2,50,000 - ₹5,00,000",
    "₹5,00,000+",
  ]

  const urgencyLevels = [
    { value: "low", label: "Low - Within 30 days", color: "text-green-400" },
    { value: "medium", label: "Medium - Within 15 days", color: "text-yellow-400" },
    { value: "high", label: "High - Within 7 days", color: "text-orange-400" },
    { value: "urgent", label: "Urgent - Within 3 days", color: "text-red-400" },
  ]

  const commonRequirements = [
    "Experience in similar cases",
    "Local jurisdiction knowledge",
    "Immediate availability",
    "Multilingual support",
    "Court representation",
    "Document drafting",
    "Negotiation skills",
    "Compliance expertise",
  ]

  const handleInputChange = (field: keyof CaseForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Trigger AI analysis for description
    if (field === "description" && value.length > 100) {
      analyzeCase(value)
    }
  }

  const analyzeCase = async (description: string) => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const suggestions = [
        "Consider adding timeline expectations",
        "Specify jurisdiction requirements",
        "Include budget for court fees",
        "Mention any previous legal actions",
      ]
      setAiSuggestions(suggestions)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files)
      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...newFiles],
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }))
  }

  const toggleRequirement = (requirement: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.includes(requirement)
        ? prev.requirements.filter((r) => r !== requirement)
        : [...prev.requirements, requirement],
    }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const submitCase = () => {
    console.log("Submitting case:", formData)
    // Handle case submission
  }

  const steps = [
    { number: 1, title: "Case Details", description: "Describe your legal matter" },
    { number: 2, title: "Requirements", description: "Specify your needs" },
    { number: 3, title: "Documents", description: "Upload relevant files" },
    { number: 4, title: "Contact Info", description: "Your details" },
  ]

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6 lg:px-8 bg-gradient-to-br from-[#0B0F19] to-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#FCD34D] bg-clip-text text-transparent">
                Post Your Legal Case
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Get competitive bids from verified lawyers and find the perfect legal expert for your needs
              </p>

              {/* Progress Steps */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                          currentStep >= step.number
                            ? "bg-[#FCD34D] border-[#FCD34D] text-black"
                            : "border-gray-600 text-gray-400"
                        }`}
                      >
                        {currentStep > step.number ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="font-bold">{step.number}</span>
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                            currentStep > step.number ? "bg-[#FCD34D]" : "bg-gray-600"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-[#FCD34D]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FCD34D] to-yellow-600 rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold">{currentStep}</span>
                  </div>
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription className="text-gray-400">{steps[currentStep - 1].description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Step 1: Case Details */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-white">
                        Case Title *
                      </Label>
                      <Input
                        id="title"
                        placeholder="Brief, descriptive title for your case"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-white">Legal Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger className="bg-gray-800/50 border-[#FCD34D]/20 text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-[#FCD34D]/20">
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Budget Range *</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                          <SelectTrigger className="bg-gray-800/50 border-[#FCD34D]/20 text-white">
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-[#FCD34D]/20">
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-white">
                        Case Description *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Provide detailed information about your legal matter, including background, current situation, and desired outcome..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 min-h-32"
                        rows={6}
                      />
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{formData.description.length}/2000 characters</span>
                        {isAnalyzing && (
                          <div className="flex items-center gap-2">
                            <Brain className="w-4 h-4 animate-pulse text-[#FCD34D]" />
                            <span>AI analyzing...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {aiSuggestions.length > 0 && (
                      <div className="bg-[#FCD34D]/10 border border-[#FCD34D]/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-5 h-5 text-[#FCD34D]" />
                          <h4 className="font-semibold text-[#FCD34D]">AI Suggestions</h4>
                        </div>
                        <ul className="space-y-2">
                          {aiSuggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                              <Info className="w-4 h-4 text-[#FCD34D] mt-0.5 flex-shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-white">Urgency Level *</Label>
                        <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                          <SelectTrigger className="bg-gray-800/50 border-[#FCD34D]/20 text-white">
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-[#FCD34D]/20">
                            {urgencyLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                <span className={level.color}>{level.label}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-white">
                          Location *
                        </Label>
                        <Input
                          id="location"
                          placeholder="City, State"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className="bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Requirements */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-white">
                        Expected Timeline
                      </Label>
                      <Input
                        id="timeline"
                        placeholder="e.g., 2-3 months, 6 weeks, etc."
                        value={formData.timeline}
                        onChange={(e) => handleInputChange("timeline", e.target.value)}
                        className="bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-white">Lawyer Requirements</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {commonRequirements.map((requirement) => (
                          <div key={requirement} className="flex items-center space-x-3">
                            <Checkbox
                              id={requirement}
                              checked={formData.requirements.includes(requirement)}
                              onCheckedChange={() => toggleRequirement(requirement)}
                              className="border-[#FCD34D]/30 data-[state=checked]:bg-[#FCD34D] data-[state=checked]:border-[#FCD34D]"
                            />
                            <Label htmlFor={requirement} className="text-gray-300 text-sm">
                              {requirement}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="confidential"
                        checked={formData.confidential}
                        onCheckedChange={(checked) => handleInputChange("confidential", checked)}
                        className="border-[#FCD34D]/30 data-[state=checked]:bg-[#FCD34D] data-[state=checked]:border-[#FCD34D]"
                      />
                      <Label htmlFor="confidential" className="text-gray-300">
                        This case involves confidential information
                      </Label>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Documents */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <Label className="text-white">Upload Documents (Optional)</Label>
                      <div className="border-2 border-dashed border-[#FCD34D]/30 rounded-lg p-8 text-center hover:border-[#FCD34D]/50 transition-colors">
                        <Upload className="w-12 h-12 text-[#FCD34D] mx-auto mb-4" />
                        <p className="text-gray-300 mb-2">Drag and drop files here, or click to browse</p>
                        <p className="text-gray-400 text-sm mb-4">
                          Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
                        </p>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e.target.files)}
                          className="hidden"
                          id="file-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                          onClick={() => document.getElementById("file-upload")?.click()}
                        >
                          Choose Files
                        </Button>
                      </div>

                      {formData.documents.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-white">Uploaded Files:</h4>
                          {formData.documents.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-[#FCD34D]" />
                                <span className="text-gray-300">{file.name}</span>
                                <Badge className="bg-gray-600/50 text-gray-300 text-xs">
                                  {(file.size / 1024 / 1024).toFixed(1)} MB
                                </Badge>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-400 mb-1">Document Security</h4>
                          <p className="text-gray-300 text-sm">
                            All uploaded documents are encrypted and only shared with lawyers you choose to work with.
                            Your privacy and confidentiality are our top priorities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact Info */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="clientName" className="text-white">
                          Full Name *
                        </Label>
                        <Input
                          id="clientName"
                          placeholder="Your full name"
                          value={formData.clientName}
                          onChange={(e) => handleInputChange("clientName", e.target.value)}
                          className="bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="clientEmail" className="text-white">
                          Email Address *
                        </Label>
                        <Input
                          id="clientEmail"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.clientEmail}
                          onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                          className="bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clientPhone" className="text-white">
                        Phone Number
                      </Label>
                      <Input
                        id="clientPhone"
                        placeholder="+91 98765 43210"
                        value={formData.clientPhone}
                        onChange={(e) => handleInputChange("clientPhone", e.target.value)}
                        className="bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div className="bg-[#FCD34D]/10 border border-[#FCD34D]/20 rounded-lg p-6">
                      <h4 className="font-semibold text-[#FCD34D] mb-4">What happens next?</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-[#FCD34D] rounded-full flex items-center justify-center text-black text-sm font-bold">
                            1
                          </div>
                          <span className="text-gray-300">
                            Your case will be reviewed and published to verified lawyers
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-[#FCD34D] rounded-full flex items-center justify-center text-black text-sm font-bold">
                            2
                          </div>
                          <span className="text-gray-300">
                            Lawyers will submit competitive bids with their proposals
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-[#FCD34D] rounded-full flex items-center justify-center text-black text-sm font-bold">
                            3
                          </div>
                          <span className="text-gray-300">
                            You can review profiles, compare bids, and choose your lawyer
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-[#FCD34D] rounded-full flex items-center justify-center text-black text-sm font-bold">
                            4
                          </div>
                          <span className="text-gray-300">
                            Start working with your chosen lawyer through our secure platform
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-[#FCD34D]/20">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 disabled:opacity-50 bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={submitCase}
                      className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                    >
                      Post Case
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
