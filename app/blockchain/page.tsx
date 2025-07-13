"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Plus,
  Search,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Hash,
  Calendar,
  User,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { formatDateTime } from "@/lib/utils"

interface BlockchainRecord {
  id: string
  documentName: string
  documentType: string
  client: string
  hash: string
  blockNumber: string
  timestamp: Date
  status: "pending" | "confirmed" | "failed"
  transactionId: string
  gasUsed?: string
  networkFee?: string
}

const mockRecords: BlockchainRecord[] = [
  {
    id: "1",
    documentName: "Contract Agreement - ABC Corp",
    documentType: "Contract",
    client: "ABC Corporation",
    hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
    blockNumber: "18,456,789",
    timestamp: new Date("2024-01-12T10:30:00"),
    status: "confirmed",
    transactionId: "0xabc123def456789012345678901234567890123456789012345678901234567890",
    gasUsed: "21,000",
    networkFee: "0.002 ETH",
  },
  {
    id: "2",
    documentName: "Employment Agreement - John Doe",
    documentType: "Employment",
    client: "John Doe",
    hash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab",
    blockNumber: "18,456,790",
    timestamp: new Date("2024-01-12T11:15:00"),
    status: "confirmed",
    transactionId: "0xdef456789012345678901234567890123456789012345678901234567890abc123",
    gasUsed: "21,000",
    networkFee: "0.002 ETH",
  },
  {
    id: "3",
    documentName: "NDA - TechStart Inc",
    documentType: "NDA",
    client: "TechStart Inc.",
    hash: "0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab2b",
    blockNumber: "Pending",
    timestamp: new Date("2024-01-12T12:00:00"),
    status: "pending",
    transactionId: "0x789012345678901234567890123456789012345678901234567890abc123def4",
  },
  {
    id: "4",
    documentName: "Property Deed - Kumar Properties",
    documentType: "Property",
    client: "Kumar Properties",
    hash: "0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab2b3c",
    blockNumber: "18,456,788",
    timestamp: new Date("2024-01-11T16:45:00"),
    status: "confirmed",
    transactionId: "0x012345678901234567890123456789012345678901234567890abc123def4567",
    gasUsed: "21,000",
    networkFee: "0.002 ETH",
  },
]

export default function BlockchainPage() {
  const [records, setRecords] = useState<BlockchainRecord[]>(mockRecords)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isNotarizeOpen, setIsNotarizeOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<BlockchainRecord | null>(null)
  const [newNotarization, setNewNotarization] = useState({
    documentName: "",
    documentType: "",
    client: "",
    description: "",
  })

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.documentType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || record.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const handleNotarize = () => {
    const newRecord: BlockchainRecord = {
      id: Date.now().toString(),
      documentName: newNotarization.documentName,
      documentType: newNotarization.documentType,
      client: newNotarization.client,
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      blockNumber: "Pending",
      timestamp: new Date(),
      status: "pending",
      transactionId: `0x${Math.random().toString(16).substr(2, 64)}`,
    }

    setRecords([newRecord, ...records])
    setNewNotarization({
      documentName: "",
      documentType: "",
      client: "",
      description: "",
    })
    setIsNotarizeOpen(false)

    // Simulate blockchain confirmation after 3 seconds
    setTimeout(() => {
      setRecords((prev) =>
        prev.map((r) =>
          r.id === newRecord.id
            ? {
                ...r,
                status: "confirmed" as const,
                blockNumber: `18,456,${Math.floor(Math.random() * 1000) + 791}`,
                gasUsed: "21,000",
                networkFee: "0.002 ETH",
              }
            : r,
        ),
      )
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "failed":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const totalRecords = records.length
  const confirmedRecords = records.filter((r) => r.status === "confirmed").length
  const pendingRecords = records.filter((r) => r.status === "pending").length
  const failedRecords = records.filter((r) => r.status === "failed").length

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Blockchain Notarization</h1>
            <p className="text-gray-400">Secure document verification on the blockchain</p>
          </div>
          <Dialog open={isNotarizeOpen} onOpenChange={setIsNotarizeOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Notarize Document
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Notarize Document on Blockchain</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create an immutable record of your document on the blockchain.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="documentName">Document Name</Label>
                  <Input
                    id="documentName"
                    value={newNotarization.documentName}
                    onChange={(e) => setNewNotarization({ ...newNotarization, documentName: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Enter document name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documentType">Document Type</Label>
                  <Select
                    value={newNotarization.documentType}
                    onValueChange={(value) => setNewNotarization({ ...newNotarization, documentType: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Employment">Employment Agreement</SelectItem>
                      <SelectItem value="NDA">Non-Disclosure Agreement</SelectItem>
                      <SelectItem value="Property">Property Document</SelectItem>
                      <SelectItem value="Legal Opinion">Legal Opinion</SelectItem>
                      <SelectItem value="Court Filing">Court Filing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={newNotarization.client}
                    onChange={(e) => setNewNotarization({ ...newNotarization, client: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Enter client name"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={newNotarization.description}
                    onChange={(e) => setNewNotarization({ ...newNotarization, description: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                    rows={3}
                    placeholder="Enter document description"
                  />
                </div>
              </div>
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-400 font-medium mb-1">Blockchain Security</h4>
                    <p className="text-gray-300 text-sm">
                      This document will be hashed and stored on the Ethereum blockchain, creating an immutable
                      timestamp and proof of existence. Network fees apply.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNotarizeOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNotarize} className="bg-yellow-400 text-black hover:bg-yellow-500">
                  <Shield className="w-4 h-4 mr-2" />
                  Notarize (0.002 ETH)
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Records</p>
                  <p className="text-3xl font-bold text-white">{totalRecords}</p>
                </div>
                <Shield className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Confirmed</p>
                  <p className="text-3xl font-bold text-white">{confirmedRecords}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending</p>
                  <p className="text-3xl font-bold text-white">{pendingRecords}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Failed</p>
                  <p className="text-3xl font-bold text-white">{failedRecords}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search records..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40 bg-gray-800/50 border-gray-700">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Records Table */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
          <CardHeader>
            <CardTitle className="text-white">Blockchain Records</CardTitle>
            <CardDescription className="text-gray-400">
              Immutable document records stored on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-lg bg-gray-800/30 border border-gray-700 hover:border-yellow-400/40 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <FileText className="w-5 h-5 text-yellow-400" />
                        <h3 className="font-semibold text-white">{record.documentName}</h3>
                        <Badge className={getStatusColor(record.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(record.status)}
                            <span className="capitalize">{record.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <User className="w-4 h-4" />
                          <span>{record.client}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <FileText className="w-4 h-4" />
                          <span>{record.documentType}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDateTime(record.timestamp)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Hash className="w-4 h-4" />
                          <span>Block: {record.blockNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedRecord(record)}
                        className="border-gray-700 text-white hover:bg-gray-800"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Certificate
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded">
                      <span className="text-gray-400">Document Hash:</span>
                      <code className="text-yellow-400 font-mono text-xs bg-gray-800 px-2 py-1 rounded">
                        {record.hash}
                      </code>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded">
                      <span className="text-gray-400">Transaction ID:</span>
                      <code className="text-yellow-400 font-mono text-xs bg-gray-800 px-2 py-1 rounded">
                        {record.transactionId}
                      </code>
                    </div>
                    {record.gasUsed && record.networkFee && (
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded">
                          <span className="text-gray-400">Gas Used:</span>
                          <span className="text-white">{record.gasUsed}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-gray-900/50 rounded">
                          <span className="text-gray-400">Network Fee:</span>
                          <span className="text-white">{record.networkFee}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredRecords.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No records found</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filters"
                    : "Start by notarizing your first document on the blockchain"}
                </p>
                <Button
                  onClick={() => setIsNotarizeOpen(true)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Notarize Document
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Record Detail Dialog */}
        {selectedRecord && (
          <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
            <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-yellow-400" />
                  <span>Blockchain Record Details</span>
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Immutable record stored on the Ethereum blockchain
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Document Name</Label>
                    <p className="text-white font-medium">{selectedRecord.documentName}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Document Type</Label>
                    <p className="text-white font-medium">{selectedRecord.documentType}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Client</Label>
                    <p className="text-white font-medium">{selectedRecord.client}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Status</Label>
                    <Badge className={getStatusColor(selectedRecord.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(selectedRecord.status)}
                        <span className="capitalize">{selectedRecord.status}</span>
                      </div>
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-400">Block Number</Label>
                    <p className="text-white font-medium">{selectedRecord.blockNumber}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Timestamp</Label>
                    <p className="text-white font-medium">{formatDateTime(selectedRecord.timestamp)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-400">Document Hash (SHA-256)</Label>
                    <div className="mt-1 p-3 bg-gray-800 rounded-lg">
                      <code className="text-yellow-400 font-mono text-sm break-all">{selectedRecord.hash}</code>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400">Transaction ID</Label>
                    <div className="mt-1 p-3 bg-gray-800 rounded-lg">
                      <code className="text-yellow-400 font-mono text-sm break-all">
                        {selectedRecord.transactionId}
                      </code>
                    </div>
                  </div>
                </div>

                {selectedRecord.gasUsed && selectedRecord.networkFee && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400">Gas Used</Label>
                      <p className="text-white font-medium">{selectedRecord.gasUsed}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Network Fee</Label>
                      <p className="text-white font-medium">{selectedRecord.networkFee}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" className="border-gray-700 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                  <Button variant="outline" className="border-gray-700 bg-transparent">
                    View on Etherscan
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  )
}
