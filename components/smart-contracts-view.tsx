"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { FileText, CheckCircle, Clock, AlertTriangle, Plus, Search, Eye, Edit, Trash2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const contracts = [
  {
    id: "0x1a2b3c4d",
    name: "Herb Quality Verification",
    type: "Quality Assurance",
    status: "Active",
    deployedDate: "2025-01-10",
    lastExecution: "2025-01-14",
    gasUsed: "45,230",
    transactions: 127,
    description: "Automated quality verification for herb batches based on lab test results",
  },
  {
    id: "0x5e6f7g8h",
    name: "Supply Chain Tracking",
    type: "Logistics",
    status: "Active",
    deployedDate: "2025-01-08",
    lastExecution: "2025-01-14",
    gasUsed: "38,450",
    transactions: 89,
    description: "Tracks herb movement from farm to consumer with automated milestone updates",
  },
  {
    id: "0x9i0j1k2l",
    name: "Stakeholder Payment",
    type: "Financial",
    status: "Pending",
    deployedDate: "2025-01-12",
    lastExecution: "Never",
    gasUsed: "0",
    transactions: 0,
    description: "Automated payment distribution to farmers and processors upon delivery confirmation",
  },
  {
    id: "0x3m4n5o6p",
    name: "Compliance Monitoring",
    type: "Regulatory",
    status: "Active",
    deployedDate: "2025-01-05",
    lastExecution: "2025-01-14",
    gasUsed: "52,180",
    transactions: 203,
    description: "Monitors compliance with AYUSH guidelines and WHO-GMP standards",
  },
]

const contractTemplates = [
  {
    name: "Quality Verification",
    description: "Verify herb quality based on lab test parameters",
    parameters: ["Temperature", "Humidity", "Purity Level", "Batch ID"],
  },
  {
    name: "Traceability Tracking",
    description: "Track herb movement through supply chain stages",
    parameters: ["Location", "Timestamp", "Handler ID", "Condition"],
  },
  {
    name: "Payment Escrow",
    description: "Automated payment release upon milestone completion",
    parameters: ["Amount", "Recipient", "Milestone", "Conditions"],
  },
]

export function SmartContractsView() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployDialogOpen, setDeployDialogOpen] = useState(false)
  const [contractForm, setContractForm] = useState({
    name: "",
    type: "",
    description: "",
    code: "",
    gasLimit: "500000",
    gasPrice: "20",
  })
  const { toast } = useToast()

  const handleDeployContract = async () => {
    if (!contractForm.name || !contractForm.type || !contractForm.code) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsDeploying(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Contract Deployed Successfully",
        description: `${contractForm.name} has been deployed to the blockchain`,
      })

      setContractForm({
        name: "",
        type: "",
        description: "",
        code: "",
        gasLimit: "500000",
        gasPrice: "20",
      })
      setDeployDialogOpen(false)
    } catch (error) {
      toast({
        title: "Deployment Failed",
        description: "Failed to deploy contract. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeploying(false)
    }
  }

  const handleUseTemplate = (template: any) => {
    setContractForm((prev) => ({
      ...prev,
      name: template.name,
      type: template.name,
      description: template.description,
      code: `// ${template.name} Contract Template\n// Parameters: ${template.parameters.join(", ")}\n\npragma solidity ^0.8.0;\n\ncontract ${template.name.replace(/\s+/g, "")} {\n    // Contract implementation here\n}`,
    }))
    setDeployDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Smart Contracts</h1>
          <p className="text-sm text-gray-500">Manage and monitor blockchain smart contracts</p>
        </div>
        <Dialog open={deployDialogOpen} onOpenChange={setDeployDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              Deploy Contract
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Deploy New Smart Contract</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Contract Name *</Label>
                  <Input
                    id="name"
                    value={contractForm.name}
                    onChange={(e) => setContractForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter contract name"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Contract Type *</Label>
                  <Select
                    value={contractForm.type}
                    onValueChange={(value) => setContractForm((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                      <SelectItem value="Logistics">Logistics</SelectItem>
                      <SelectItem value="Financial">Financial</SelectItem>
                      <SelectItem value="Regulatory">Regulatory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={contractForm.description}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the contract functionality"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gasLimit">Gas Limit</Label>
                  <Input
                    id="gasLimit"
                    value={contractForm.gasLimit}
                    onChange={(e) => setContractForm((prev) => ({ ...prev, gasLimit: e.target.value }))}
                    placeholder="500000"
                  />
                </div>
                <div>
                  <Label htmlFor="gasPrice">Gas Price (Gwei)</Label>
                  <Input
                    id="gasPrice"
                    value={contractForm.gasPrice}
                    onChange={(e) => setContractForm((prev) => ({ ...prev, gasPrice: e.target.value }))}
                    placeholder="20"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="code">Contract Code *</Label>
                <Textarea
                  id="code"
                  value={contractForm.code}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, code: e.target.value }))}
                  placeholder="Paste your Solidity contract code here"
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button
                  onClick={handleDeployContract}
                  disabled={isDeploying}
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Deploy Contract
                    </>
                  )}
                </Button>
                <Button variant="outline" disabled={isDeploying}>
                  Validate Code
                </Button>
                <Button variant="outline" disabled={isDeploying}>
                  Save Draft
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">12</p>
                <p className="text-sm text-gray-500">Total Contracts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">9</p>
                <p className="text-sm text-gray-500">Active Contracts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">2</p>
                <p className="text-sm text-gray-500">Pending Contracts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">1</p>
                <p className="text-sm text-gray-500">Failed Contracts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contracts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="contracts">Active Contracts</TabsTrigger>
          <TabsTrigger value="templates">Contract Templates</TabsTrigger>
          <TabsTrigger value="deploy">Deploy New</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search contracts..." className="pl-10" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>

          {/* Contracts List */}
          <div className="space-y-4">
            {contracts.map((contract) => (
              <Card key={contract.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{contract.name}</h3>
                        <Badge
                          variant={
                            contract.status === "Active"
                              ? "default"
                              : contract.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className={contract.status === "Active" ? "bg-emerald-100 text-emerald-700" : ""}
                        >
                          {contract.status}
                        </Badge>
                        <Badge variant="outline">{contract.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{contract.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Contract ID</p>
                          <p className="font-mono text-gray-900">{contract.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Deployed</p>
                          <p className="text-gray-900">{contract.deployedDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Transactions</p>
                          <p className="text-gray-900">{contract.transactions}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Gas Used</p>
                          <p className="text-gray-900">{contract.gasUsed}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contractTemplates.map((template, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">Parameters:</p>
                    <div className="flex flex-wrap gap-2">
                      {template.parameters.map((param, paramIndex) => (
                        <Badge key={paramIndex} variant="outline" className="text-xs">
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleUseTemplate(template)}
                    className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600"
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deploy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deploy New Smart Contract</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deploy-name">Contract Name</Label>
                  <Input
                    id="deploy-name"
                    value={contractForm.name}
                    onChange={(e) => setContractForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter contract name"
                  />
                </div>
                <div>
                  <Label htmlFor="deploy-type">Contract Type</Label>
                  <Input
                    id="deploy-type"
                    value={contractForm.type}
                    onChange={(e) => setContractForm((prev) => ({ ...prev, type: e.target.value }))}
                    placeholder="e.g., Quality Assurance"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="deploy-description">Description</Label>
                <Textarea
                  id="deploy-description"
                  value={contractForm.description}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the contract functionality"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="deploy-code">Contract Code</Label>
                <Textarea
                  id="deploy-code"
                  value={contractForm.code}
                  onChange={(e) => setContractForm((prev) => ({ ...prev, code: e.target.value }))}
                  placeholder="Paste your Solidity contract code here"
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={handleDeployContract}
                  disabled={isDeploying}
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    "Deploy Contract"
                  )}
                </Button>
                <Button variant="outline" disabled={isDeploying}>
                  Validate Code
                </Button>
                <Button variant="outline" disabled={isDeploying}>
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
