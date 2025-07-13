"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Brain,
  Send,
  Download,
  Copy,
  Sparkles,
  MessageSquare,
  Clock,
  CheckCircle,
  Paperclip,
  Mic,
  MicOff,
  FileText,
  Scale,
  BookOpen,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  attachments?: string[]
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI Legal Assistant powered by advanced legal knowledge. I can help you with:\n\n• Legal research and case analysis\n• Document drafting and review\n• Indian law interpretations\n• Precedent case findings\n• Legal strategy suggestions\n\nHow can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Simulate AI response with legal context
      setTimeout(() => {
        let response = ""

        if (inputMessage.toLowerCase().includes("contract")) {
          response = `**Contract Law Analysis:**

Based on your query about "${inputMessage}", here's my legal analysis:

**1. Legal Framework:**
- Indian Contract Act, 1872 - Sections 10, 23, 56
- Specific Relief Act, 1963 for specific performance
- Sale of Goods Act, 1930 (if applicable)

**2. Key Considerations:**
- **Offer and Acceptance**: Must be clear and unambiguous
- **Consideration**: Must be lawful and adequate
- **Capacity**: Parties must be competent to contract
- **Free Consent**: No coercion, fraud, or misrepresentation

**3. Recommended Actions:**
- Review all terms and conditions thoroughly
- Ensure proper documentation and signatures
- Include dispute resolution clauses
- Consider jurisdiction and governing law clauses

**4. Precedent Cases:**
- *Carlill v. Carbolic Smoke Ball Co.* - Unilateral contracts
- *Hadley v. Baxendale* - Damages for breach
- *Central London Property Trust v. High Trees House* - Promissory estoppel

Would you like me to draft a specific contract clause or analyze a particular aspect in detail?`
        } else if (inputMessage.toLowerCase().includes("employment")) {
          response = `**Employment Law Guidance:**

Regarding your employment law query: "${inputMessage}"

**1. Applicable Laws:**
- Industrial Disputes Act, 1947
- Employees' Provident Funds Act, 1952
- Payment of Wages Act, 1936
- Factories Act, 1948
- Labour Laws (Exemption from Furnishing Returns and Maintaining Registers by Certain Establishments) Act, 1988

**2. Key Rights & Obligations:**
- **Employee Rights**: Fair wages, safe working conditions, social security
- **Employer Obligations**: Compliance with labor laws, timely payment
- **Termination**: Notice period, severance pay, due process

**3. Recent Developments:**
- New Labour Codes (2019-2020) - consolidation of 29 labor laws
- Work from Home policies post-COVID
- Gig economy regulations

**4. Recommended Steps:**
- Document all employment terms clearly
- Ensure compliance with minimum wage laws
- Implement proper grievance mechanisms
- Regular policy updates as per law changes

Need help with a specific employment contract or dispute resolution?`
        } else if (
          inputMessage.toLowerCase().includes("property") ||
          inputMessage.toLowerCase().includes("real estate")
        ) {
          response = `**Property Law Analysis:**

For your property-related query: "${inputMessage}"

**1. Governing Laws:**
- Transfer of Property Act, 1882
- Registration Act, 1908
- Indian Stamp Act, 1899
- Real Estate (Regulation and Development) Act, 2016 (RERA)

**2. Key Documentation:**
- **Sale Deed**: Primary document for property transfer
- **Title Documents**: Chain of ownership verification
- **Encumbrance Certificate**: Clear title verification
- **NOC**: From relevant authorities

**3. Due Diligence Checklist:**
- Verify clear and marketable title
- Check for any encumbrances or liens
- Ensure proper approvals and permissions
- Verify property tax payments
- Check for any pending litigation

**4. RERA Compliance:**
- Project registration requirements
- Buyer protection mechanisms
- Complaint redressal procedures
- Mandatory disclosures

**5. Tax Implications:**
- Stamp duty and registration charges
- Capital gains tax considerations
- TDS provisions under Income Tax Act

Would you like me to help with property document verification or draft a sale agreement?`
        } else {
          response = `I understand you're asking about "${inputMessage}". Based on Indian legal framework, here's my analysis:

**Legal Context:**
This matter may involve multiple areas of law including constitutional, civil, or criminal provisions depending on the specific circumstances.

**Key Considerations:**
- Applicable statutory provisions and rules
- Relevant case law and judicial precedents
- Procedural requirements and timelines
- Available legal remedies

**Suggested Approach:**
1. Gather all relevant facts and documentation
2. Identify the specific legal issues involved
3. Research applicable laws and precedents
4. Consider alternative dispute resolution methods
5. Prepare comprehensive legal strategy

**Next Steps:**
- Could you provide more specific details about your legal matter?
- Are there any particular aspects you'd like me to focus on?
- Do you need help with document drafting or legal research?

I'm here to provide detailed legal guidance tailored to your specific needs.`
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: response,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      setIsLoading(false)
      console.error("Error generating response:", error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice input implementation would go here
  }

  const quickPrompts = [
    "Draft an NDA for a tech startup",
    "Analyze contract breach scenario",
    "Research employment law precedents",
    "Create a legal notice template",
    "Explain intellectual property rights",
    "Draft a rental agreement",
    "Review partnership deed clauses",
    "Explain consumer protection laws",
  ]

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Legal Assistant</h1>
              <p className="text-gray-400">Powered by GPT-4 with Indian Legal Knowledge</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Online
            </Badge>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="flex-1 bg-white/5 backdrop-blur-sm border-white/10 flex flex-col">
              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-[#FCD34D] to-yellow-600 text-black"
                          : "bg-white/10 text-white border border-white/10"
                      } rounded-2xl p-4`}
                    >
                      <div className="flex items-start gap-3">
                        {message.type === "assistant" && (
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                            {message.type === "assistant" && (
                              <div className="flex gap-1">
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-white/10">
                                  <Copy className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-white/10">
                                  <Download className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 p-4">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <Textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about law, draft documents, or analyze cases..."
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 resize-none min-h-[60px] max-h-32"
                      rows={2}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleFileUpload}
                      className="text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleVoiceInput}
                      className={`${isListening ? "text-red-400 bg-red-500/20" : "text-gray-400"} hover:text-white hover:bg-white/10`}
                    >
                      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" multiple />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Prompts */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Quick Prompts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-white/10 h-auto p-3"
                    onClick={() => setInputMessage(prompt)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{prompt}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Recent Conversations */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Conversations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: "Contract Analysis", time: "2 hours ago", status: "completed" },
                  { title: "NDA Drafting", time: "1 day ago", status: "completed" },
                  { title: "Legal Research", time: "2 days ago", status: "completed" },
                ].map((conversation, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white text-sm font-medium">{conversation.title}</h4>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <p className="text-gray-400 text-xs">{conversation.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Capabilities */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-400" />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Legal document drafting",
                  "Case law research",
                  "Contract analysis",
                  "Legal advice & consultation",
                  "Document summarization",
                  "Precedent case finding",
                  "Indian law interpretation",
                  "Legal strategy planning",
                ].map((capability, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">{capability}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Legal Resources */}
            <Card className="bg-gradient-to-br from-[#FCD34D]/10 to-yellow-600/10 backdrop-blur-sm border-[#FCD34D]/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#FCD34D]" />
                  Legal Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: "Indian Constitution", icon: Scale },
                  { title: "Contract Act, 1872", icon: FileText },
                  { title: "Criminal Procedure Code", icon: Scale },
                  { title: "Civil Procedure Code", icon: FileText },
                ].map((resource, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded hover:bg-white/5 cursor-pointer">
                    <resource.icon className="w-4 h-4 text-[#FCD34D]" />
                    <span className="text-gray-300 text-sm">{resource.title}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
