"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { QrCode, Download, Copy, Eye, Zap } from "lucide-react"
import { useNotifications } from "@/components/providers/notification-provider"

interface QRGeneratorProps {
  onGenerate?: (qrData: any) => void
}

export function QRGenerator({ onGenerate }: QRGeneratorProps) {
  const [formData, setFormData] = useState({
    productName: "",
    batchId: "",
    manufacturer: "",
    manufacturingDate: "",
    expiryDate: "",
    weight: "",
    price: "",
    description: "",
    certifications: [] as string[],
    additionalInfo: "",
  })
  const [generatedQR, setGeneratedQR] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { addNotification } = useNotifications()

  const availableCertifications = ["Organic", "ISO 9001", "FSSAI", "GMP", "HACCP", "Fair Trade", "Non-GMO"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleCertification = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert],
    }))
  }

  const generateQR = async () => {
    if (!formData.productName || !formData.batchId) {
      addNotification({
        type: "error",
        title: "Missing Information",
        message: "Product name and batch ID are required fields.",
      })
      return
    }

    setIsGenerating(true)

    // Simulate QR generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const qrId = `QR${Date.now().toString().slice(-6)}`
    const qrData = {
      id: qrId,
      ...formData,
      generatedDate: new Date().toISOString().split("T")[0],
      status: "Active",
      qrUrl: `https://herbtrust.com/verify/${qrId}`,
      blockchainHash: `0x${Math.random().toString(16).slice(2, 18)}`,
    }

    setGeneratedQR(qrData)
    setIsGenerating(false)

    addNotification({
      type: "success",
      title: "QR Code Generated",
      message: `QR code for ${formData.productName} has been generated successfully.`,
    })

    onGenerate?.(qrData)
  }

  const downloadQR = () => {
    if (!generatedQR) return

    // Create a canvas element to generate QR code image
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 300
    canvas.height = 300

    // Simple QR code pattern (in real app, use a QR library)
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, 300, 300)
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(10, 10, 280, 280)

    // Create pattern
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (Math.random() > 0.5) {
          ctx.fillStyle = "#000000"
          ctx.fillRect(20 + i * 12, 20 + j * 12, 10, 10)
        }
      }
    }

    // Download the image
    const link = document.createElement("a")
    link.download = `${generatedQR.id}-qr-code.png`
    link.href = canvas.toDataURL()
    link.click()

    addNotification({
      type: "success",
      title: "QR Code Downloaded",
      message: "QR code image has been downloaded successfully.",
    })
  }

  const copyQRData = () => {
    if (!generatedQR) return
    navigator.clipboard.writeText(generatedQR.qrUrl)
    addNotification({
      type: "success",
      title: "Copied",
      message: "QR code URL copied to clipboard.",
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* QR Generation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Generate QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                placeholder="Enter product name"
                value={formData.productName}
                onChange={(e) => handleInputChange("productName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="batchId">Batch ID *</Label>
              <Input
                id="batchId"
                placeholder="Enter batch ID"
                value={formData.batchId}
                onChange={(e) => handleInputChange("batchId", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Input
                id="manufacturer"
                placeholder="Enter manufacturer name"
                value={formData.manufacturer}
                onChange={(e) => handleInputChange("manufacturer", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight/Quantity</Label>
              <Input
                id="weight"
                placeholder="e.g., 500g, 1kg"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="manufacturingDate">Manufacturing Date</Label>
              <Input
                id="manufacturingDate"
                type="date"
                value={formData.manufacturingDate}
                onChange={(e) => handleInputChange("manufacturingDate", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              placeholder="e.g., ₹899"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <div>
            <Label>Certifications</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableCertifications.map((cert) => (
                <Badge
                  key={cert}
                  variant={formData.certifications.includes(cert) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleCertification(cert)}
                >
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              placeholder="Any additional product information"
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
            />
          </div>

          <Button onClick={generateQR} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                Generating QR Code...
              </>
            ) : (
              <>
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR Code
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated QR Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            QR Code Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {generatedQR ? (
            <div className="space-y-4">
              {/* QR Code Display */}
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-white border-2 border-border rounded-lg flex items-center justify-center">
                  <div className="w-40 h-40 bg-black rounded-lg flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-white" />
                  </div>
                </div>
              </div>

              {/* QR Information */}
              <div className="space-y-3">
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{generatedQR.productName}</h3>
                  <p className="text-sm text-muted-foreground">QR ID: {generatedQR.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <label className="text-muted-foreground">Batch ID</label>
                    <p className="font-medium">{generatedQR.batchId}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Status</label>
                    <Badge variant="default">{generatedQR.status}</Badge>
                  </div>
                  <div className="col-span-2">
                    <label className="text-muted-foreground">QR URL</label>
                    <p className="font-mono text-xs bg-muted p-2 rounded">{generatedQR.qrUrl}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-muted-foreground">Blockchain Hash</label>
                    <p className="font-mono text-xs bg-muted p-2 rounded">{generatedQR.blockchainHash}</p>
                  </div>
                </div>

                {generatedQR.certifications.length > 0 && (
                  <div>
                    <label className="text-muted-foreground text-sm">Certifications</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {generatedQR.certifications.map((cert: string) => (
                        <Badge key={cert} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={downloadQR} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" onClick={copyQRData} className="flex-1 bg-transparent">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy URL
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <QrCode className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Fill in the product details and click "Generate QR Code" to create your QR code.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
