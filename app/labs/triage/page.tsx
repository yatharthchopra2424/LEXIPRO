"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Target,
  Brain,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Scale,
  FileText,
  Users,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface TriageResult {
  category: string
  urgency: "low" | "medium" | "high" | "critical"
  estimatedCost: string
  timeline: string
  recommendedActions: string[]
  confidence: number
}

export default function LegalTriagePage() {
  const [caseDescription, setCaseDescription] = useState("")
  const [caseType, setCaseType] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null)

  const handleAnalyze = async () => {
    if (!caseDescription.trim()) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const result: TriageResult = {
        category: caseType || "Corporate Law",
        urgency: "high",
        estimatedCost: "₹75,000 - ₹1,50,000",
        timeline: "2-4 weeks",
        recommendedActions: [
          "Immediate legal consultation required",
          "Gather all relevant documentation",
          "Consider alternative dispute resolution",
          "Prepare for potential litigation",
        ],
        confidence: 87,
      }
      setTriageResult(result)
      setIsAnalyzing(false)
    }, 3000)
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return <AlertTriangle className="w-4 h-4" />
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      case "medium":
        return <Clock className="w-4 h-4" />
      case "low":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Legal Triage</h1>
            <p className="text-gray-400">AI-powered case categorization and urgency assessment</p>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 ml-auto">Live</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-400" />
                Case Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-white font-medium">Case Type (Optional)</label>
                <Select value={caseType} onValueChange={setCaseType}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select case type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                    <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                    <SelectItem value="Family Law">Family Law</SelectItem>
                    <SelectItem value="Employment Law">Employment Law</SelectItem>
                    <SelectItem value="Property Law">Property Law</SelectItem>
                    <SelectItem value="Intellectual Property">Intellectual Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Describe Your Legal Issue</label>
                <Textarea
                  placeholder="Provide detailed description of your legal matter, including key facts, parties involved, and specific concerns..."
                  value={caseDescription}
                  onChange={(e) => setCaseDescription(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-32"
                  rows={6}
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!caseDescription.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing Case...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Analyze Case
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Triage Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {triageResult ? (
                <div className="space-y-6">
                  {/* Confidence Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Analysis Confidence</span>
                      <span className="text-white font-semibold">{triageResult.confidence}%</span>
                    </div>
                    <Progress value={triageResult.confidence} className="h-2" />
                  </div>

                  {/* Category and Urgency */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-400 text-sm">Category</span>
                      </div>
                      <p className="text-white font-semibold">{triageResult.category}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-orange-400" />
                        <span className="text-gray-400 text-sm">Urgency</span>
                      </div>
                      <Badge className={getUrgencyColor(triageResult.urgency)}>
                        <div className="flex items-center gap-1">
                          {getUrgencyIcon(triageResult.urgency)}
                          <span className="capitalize">{triageResult.urgency}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>

                  {/* Cost and Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-gray-400 text-sm">Estimated Cost</span>
                      </div>
                      <p className="text-white font-semibold">{triageResult.estimatedCost}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-400 text-sm">Timeline</span>
                      </div>
                      <p className="text-white font-semibold">{triageResult.timeline}</p>
                    </div>
                  </div>

                  {/* Recommended Actions */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400" />
                      Recommended Actions
                    </h4>
                    <div className="space-y-2">
                      {triageResult.recommendedActions.map((action, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      <Users className="w-4 h-4 mr-2" />
                      Find Lawyers
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Ready for Analysis</h3>
                  <p className="text-gray-400">
                    Describe your legal issue to get AI-powered categorization and urgency assessment
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white">How Legal Triage Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">AI Analysis</h4>
                <p className="text-gray-400 text-sm">
                  Our AI analyzes your case description using advanced legal knowledge
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Categorization</h4>
                <p className="text-gray-400 text-sm">Cases are categorized by legal domain and urgency level</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="text-white font-semibold mb-2">Recommendations</h4>
                <p className="text-gray-400 text-sm">Get actionable recommendations and next steps for your case</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
