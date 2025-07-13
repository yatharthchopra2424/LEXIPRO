"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  Brain,
  Sparkles,
  Target,
  Clock,
  DollarSign,
  Scale,
  BarChart3,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface PredictionResult {
  winProbability: number
  timeline: string
  estimatedCost: string
  riskFactors: string[]
  favorableFactors: string[]
  recommendedStrategy: string
  confidence: number
}

export default function OutcomePredictorPage() {
  const [caseDetails, setCaseDetails] = useState("")
  const [caseType, setCaseType] = useState("")
  const [jurisdiction, setJurisdiction] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)

  const handlePredict = async () => {
    if (!caseDetails.trim()) return

    setIsAnalyzing(true)

    // Simulate AI prediction
    setTimeout(() => {
      const result: PredictionResult = {
        winProbability: 73,
        timeline: "8-12 months",
        estimatedCost: "₹2,50,000 - ₹4,00,000",
        riskFactors: [
          "Limited documentary evidence",
          "Opposing party has strong legal representation",
          "Recent precedent cases favor defendant",
        ],
        favorableFactors: [
          "Clear breach of contract terms",
          "Strong witness testimonies available",
          "Favorable jurisdiction for plaintiff",
          "Recent regulatory changes support your position",
        ],
        recommendedStrategy:
          "Focus on strengthening documentary evidence and consider settlement negotiations as backup option",
        confidence: 82,
      }
      setPrediction(result)
      setIsAnalyzing(false)
    }, 4000)
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return "text-green-400"
    if (probability >= 50) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Outcome Predictor</h1>
            <p className="text-gray-400">AI-powered case outcome prediction and strategy recommendations</p>
          </div>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 ml-auto">Beta</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-green-400" />
                Case Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white font-medium">Case Type</label>
                  <Select value={caseType} onValueChange={setCaseType}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select case type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Contract Dispute">Contract Dispute</SelectItem>
                      <SelectItem value="Employment Law">Employment Law</SelectItem>
                      <SelectItem value="Property Dispute">Property Dispute</SelectItem>
                      <SelectItem value="Criminal Defense">Criminal Defense</SelectItem>
                      <SelectItem value="Family Law">Family Law</SelectItem>
                      <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-white font-medium">Jurisdiction</label>
                  <Select value={jurisdiction} onValueChange={setJurisdiction}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mumbai High Court">Mumbai High Court</SelectItem>
                      <SelectItem value="Delhi High Court">Delhi High Court</SelectItem>
                      <SelectItem value="Supreme Court">Supreme Court of India</SelectItem>
                      <SelectItem value="Bangalore High Court">Karnataka High Court</SelectItem>
                      <SelectItem value="Chennai High Court">Madras High Court</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Case Details</label>
                <Textarea
                  placeholder="Provide comprehensive case details including facts, evidence, parties involved, legal issues, and any relevant precedents..."
                  value={caseDetails}
                  onChange={(e) => setCaseDetails(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-40"
                  rows={8}
                />
              </div>

              <Button
                onClick={handlePredict}
                disabled={!caseDetails.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing Outcome...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Predict Outcome
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Prediction Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {prediction ? (
                <div className="space-y-6">
                  {/* Win Probability */}
                  <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                    <div className="text-4xl font-bold mb-2">
                      <span className={getProbabilityColor(prediction.winProbability)}>
                        {prediction.winProbability}%
                      </span>
                    </div>
                    <p className="text-gray-300">Win Probability</p>
                    <Progress value={prediction.winProbability} className="mt-3 h-3" />
                  </div>

                  {/* Confidence Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Prediction Confidence</span>
                      <span className="text-white font-semibold">{prediction.confidence}%</span>
                    </div>
                    <Progress value={prediction.confidence} className="h-2" />
                  </div>

                  {/* Timeline and Cost */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-400 text-sm">Expected Timeline</span>
                      </div>
                      <p className="text-white font-semibold">{prediction.timeline}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-gray-400 text-sm">Estimated Cost</span>
                      </div>
                      <p className="text-white font-semibold">{prediction.estimatedCost}</p>
                    </div>
                  </div>

                  {/* Risk Factors */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      Risk Factors
                    </h4>
                    <div className="space-y-2">
                      {prediction.riskFactors.map((risk, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                        >
                          <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Favorable Factors */}
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Favorable Factors
                    </h4>
                    <div className="space-y-2">
                      {prediction.favorableFactors.map((factor, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategy Recommendation */}
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      Recommended Strategy
                    </h4>
                    <p className="text-gray-300 text-sm">{prediction.recommendedStrategy}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Detailed Analysis
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                      <Scale className="w-4 h-4 mr-2" />
                      Find Lawyers
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Ready for Prediction</h3>
                  <p className="text-gray-400">
                    Provide your case details to get AI-powered outcome predictions and strategic insights
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">Important Disclaimer</h4>
                <p className="text-gray-300 text-sm">
                  This prediction is based on AI analysis of historical case data and should not be considered as legal
                  advice. Actual case outcomes may vary significantly based on specific circumstances, evidence quality,
                  legal representation, and other factors not captured in this analysis. Always consult with qualified
                  legal professionals for case-specific guidance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
