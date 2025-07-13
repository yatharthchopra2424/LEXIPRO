"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Download, Eye, Sparkles, Plus, Search, Edit, Copy } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface DocumentForm {
  type: string
  [key: string]: any
}

export default function DocumentGeneratorPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDocument, setGeneratedDocument] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<DocumentForm>({
    type: "",
  })

  const documentTemplates = [
    {
      id: "rental",
      title: "Rental Agreement",
      description: "Comprehensive rental agreement for residential/commercial properties",
      category: "Real Estate",
      complexity: "High",
      estimatedTime: "10-15 minutes",
      fields: ["Property Details", "Rent Amount", "Security Deposit", "Terms"],
    },
    {
      id: "nda",
      title: "Non-Disclosure Agreement",
      description: "Protect confidential information between parties",
      category: "Business",
      complexity: "Medium",
      estimatedTime: "5-10 minutes",
      fields: ["Party Names", "Confidential Information", "Duration", "Jurisdiction"],
    },
    {
      id: "employment",
      title: "Employment Contract",
      description: "Standard employment agreement template",
      category: "Employment",
      complexity: "High",
      estimatedTime: "15-20 minutes",
      fields: ["Job Title", "Salary", "Benefits", "Termination Clause"],
    },
    {
      id: "poa",
      title: "Power of Attorney",
      description: "Grant legal authority to another person",
      category: "Legal",
      complexity: "Medium",
      estimatedTime: "8-12 minutes",
      fields: ["Principal", "Agent", "Powers Granted", "Duration"],
    },
    {
      id: "msa",
      title: "Master Service Agreement",
      description: "Framework for ongoing business relationships",
      category: "Business",
      complexity: "High",
      estimatedTime: "20-25 minutes",
      fields: ["Service Scope", "Payment Terms", "Liability", "Termination"],
    },
    {
      id: "will",
      title: "Last Will & Testament",
      description: "Legal document for asset distribution",
      category: "Estate",
      complexity: "High",
      estimatedTime: "15-20 minutes",
      fields: ["Testator", "Beneficiaries", "Assets", "Executor"],
    },
  ]

  const recentDocuments = [
    {
      id: 1,
      title: "Rental Agreement - Downtown Office",
      type: "Rental Agreement",
      status: "Completed",
      createdAt: "2024-01-10",
      lastModified: "2024-01-10",
    },
    {
      id: 2,
      title: "NDA - TechCorp Partnership",
      type: "Non-Disclosure Agreement",
      status: "Draft",
      createdAt: "2024-01-09",
      lastModified: "2024-01-09",
    },
    {
      id: 3,
      title: "Employment Contract - Senior Developer",
      type: "Employment Contract",
      status: "Completed",
      createdAt: "2024-01-08",
      lastModified: "2024-01-08",
    },
  ]

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    setFormData({ type: templateId })
    setCurrentStep(2)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerateDocument = async () => {
    setIsGenerating(true)

    // Simulate document generation
    setTimeout(() => {
      let document = ""

      if (formData.type === "rental") {
        document = generateRentalAgreement()
      } else if (formData.type === "nda") {
        document = generateNDA()
      } else if (formData.type === "employment") {
        document = generateEmploymentContract()
      } else if (formData.type === "poa") {
        document = generatePowerOfAttorney()
      }

      setGeneratedDocument(document)
      setIsGenerating(false)
      setCurrentStep(3)
    }, 3000)
  }

  const generateRentalAgreement = () => {
    return `
# RENTAL AGREEMENT

This Rental Agreement is entered into on ${formData.agreementDate || "[DATE]"} between:

**LANDLORD/LESSOR:**
Name: ${formData.landlordName || "[LANDLORD NAME]"}
Address: ${formData.landlordAddress || "[LANDLORD ADDRESS]"}
Phone: ${formData.landlordPhone || "[LANDLORD PHONE]"}
Email: ${formData.landlordEmail || "[LANDLORD EMAIL]"}

**TENANT/LESSEE:**
Name: ${formData.tenantName || "[TENANT NAME]"}
Address: ${formData.tenantAddress || "[TENANT ADDRESS]"}
Phone: ${formData.tenantPhone || "[TENANT PHONE]"}
Email: ${formData.tenantEmail || "[TENANT EMAIL]"}

## PROPERTY DETAILS

**Property Address:** ${formData.propertyAddress || "[PROPERTY ADDRESS]"}
**Property Type:** ${formData.propertyType || "[PROPERTY TYPE]"}
**Area:** ${formData.propertyArea || "[AREA]"} sq ft
**Furnishing:** ${formData.furnishing || "[FURNISHED/UNFURNISHED]"}

## RENTAL TERMS

**Monthly Rent:** ₹${formData.monthlyRent || "[AMOUNT]"}
**Security Deposit:** ₹${formData.securityDeposit || "[AMOUNT]"}
**Lease Period:** ${formData.leasePeriod || "[DURATION]"}
**Lease Start Date:** ${formData.leaseStartDate || "[START DATE]"}
**Lease End Date:** ${formData.leaseEndDate || "[END DATE]"}

**Rent Due Date:** ${formData.rentDueDate || "1st"} of every month
**Late Fee:** ₹${formData.lateFee || "500"} per day after grace period
**Grace Period:** ${formData.gracePeriod || "5"} days

## TERMS AND CONDITIONS

1. **USE OF PREMISES:** The premises shall be used solely for ${formData.propertyUse || "residential"} purposes.

2. **MAINTENANCE:** 
   - Tenant is responsible for day-to-day maintenance and cleanliness
   - Landlord is responsible for major repairs and structural maintenance

3. **UTILITIES:** ${formData.utilitiesIncluded || "Electricity, water, and gas charges to be borne by tenant separately"}

4. **PETS:** ${formData.petsAllowed === "yes" ? "Pets are allowed with prior written consent" : "No pets allowed on the premises"}

5. **SUBLETTING:** Tenant cannot sublet the property without written consent from the landlord

6. **TERMINATION:**
   - Either party can terminate with ${formData.noticePeriod || "30"} days written notice
   - Breach of terms may result in immediate termination

7. **SECURITY DEPOSIT:**
   - Refundable upon satisfactory condition of property
   - May be used to cover damages or unpaid rent

## ADDITIONAL CLAUSES

${formData.additionalClauses || ""}

## GOVERNING LAW

This agreement shall be governed by the laws of ${formData.jurisdiction || "India"} and subject to the jurisdiction of ${formData.courtJurisdiction || "[CITY]"} courts.

**LANDLORD SIGNATURE:** ___________________ DATE: ___________

**TENANT SIGNATURE:** ___________________ DATE: ___________

**WITNESS 1:** ___________________ DATE: ___________

**WITNESS 2:** ___________________ DATE: ___________

---
*This document was generated by LexiPro AI Legal Assistant*
    `
  }

  const generateNDA = () => {
    return `
# NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${formData.agreementDate || "[DATE]"} by and between:

**DISCLOSING PARTY:**
${formData.partyOneName || "[PARTY ONE NAME]"}
${formData.partyOneAddress || "[PARTY ONE ADDRESS]"}

**RECEIVING PARTY:**
${formData.partyTwoName || "[PARTY TWO NAME]"}
${formData.partyTwoAddress || "[PARTY TWO ADDRESS]"}

## 1. CONFIDENTIAL INFORMATION

For purposes of this Agreement, "Confidential Information" shall include:
- ${formData.confidentialInfo || "All technical, business, financial, and proprietary information"}
- Trade secrets, know-how, and proprietary processes
- Customer lists, pricing information, and business strategies
- Any information marked as "Confidential" or that would reasonably be considered confidential

## 2. OBLIGATIONS OF RECEIVING PARTY

The Receiving Party agrees to:
- Hold all Confidential Information in strict confidence
- Not disclose Confidential Information to any third parties without written consent
- Use Confidential Information solely for the purpose of ${formData.purpose || "evaluating potential business relationships"}
- Take reasonable precautions to protect the confidentiality of the information

## 3. EXCEPTIONS

This Agreement does not apply to information that:
- Is publicly available through no breach of this Agreement
- Was known to the Receiving Party prior to disclosure
- Is independently developed without use of Confidential Information
- Is required to be disclosed by law or court order

## 4. TERM

This Agreement shall remain in effect for a period of ${formData.duration || "3"} years from the date first written above, unless terminated earlier by mutual consent.

## 5. RETURN OF INFORMATION

Upon termination or upon request, the Receiving Party shall return or destroy all materials containing Confidential Information.

## 6. REMEDIES

The Receiving Party acknowledges that breach of this Agreement may cause irreparable harm, and the Disclosing Party shall be entitled to seek injunctive relief and monetary damages.

## 7. GOVERNING LAW

This Agreement shall be governed by the laws of ${formData.jurisdiction || "India"} and subject to the jurisdiction of ${formData.courtJurisdiction || "[CITY]"} courts.

**DISCLOSING PARTY:** ___________________ DATE: ___________

**RECEIVING PARTY:** ___________________ DATE: ___________

---
*This document was generated by LexiPro AI Legal Assistant*
    `
  }

  const generateEmploymentContract = () => {
    return `
# EMPLOYMENT CONTRACT

This Employment Agreement is entered into on ${formData.agreementDate || "[DATE]"} between:

**EMPLOYER:**
Company: ${formData.companyName || "[COMPANY NAME]"}
Address: ${formData.companyAddress || "[COMPANY ADDRESS]"}
Registration No: ${formData.companyRegNo || "[REGISTRATION NUMBER]"}

**EMPLOYEE:**
Name: ${formData.employeeName || "[EMPLOYEE NAME]"}
Address: ${formData.employeeAddress || "[EMPLOYEE ADDRESS]"}
Phone: ${formData.employeePhone || "[PHONE NUMBER]"}
Email: ${formData.employeeEmail || "[EMAIL ADDRESS]"}

## EMPLOYMENT DETAILS

**Position:** ${formData.jobTitle || "[JOB TITLE]"}
**Department:** ${formData.department || "[DEPARTMENT]"}
**Reporting Manager:** ${formData.reportingManager || "[MANAGER NAME]"}
**Employment Type:** ${formData.employmentType || "Full-time"}
**Start Date:** ${formData.startDate || "[START DATE]"}
**Probation Period:** ${formData.probationPeriod || "6"} months

## COMPENSATION & BENEFITS

**Annual Salary:** ₹${formData.annualSalary || "[AMOUNT]"}
**Monthly Salary:** ₹${formData.monthlySalary || "[AMOUNT]"}
**Payment Schedule:** ${formData.paymentSchedule || "Monthly on the last working day"}

**Benefits Include:**
- ${formData.benefits || "Health insurance, provident fund, gratuity as per company policy"}
- Annual leave: ${formData.annualLeave || "21"} days
- Sick leave: ${formData.sickLeave || "12"} days
- Casual leave: ${formData.casualLeave || "12"} days

## DUTIES AND RESPONSIBILITIES

The Employee shall:
- ${formData.responsibilities || "Perform duties as assigned by the reporting manager"}
- Maintain confidentiality of company information
- Comply with company policies and procedures
- Devote full time and attention to company business during working hours

## WORKING HOURS

**Standard Hours:** ${formData.workingHours || "9:00 AM to 6:00 PM, Monday to Friday"}
**Weekly Hours:** ${formData.weeklyHours || "40"} hours
**Overtime:** As per company policy and applicable labor laws

## TERMINATION

**Notice Period:** ${formData.noticePeriod || "30"} days written notice by either party
**Termination for Cause:** Immediate termination for misconduct, breach of contract, or poor performance

## CONFIDENTIALITY

Employee agrees to maintain strict confidentiality of all proprietary information, trade secrets, and business processes of the company.

## NON-COMPETE

Employee agrees not to engage in competing business activities during employment and for ${formData.nonCompetePeriod || "12"} months after termination.

## GOVERNING LAW

This contract is governed by the laws of India and subject to the jurisdiction of ${formData.courtJurisdiction || "[CITY]"} courts.

**EMPLOYER:** ___________________ DATE: ___________

**EMPLOYEE:** ___________________ DATE: ___________

**WITNESS:** ___________________ DATE: ___________

---
*This document was generated by LexiPro AI Legal Assistant*
    `
  }

  const generatePowerOfAttorney = () => {
    return `
# POWER OF ATTORNEY

I, ${formData.principalName || "[PRINCIPAL NAME]"}, son/daughter of ${formData.principalFatherName || "[FATHER'S NAME]"}, aged ${formData.principalAge || "[AGE]"} years, residing at ${formData.principalAddress || "[PRINCIPAL ADDRESS]"}, do hereby nominate, constitute and appoint ${formData.agentName || "[AGENT NAME]"}, son/daughter of ${formData.agentFatherName || "[FATHER'S NAME]"}, aged ${formData.agentAge || "[AGE]"} years, residing at ${formData.agentAddress || "[AGENT ADDRESS]"}, as my true and lawful attorney.

## POWERS GRANTED

I hereby authorize my said attorney to act for me and on my behalf and to do all or any of the following acts, deeds and things:

${
  formData.specificPowers ||
  `
1. To represent me in all legal proceedings and matters
2. To sign, execute and deliver any documents on my behalf
3. To collect, receive and give receipts for any money due to me
4. To make, endorse, accept and negotiate bills of exchange and promissory notes
5. To open, operate and close bank accounts in my name
6. To buy, sell, mortgage or lease any property belonging to me
7. To appear before any court, tribunal or authority on my behalf
8. To engage lawyers and legal counsel for any legal matters
`
}

## SPECIFIC MATTERS

This Power of Attorney is granted specifically for: ${formData.specificMatters || "[SPECIFY THE SPECIFIC MATTERS/TRANSACTIONS]"}

## DURATION

This Power of Attorney shall remain in force from ${formData.startDate || "[START DATE]"} to ${formData.endDate || "[END DATE]"} unless revoked earlier by me in writing.

## REVOCATION

I reserve the right to revoke this Power of Attorney at any time by giving written notice to my attorney and to all concerned parties.

## RATIFICATION

I hereby agree to ratify and confirm all acts, deeds and things lawfully done by my said attorney by virtue of these presents.

## INDEMNITY

I undertake to indemnify and keep harmless my said attorney from and against all claims, demands, proceedings, losses, damages, costs and expenses arising from the exercise of powers granted herein.

IN WITNESS WHEREOF, I have executed this Power of Attorney on this ${formData.executionDate || "[DATE]"} at ${formData.executionPlace || "[PLACE]"}.

**PRINCIPAL:** ___________________ 
${formData.principalName || "[PRINCIPAL NAME]"}

**ATTORNEY:** ___________________
${formData.agentName || "[AGENT NAME]"}

**WITNESS 1:** ___________________ DATE: ___________

**WITNESS 2:** ___________________ DATE: ___________

**NOTARY PUBLIC:** ___________________ DATE: ___________

---
*This document was generated by LexiPro AI Legal Assistant*
    `
  }

  const renderFormFields = () => {
    if (formData.type === "rental") {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Agreement Date *</Label>
              <Input
                type="date"
                value={formData.agreementDate || ""}
                onChange={(e) => handleInputChange("agreementDate", e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Lease Period *</Label>
              <Select onValueChange={(value) => handleInputChange("leasePeriod", value)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select lease period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="11 months">11 months</SelectItem>
                  <SelectItem value="1 year">1 year</SelectItem>
                  <SelectItem value="2 years">2 years</SelectItem>
                  <SelectItem value="3 years">3 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Landlord Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Landlord Name *</Label>
                <Input
                  placeholder="Full name of landlord"
                  value={formData.landlordName || ""}
                  onChange={(e) => handleInputChange("landlordName", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Landlord Phone *</Label>
                <Input
                  placeholder="+91 98765 43210"
                  value={formData.landlordPhone || ""}
                  onChange={(e) => handleInputChange("landlordPhone", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-white">Landlord Address *</Label>
                <Textarea
                  placeholder="Complete address of landlord"
                  value={formData.landlordAddress || ""}
                  onChange={(e) => handleInputChange("landlordAddress", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Landlord Email</Label>
                <Input
                  type="email"
                  placeholder="landlord@email.com"
                  value={formData.landlordEmail || ""}
                  onChange={(e) => handleInputChange("landlordEmail", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Tenant Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Tenant Name *</Label>
                <Input
                  placeholder="Full name of tenant"
                  value={formData.tenantName || ""}
                  onChange={(e) => handleInputChange("tenantName", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Tenant Phone *</Label>
                <Input
                  placeholder="+91 98765 43210"
                  value={formData.tenantPhone || ""}
                  onChange={(e) => handleInputChange("tenantPhone", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-white">Tenant Address *</Label>
                <Textarea
                  placeholder="Complete address of tenant"
                  value={formData.tenantAddress || ""}
                  onChange={(e) => handleInputChange("tenantAddress", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Tenant Email</Label>
                <Input
                  type="email"
                  placeholder="tenant@email.com"
                  value={formData.tenantEmail || ""}
                  onChange={(e) => handleInputChange("tenantEmail", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Property Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label className="text-white">Property Address *</Label>
                <Textarea
                  placeholder="Complete address of the rental property"
                  value={formData.propertyAddress || ""}
                  onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Property Type *</Label>
                <Select onValueChange={(value) => handleInputChange("propertyType", value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="House">Independent House</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Office">Office Space</SelectItem>
                    <SelectItem value="Shop">Shop/Retail</SelectItem>
                    <SelectItem value="Warehouse">Warehouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Property Area (sq ft) *</Label>
                <Input
                  placeholder="1200"
                  value={formData.propertyArea || ""}
                  onChange={(e) => handleInputChange("propertyArea", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Furnishing Status *</Label>
                <Select onValueChange={(value) => handleInputChange("furnishing", value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select furnishing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fully Furnished">Fully Furnished</SelectItem>
                    <SelectItem value="Semi Furnished">Semi Furnished</SelectItem>
                    <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Property Use *</Label>
                <Select onValueChange={(value) => handleInputChange("propertyUse", value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select usage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Financial Terms</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Monthly Rent (₹) *</Label>
                <Input
                  placeholder="25000"
                  value={formData.monthlyRent || ""}
                  onChange={(e) => handleInputChange("monthlyRent", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Security Deposit (₹) *</Label>
                <Input
                  placeholder="50000"
                  value={formData.securityDeposit || ""}
                  onChange={(e) => handleInputChange("securityDeposit", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Lease Start Date *</Label>
                <Input
                  type="date"
                  value={formData.leaseStartDate || ""}
                  onChange={(e) => handleInputChange("leaseStartDate", e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Lease End Date *</Label>
                <Input
                  type="date"
                  value={formData.leaseEndDate || ""}
                  onChange={(e) => handleInputChange("leaseEndDate", e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Rent Due Date</Label>
                <Select onValueChange={(value) => handleInputChange("rentDueDate", value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select due date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st of every month</SelectItem>
                    <SelectItem value="5th">5th of every month</SelectItem>
                    <SelectItem value="10th">10th of every month</SelectItem>
                    <SelectItem value="15th">15th of every month</SelectItem>
                    <SelectItem value="Last">Last day of month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Late Fee (₹/day)</Label>
                <Input
                  placeholder="500"
                  value={formData.lateFee || ""}
                  onChange={(e) => handleInputChange("lateFee", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Additional Terms</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Pets Allowed</Label>
                <Select onValueChange={(value) => handleInputChange("petsAllowed", value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No pets allowed</SelectItem>
                    <SelectItem value="yes">Pets allowed with consent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Notice Period (days)</Label>
                <Select onValueChange={(value) => handleInputChange("noticePeriod", value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select notice period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-white">Utilities Included</Label>
                <Textarea
                  placeholder="Specify which utilities are included (electricity, water, gas, internet, etc.)"
                  value={formData.utilitiesIncluded || ""}
                  onChange={(e) => handleInputChange("utilitiesIncluded", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  rows={2}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-white">Additional Clauses</Label>
                <Textarea
                  placeholder="Any additional terms and conditions"
                  value={formData.additionalClauses || ""}
                  onChange={(e) => handleInputChange("additionalClauses", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Legal Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Jurisdiction</Label>
                <Input
                  placeholder="State/Country"
                  value={formData.jurisdiction || ""}
                  onChange={(e) => handleInputChange("jurisdiction", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Court Jurisdiction</Label>
                <Input
                  placeholder="City for court jurisdiction"
                  value={formData.courtJurisdiction || ""}
                  onChange={(e) => handleInputChange("courtJurisdiction", e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Add similar detailed forms for other document types...
    return <div className="text-white">Form fields for {formData.type} will be implemented here.</div>
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Document Generator</h1>
            <p className="text-gray-400">Create professional legal documents with AI assistance</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              <Search className="w-4 h-4 mr-2" />
              Search Templates
            </Button>
            <Button className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Custom Template
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        {currentStep > 1 && (
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step ? "bg-[#FCD34D] border-[#FCD34D] text-black" : "border-gray-600 text-gray-400"
                    }`}
                  >
                    <span className="font-bold">{step}</span>
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                        currentStep > step ? "bg-[#FCD34D]" : "bg-gray-600"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <Tabs defaultValue="templates" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="templates" className="data-[state=active]:bg-white/10">
                Document Templates
              </TabsTrigger>
              <TabsTrigger value="recent" className="data-[state=active]:bg-white/10">
                Recent Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-6">
              {/* Template Categories */}
              <div className="flex gap-2 flex-wrap">
                {["All", "Business", "Real Estate", "Employment", "Legal", "Estate"].map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 cursor-pointer"
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 h-full cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 bg-gradient-to-r from-[#FCD34D] to-yellow-600 rounded-xl flex items-center justify-center mb-4">
                            <FileText className="w-6 h-6 text-black" />
                          </div>
                          <Badge variant="outline" className="border-white/20 text-white">
                            {template.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-white group-hover:text-[#FCD34D] transition-colors">
                          {template.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400">{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Complexity:</span>
                          <Badge
                            variant={
                              template.complexity === "High"
                                ? "destructive"
                                : template.complexity === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {template.complexity}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Est. Time:</span>
                          <span className="text-white">{template.estimatedTime}</span>
                        </div>
                        <div className="space-y-2">
                          <span className="text-gray-400 text-sm">Required Fields:</span>
                          <div className="flex flex-wrap gap-1">
                            {template.fields.slice(0, 3).map((field, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-300">
                                {field}
                              </Badge>
                            ))}
                            {template.fields.length > 3 && (
                              <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                                +{template.fields.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                          onClick={() => handleTemplateSelect(template.id)}
                        >
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Recent Documents</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your recently created and modified documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1">{doc.title}</h4>
                            <p className="text-gray-400 text-sm mb-2">{doc.type}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span>Created: {doc.createdAt}</span>
                              <span>Modified: {doc.lastModified}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={doc.status === "Completed" ? "default" : "outline"} className="text-xs">
                              {doc.status}
                            </Badge>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {currentStep === 2 && (
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FCD34D]" />
                Document Details
              </CardTitle>
              <CardDescription className="text-gray-400">
                Fill in the details to generate your legal document
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderFormFields()}

              <div className="flex justify-between pt-6 border-t border-white/10 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Back to Templates
                </Button>
                <Button
                  onClick={handleGenerateDocument}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Generating Document...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Generate Document
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && generatedDocument && (
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Generated Document</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Document
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 max-h-96 overflow-y-auto">
                <pre className="text-white text-sm whitespace-pre-wrap font-mono leading-relaxed">
                  {generatedDocument}
                </pre>
              </div>

              <div className="flex justify-between pt-6 border-t border-white/10 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Edit Details
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentStep(1)
                      setSelectedTemplate("")
                      setFormData({ type: "" })
                      setGeneratedDocument("")
                    }}
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Create New Document
                  </Button>
                  <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold">
                    Save & Finalize
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
