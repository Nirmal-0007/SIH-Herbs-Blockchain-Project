"use client"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  QrCode,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Download,
  Plus,
  Scan,
  Smartphone,
  Globe,
  Shield,
  MapPin,
  User,
  ExternalLink,
  Copy,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { useNotifications } from "@/components/providers/notification-provider"

const qrCodes = [
  {
    id: "QR001",
    productName: "Ashwagandha Root Powder",
    batchId: "BATCH001",
    generatedDate: "2025-01-10",
    status: "Active",
    scans: 45,
    lastScanned: "2025-01-14 10:30",
    location: "Mumbai, India",
    qrData: "https://herbtrust.com/verify/QR001",
    manufacturer: "HerbTech Industries",
    expiryDate: "2026-01-10",
    certifications: ["Organic", "ISO 9001", "FSSAI"],
    description: "Premium quality Ashwagandha root powder sourced from organic farms in Rajasthan",
    weight: "500g",
    price: "₹899",
  },
  {
    id: "QR002",
    productName: "Turmeric Extract",
    batchId: "BATCH002",
    generatedDate: "2025-01-12",
    status: "Active",
    scans: 23,
    lastScanned: "2025-01-14 09:15",
    location: "Delhi, India",
    qrData: "https://herbtrust.com/verify/QR002",
    manufacturer: "Golden Spice Co.",
    expiryDate: "2026-01-12",
    certifications: ["Organic", "GMP"],
    description: "High-potency turmeric extract with 95% curcumin content",
    weight: "250g",
    price: "₹1,299",
  },
  {
    id: "QR003",
    productName: "Neem Leaf Powder",
    batchId: "BATCH003",
    generatedDate: "2025-01-08",
    status: "Expired",
    scans: 67,
    lastScanned: "2025-01-13 16:45",
    location: "Bangalore, India",
    qrData: "https://herbtrust.com/verify/QR003",
    manufacturer: "Nature's Best",
    expiryDate: "2025-01-08",
    certifications: ["Organic"],
    description: "Pure neem leaf powder for natural wellness and skincare",
    weight: "100g",
    price: "₹399",
  },
]

const verificationHistory = [
  {
    id: "VER001",
    qrId: "QR001",
    productName: "Ashwagandha Root Powder",
    scanTime: "2025-01-14 10:30",
    location: "Mumbai, India",
    status: "Verified",
    verifier: "Consumer App",
    details: "Product authenticity confirmed",
  },
  {
    id: "VER002",
    qrId: "QR002",
    productName: "Turmeric Extract",
    scanTime: "2025-01-14 09:15",
    location: "Delhi, India",
    status: "Verified",
    verifier: "Retailer Portal",
    details: "Batch information validated",
  },
  {
    id: "VER003",
    qrId: "QR001",
    productName: "Ashwagandha Root Powder",
    scanTime: "2025-01-14 08:45",
    location: "Pune, India",
    status: "Failed",
    verifier: "Mobile App",
    details: "QR code damaged or corrupted",
  },
]

export function QRVerificationView() {
  const [selectedQR, setSelectedQR] = useState<any>(null)
  const { addNotification } = useNotifications()

  const handleDownloadQR = (qr: any) => {
    addNotification({
      type: "success",
      title: "QR Code Downloaded",
      message: `QR code for ${qr.productName} has been downloaded successfully.`,
    })
  }

  const handleInstallApp = () => {
    addNotification({
      type: "info",
      title: "App Installation",
      message: "Redirecting to app store for HerbTrust Verifier app installation.",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    addNotification({
      type: "success",
      title: "Copied",
      message: "Text copied to clipboard successfully.",
    })
  }

  const handleViewQR = (qr: any) => {
    console.log("Viewing QR code:", qr.id)
    setSelectedQR(qr)
  }

  const handleEditQR = (qr: any) => {
    console.log("Editing QR code:", qr.id)
    addNotification({
      type: "info",
      title: "Edit QR Code",
      message: `Opening edit form for ${qr.productName}`,
    })
  }

  const handleDeleteQR = (qrId: string) => {
    if (confirm("Are you sure you want to delete this QR code? This action cannot be undone.")) {
      console.log("Deleted QR code:", qrId)
      addNotification({
        type: "success",
        title: "QR Code Deleted",
        message: "QR code has been successfully deleted.",
      })
    }
  }

  const handleViewVerification = (verification: any) => {
    console.log("Viewing verification:", verification.id)
  }

  const handleEditVerification = (verification: any) => {
    console.log("Editing verification:", verification.id)
  }

  const handleDeleteVerification = (verificationId: string) => {
    if (confirm("Are you sure you want to delete this verification record?")) {
      console.log("Deleted verification:", verificationId)
      addNotification({
        type: "success",
        title: "Verification Deleted",
        message: "Verification record has been successfully deleted.",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">QR Verification</h1>
          <p className="text-muted-foreground">Generate and manage QR codes for product verification</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleInstallApp}>
            <Smartphone className="w-4 h-4 mr-2" />
            Install Verifier App
          </Button>
          <Button variant="outline">
            <Scan className="w-4 h-4 mr-2" />
            Scan QR Code
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Generate QR Code
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">Total QR Codes</p>
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
                <p className="text-2xl font-semibold text-foreground">1,247</p>
                <p className="text-sm text-muted-foreground">Successful Scans</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">23</p>
                <p className="text-sm text-muted-foreground">Failed Verifications</p>
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
                <p className="text-2xl font-semibold text-foreground">98.2%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="qr-codes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="qr-codes">QR Codes</TabsTrigger>
          <TabsTrigger value="verification">Verification History</TabsTrigger>
          <TabsTrigger value="generate">Generate New</TabsTrigger>
          <TabsTrigger value="install">Install & Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="qr-codes" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search QR codes..." className="pl-10" />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {/* QR Codes List */}
          <div className="space-y-4">
            {qrCodes.map((qr) => (
              <Card key={qr.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {/* QR Code Preview */}
                      <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                        <QrCode className="w-12 h-12 text-muted-foreground" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{qr.productName}</h3>
                          <Badge variant={qr.status === "Active" ? "default" : "secondary"}>{qr.status}</Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">QR ID</p>
                            <p className="font-mono text-foreground">{qr.id}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Batch ID</p>
                            <p className="text-foreground">{qr.batchId}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Total Scans</p>
                            <p className="text-foreground">{qr.scans}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Last Scanned</p>
                            <p className="text-foreground">{qr.lastScanned}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewQR(qr)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditQR(qr)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteQR(qr.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadQR(qr)}>
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <div className="space-y-4">
            {verificationHistory.map((verification) => (
              <Card key={verification.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          verification.status === "Verified" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {verification.status === "Verified" ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-foreground">{verification.productName}</h3>
                        <p className="text-sm text-muted-foreground">{verification.details}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>QR: {verification.qrId}</span>
                          <span>Time: {verification.scanTime}</span>
                          <span>Location: {verification.location}</span>
                          <span>Verifier: {verification.verifier}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={verification.status === "Verified" ? "default" : "destructive"}>
                        {verification.status}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => handleViewVerification(verification)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditVerification(verification)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteVerification(verification.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate New QR Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Product Name</label>
                  <Input placeholder="Enter product name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Batch ID</label>
                  <Input placeholder="Enter batch ID" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Manufacturing Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Expiry Date</label>
                  <Input type="date" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Additional Information</label>
                <Input placeholder="Enter any additional product information" />
              </div>

              <div className="flex items-center gap-4">
                <Button>Generate QR Code</Button>
                <Button variant="outline">Preview</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="install" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile Verifier App
                </CardTitle>
                <CardDescription>Install the HerbTrust Verifier app for mobile QR scanning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Scan className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Quick QR Scanning</p>
                      <p className="text-sm text-muted-foreground">Instant product verification</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Blockchain Verification</p>
                      <p className="text-sm text-muted-foreground">Secure authenticity checks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location Tracking</p>
                      <p className="text-sm text-muted-foreground">Track verification locations</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleInstallApp}>
                    <Smartphone className="h-4 w-4 mr-2" />
                    Install Android App
                  </Button>
                  <Button variant="outline" onClick={handleInstallApp}>
                    <Smartphone className="h-4 w-4 mr-2" />
                    Install iOS App
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Web Verifier
                </CardTitle>
                <CardDescription>Use the web-based QR verification system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Globe className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium mb-2">Browser-Based</p>
                      <p className="text-sm text-muted-foreground">No installation required</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <User className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium mb-2">Multi-User Access</p>
                      <p className="text-sm text-muted-foreground">Team collaboration features</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium mb-2">Export Reports</p>
                      <p className="text-sm text-muted-foreground">Download verification data</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Web Verifier
                  </Button>
                  <Button variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>API Integration</CardTitle>
                <CardDescription>Integrate QR verification into your existing systems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium mb-2">REST API</h4>
                    <p className="text-sm text-muted-foreground">RESTful API for verification</p>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-accent" />
                    </div>
                    <h4 className="font-medium mb-2">Webhook Support</h4>
                    <p className="text-sm text-muted-foreground">Real-time notifications</p>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium mb-2">SDK Libraries</h4>
                    <p className="text-sm text-muted-foreground">Multiple language support</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View API Docs
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download SDK
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
