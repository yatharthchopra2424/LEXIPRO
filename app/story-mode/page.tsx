"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Brain,
  Play,
  RotateCcw,
  FileText,
  Scale,
  Users,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  BookOpen,
  Gavel,
  Target,
  Upload,
  Sparkles,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface StoryStep {
  id: string
  title: string
  content: string
  type: "facts" | "laws" | "evidence" | "strategy" | "precedents" | "remedy"
  completed: boolean
  suggestions?: string[]
}

export default function StoryModePage() {
  const [caseInput, setCaseInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [storySteps, setStorySteps] = useState<StoryStep[]>([])
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const sampleCases = [
    {
      title: "Contract Breach Dispute",
      description: "Software development contract breach with payment delays",
      complexity: "Medium",
      estimatedTime: "15-20 minutes",
    },
    {
      title: "Employment Termination",
      description: "Wrongful termination case with discrimination claims",
      complexity: "High",
      estimatedTime: "20-25 minutes",
    },
    {
      title: "Intellectual Property Theft",
      description: "Trade secret misappropriation by former employee",
      complexity: "High",
      estimatedTime: "25-30 minutes",
    },
    {
      title: "Real Estate Dispute",
      description: "Property boundary dispute between neighbors",
      complexity: "Medium",
      estimatedTime: "15-20 minutes",
    },
  ]

  const handleStartAnalysis = async () => {
    if (!caseInput.trim()) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setCurrentStep(0)

    // Simulate progressive analysis
    const steps: StoryStep[] = [
      {
        id: "facts",
        title: "Case Facts Analysis",
        content: `Based on your case description, here are the key facts identified:

• **Primary Issue**: Contract breach involving software development services
• **Parties Involved**: Client (ABC Corp) and Development Company (TechSolutions)
• **Contract Value**: ₹50,00,000 for custom CRM system
• **Breach Details**: 6-month delay in delivery, incomplete functionality
• **Damages**: Lost business opportunities, additional costs for alternative solutions

**Timeline of Events**:
1. Contract signed: January 2024
2. Initial delivery date: June 2024
3. First delay notice: May 2024
4. Current status: December 2024 - 60% completion`,
        type: "facts",
        completed: false,
        suggestions: [
          "Request detailed project documentation",
          "Gather communication records",
          "Calculate actual damages",
        ],
      },
      {
        id: "laws",
        title: "Applicable Laws & Regulations",
        content: `Relevant legal framework for this contract dispute:

**Primary Legislation**:
• Indian Contract Act, 1872 - Sections 73, 74 (Compensation for breach)
• Information Technology Act, 2000 - Software development contracts
• Consumer Protection Act, 2019 - If applicable to business transactions

**Key Legal Principles**:
• Doctrine of Frustration (Section 56, Contract Act)
• Specific Performance (Specific Relief Act, 1963)
• Limitation Act, 1963 - 3-year limitation period

**Contractual Remedies**:
• Damages for breach (Compensatory and consequential)
• Specific performance of contract
• Termination and restitution`,
        type: "laws",
        completed: false,
        suggestions: [
          "Review contract terms for penalty clauses",
          "Check jurisdiction and arbitration clauses",
          "Verify limitation period",
        ],
      },
      {
        id: "evidence",
        title: "Evidence Collection & Analysis",
        content: `Critical evidence required for building a strong case:

**Documentary Evidence**:
• Original signed contract and amendments
• Email communications and meeting minutes
• Project milestone reports and deliverables
• Payment records and invoices
• Change requests and approvals

**Technical Evidence**:
• Software testing reports and bug logs
• Code review documentation
• Performance benchmarks and requirements
• Third-party technical assessments

**Financial Evidence**:
• Proof of damages and lost opportunities
• Additional costs incurred
• Market rate comparisons for similar projects`,
        type: "evidence",
        completed: false,
        suggestions: [
          "Conduct forensic analysis of delivered software",
          "Get expert technical opinion",
          "Document all financial losses",
        ],
      },
      {
        id: "precedents",
        title: "Similar Case Precedents",
        content: `Relevant precedent cases that support your position:

**Key Judgments**:

1. **Satyam Computer Services Ltd. v. Upaid Systems Ltd. (2008)**
   - Software development contract breach
   - Court awarded damages for delay and non-performance
   - Established precedent for calculating IT project damages

2. **Tata Consultancy Services v. State of Andhra Pradesh (2004)**
   - Government IT contract dispute
   - Emphasized importance of milestone-based delivery
   - Clarified liability for project delays

3. **Infosys Technologies Ltd. v. Visa International (2009)**
   - International software licensing dispute
   - Established principles for software IP and performance standards

**Legal Principles Established**:
• Time is of essence in IT contracts
• Substantial performance doctrine limitations
• Calculation of consequential damages in tech projects`,
        type: "precedents",
        completed: false,
        suggestions: [
          "Cite additional High Court judgments",
          "Research international precedents",
          "Analyze arbitration awards in similar cases",
        ],
      },
      {
        id: "strategy",
        title: "Legal Strategy & Approach",
        content: `Recommended legal strategy for maximum success:

**Primary Strategy**:
1. **Negotiation First**: Attempt amicable settlement through structured negotiations
2. **Arbitration Route**: Invoke arbitration clause if present in contract
3. **Civil Suit**: File suit for breach of contract and damages

**Tactical Approach**:
• Emphasize time-sensitive nature of software project
• Highlight business impact and lost opportunities
• Present technical evidence of non-compliance
• Seek both compensatory and consequential damages

**Settlement Leverage**:
• Strong documentary evidence
• Clear timeline of breaches
• Quantifiable financial losses
• Precedent case support

**Risk Assessment**:
• High probability of success (75-80%)
• Estimated timeline: 12-18 months
• Cost-benefit analysis favors litigation`,
        type: "strategy",
        completed: false,
        suggestions: [
          "Prepare detailed damage calculation",
          "Consider interim relief options",
          "Evaluate counterparty financial status",
        ],
      },
      {
        id: "remedy",
        title: "Optimal Legal Remedies",
        content: `Recommended legal remedies and relief sought:

**Primary Remedies**:
1. **Monetary Damages**: ₹75,00,000
   - Direct losses: ₹25,00,000
   - Consequential damages: ₹35,00,000
   - Interest and costs: ₹15,00,000

2. **Specific Performance**: 
   - Complete project delivery within 90 days
   - Meet all technical specifications
   - Provide 2-year warranty support

3. **Alternative Relief**:
   - Contract termination with full refund
   - Transfer of completed work and source code
   - Non-compete restrictions

**Interim Relief**:
• Injunction against disposal of assets
• Appointment of court receiver for project
• Preservation of evidence and documentation

**Long-term Protection**:
• Reputation damage claims
• Future business protection
• Industry blacklisting considerations`,
        type: "remedy",
        completed: false,
        suggestions: [
          "File for urgent interim relief",
          "Prepare comprehensive damage assessment",
          "Consider alternative dispute resolution",
        ],
      },
    ]

    // Simulate progressive loading
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setAnalysisProgress(i)
    }

    setStorySteps(steps)
    setIsAnalyzing(false)
  }

  const handleStepComplete = (stepIndex: number) => {
    setStorySteps((prev) => prev.map((step, index) => (index === stepIndex ? { ...step, completed: true } : step)))
    if (stepIndex < storySteps.length - 1) {
      setCurrentStep(stepIndex + 1)
    }
  }

  const getStepIcon = (type: string) => {
    switch (type) {
      case "facts":
        return FileText
      case "laws":
        return Scale
      case "evidence":
        return Users
      case "precedents":
        return BookOpen
      case "strategy":
        return Target
      case "remedy":
        return Gavel
      default:
        return FileText
    }
  }

  const getStepColor = (type: string) => {
    switch (type) {
      case "facts":
        return "from-blue-500 to-cyan-500"
      case "laws":
        return "from-purple-500 to-pink-500"
      case "evidence":
        return "from-green-500 to-emerald-500"
      case "precedents":
        return "from-orange-500 to-red-500"
      case "strategy":
        return "from-indigo-500 to-purple-500"
      case "remedy":
        return "from-yellow-500 to-orange-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              AI Story Mode
            </h1>
            <p className="text-gray-400">
              Transform your legal cases into interactive, step-by-step analysis with AI-powered insights
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              <Upload className="w-4 h-4 mr-2" />
              Upload Case File
            </Button>
            <Button
              onClick={() => {
                setStorySteps([])
                setCaseInput("")
                setCurrentStep(0)
                setAnalysisProgress(0)
              }}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {storySteps.length === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Case Input */}
            <div className="lg:col-span-2">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Describe Your Case
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Provide details about your legal case for AI-powered analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Textarea
                    value={caseInput}
                    onChange={(e) => setCaseInput(e.target.value)}
                    placeholder="Describe your case in detail. Include parties involved, key facts, timeline, issues, and any relevant background information. The more details you provide, the better the AI analysis will be.

Example: 'My client ABC Corp hired TechSolutions to develop a custom CRM system for ₹50 lakhs with a 6-month deadline. The project is now 6 months overdue with only 60% completion. The client has suffered business losses due to the delay and wants to pursue legal action for breach of contract...'"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[200px] resize-none"
                    rows={10}
                  />

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">{caseInput.length}/2000 characters</div>
                    <Button
                      onClick={handleStartAnalysis}
                      disabled={!caseInput.trim() || isAnalyzing}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Analyzing Case...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Start AI Analysis
                        </div>
                      )}
                    </Button>
                  </div>

                  {isAnalyzing && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Analysis Progress</span>
                        <span className="text-white">{analysisProgress}%</span>
                      </div>
                      <Progress value={analysisProgress} className="h-2" />
                      <p className="text-gray-400 text-sm">
                        AI is analyzing your case and breaking it down into structured steps...
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sample Cases */}
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    Sample Cases
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Try these sample cases to see Story Mode in action
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sampleCases.map((sampleCase, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                      onClick={() =>
                        setCaseInput(
                          `Sample Case: ${sampleCase.title}\n\n${sampleCase.description}\n\nThis is a ${sampleCase.complexity.toLowerCase()} complexity case that typically requires ${sampleCase.estimatedTime} for complete analysis.`,
                        )
                      }
                    >
                      <h4 className="font-semibold text-white mb-2">{sampleCase.title}</h4>
                      <p className="text-gray-400 text-sm mb-3">{sampleCase.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={sampleCase.complexity === "High" ? "destructive" : "default"}
                          className="text-xs"
                        >
                          {sampleCase.complexity}
                        </Badge>
                        <span className="text-gray-400 text-xs">{sampleCase.estimatedTime}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-400" />
                    How Story Mode Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "AI analyzes your case description",
                    "Breaks down into structured steps",
                    "Provides legal insights and precedents",
                    "Suggests optimal strategies",
                    "Recommends specific remedies",
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-300 text-sm">{step}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Progress Sidebar */}
            <div className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Case Analysis Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {storySteps.map((step, index) => {
                    const StepIcon = getStepIcon(step.type)
                    return (
                      <div
                        key={step.id}
                        className={`p-3 rounded-lg border transition-all cursor-pointer ${
                          index === currentStep
                            ? "border-blue-400 bg-blue-500/20"
                            : step.completed
                              ? "border-green-400 bg-green-500/20"
                              : "border-white/10 bg-white/5"
                        }`}
                        onClick={() => setCurrentStep(index)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getStepColor(step.type)} flex items-center justify-center`}
                          >
                            {step.completed ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <StepIcon className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white text-sm font-medium">{step.title}</h4>
                            <p className="text-gray-400 text-xs capitalize">{step.type}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {storySteps[currentStep] && (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getStepColor(storySteps[currentStep].type)} flex items-center justify-center`}
                            >
                              {React.createElement(getStepIcon(storySteps[currentStep].type), {
                                className: "w-6 h-6 text-white",
                              })}
                            </div>
                            <div>
                              <CardTitle className="text-white text-xl">{storySteps[currentStep].title}</CardTitle>
                              <CardDescription className="text-gray-400 capitalize">
                                Step {currentStep + 1} of {storySteps.length} • {storySteps[currentStep].type}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge
                            variant={storySteps[currentStep].completed ? "default" : "outline"}
                            className="text-xs"
                          >
                            {storySteps[currentStep].completed ? "Completed" : "In Progress"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="prose prose-invert max-w-none">
                          <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {storySteps[currentStep].content}
                          </div>
                        </div>

                        {storySteps[currentStep].suggestions && (
                          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4 text-yellow-400" />
                              AI Suggestions
                            </h4>
                            <div className="space-y-2">
                              {storySteps[currentStep].suggestions!.map((suggestion, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-gray-300 text-sm">{suggestion}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Export Step
                            </Button>
                            <Button
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                            >
                              <Brain className="w-4 h-4 mr-2" />
                              Ask AI
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            {currentStep > 0 && (
                              <Button
                                variant="outline"
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="border-white/20 text-white hover:bg-white/10"
                              >
                                Previous
                              </Button>
                            )}
                            {!storySteps[currentStep].completed && (
                              <Button
                                onClick={() => handleStepComplete(currentStep)}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mark Complete
                              </Button>
                            )}
                            {currentStep < storySteps.length - 1 && (
                              <Button
                                onClick={() => setCurrentStep(currentStep + 1)}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                              >
                                Next Step
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
