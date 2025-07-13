export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  verified: boolean
  userType: "lawyer" | "client"
}

export interface Case {
  id: string
  title: string
  client: string
  status: "draft" | "in-progress" | "review" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  dueDate: string
  progress: number
  description: string
  createdAt: Date
  updatedAt: Date
  category?: string
  budget?: string
  bids?: number
  lawyer?: string
}

export interface Bid {
  id: string
  caseId: string
  lawyerId: string
  lawyerName: string
  amount: number
  timeline: string
  proposal: string
  status: "pending" | "accepted" | "rejected"
  createdAt: Date
}

export interface Appointment {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  consultationType: string
  date: string
  time: string
  status: "scheduled" | "confirmed" | "completed" | "cancelled"
  notes?: string
  price: number
  createdAt: Date
}

export type Priority = "low" | "medium" | "high" | "urgent"
export type CaseStatus = "draft" | "in-progress" | "review" | "completed" | "cancelled"
