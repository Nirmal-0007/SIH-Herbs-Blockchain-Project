"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Camera,
  Scan,
  StopCircle,
  RotateCcw,
  Flashlight,
  FlashlightOff,
  CheckCircle,
  XCircle,
  Package,
} from "lucide-react"
import { useNotifications } from "@/components/providers/notification-provider"

interface QRScannerProps {
  onScan?: (result: any) => void
}

export function QRScanner({ onScan }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [flashEnabled, setFlashEnabled] = useState(false)
  const [scannedResult, setScannedResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const isMountedRef = useRef(true)
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { addNotification } = useNotifications()

  // Mock scan results for demonstration
  const mockScanResults = [
    {
      id: "QR001",
      productName: "Ashwagandha Root Powder",
      batchId: "BATCH001",
      manufacturer: "HerbTech Industries",
      status: "verified",
      expiryDate: "2026-01-10",
      certifications: ["Organic", "ISO 9001", "FSSAI"],
      description: "Premium quality Ashwagandha root powder sourced from organic farms in Rajasthan",
      weight: "500g",
      price: "₹899",
      qrUrl: "https://herbtrust.com/verify/QR001",
      blockchainHash: "0x1a2b3c4d5e6f7g8h",
      scanLocation: "Mumbai, India",
      scanTime: new Date().toISOString(),
    },
    {
      id: "QR002",
      productName: "Turmeric Extract",
      batchId: "BATCH002",
      manufacturer: "Golden Spice Co.",
      status: "verified",
      expiryDate: "2026-01-12",
      certifications: ["Organic", "GMP"],
      description: "High-potency turmeric extract with 95% curcumin content",
      weight: "250g",
      price: "₹1,299",
      qrUrl: "https://herbtrust.com/verify/QR002",
      blockchainHash: "0x2b3c4d5e6f7g8h9i",
      scanLocation: "Delhi, India",
      scanTime: new Date().toISOString(),
    },
  ]

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      setHasPermission(true)
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      addNotification({
        type: "success",
        title: "Camera Access Granted",
        message: "Camera is ready for QR code scanning.",
      })
    } catch (error) {
      setHasPermission(false)
      addNotification({
        type: "error",
        title: "Camera Access Denied",
        message: "Please allow camera access to scan QR codes.",
      })
    }
  }

  const startScanning = async () => {
    if (!hasPermission) {
      await requestCameraPermission()
      return
    }

    setIsScanning(true)
    addNotification({
      type: "info",
      title: "Scanning Started",
      message: "Point your camera at a QR code to scan.",
    })

    // Simulate QR code detection after 3 seconds
    scanTimeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)]
        handleScanResult(randomResult)
      }
    }, 3000)
  }

  const stopScanning = () => {
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current)
      scanTimeoutRef.current = null
    }

    setIsScanning(false)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setHasPermission(null)
  }

  const toggleFlash = async () => {
    if (!streamRef.current) return

    try {
      const videoTrack = streamRef.current.getVideoTracks()[0]
      const capabilities = videoTrack.getCapabilities()

      if (capabilities.torch) {
        await videoTrack.applyConstraints({
          advanced: [{ torch: !flashEnabled } as any],
        })
        setFlashEnabled(!flashEnabled)
      }
    } catch (error) {
      addNotification({
        type: "error",
        title: "Flash Error",
        message: "Unable to control camera flash.",
      })
    }
  }

  const handleScanResult = (result: any) => {
    setIsScanning(false)
    setScannedResult(result)
    setShowResult(true)
    onScan?.(result)

    addNotification({
      type: "success",
      title: "QR Code Scanned",
      message: `Successfully scanned ${result.productName}`,
    })
  }

  const resetScanner = () => {
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current)
      scanTimeoutRef.current = null
    }

    setScannedResult(null)
    setShowResult(false)
    stopScanning()
  }

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current)
        scanTimeoutRef.current = null
      }
      // Cleanup camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
    }
  }, [])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5" />
            QR Code Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Camera View */}
          <div className="relative">
            <div className="w-full h-64 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              {hasPermission && isScanning ? (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {hasPermission === false
                      ? "Camera access denied"
                      : hasPermission === null
                        ? "Click 'Start Scanning' to access camera"
                        : "Camera ready"}
                  </p>
                </div>
              )}
            </div>

            {/* Scanning Overlay */}
            {isScanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-primary rounded-lg relative">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-primary animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            {!isScanning ? (
              <Button onClick={startScanning} className="flex-1">
                <Camera className="w-4 h-4 mr-2" />
                Start Scanning
              </Button>
            ) : (
              <Button onClick={stopScanning} variant="destructive" className="flex-1">
                <StopCircle className="w-4 h-4 mr-2" />
                Stop Scanning
              </Button>
            )}

            {isScanning && (
              <>
                <Button variant="outline" onClick={toggleFlash}>
                  {flashEnabled ? <FlashlightOff className="w-4 h-4" /> : <Flashlight className="w-4 h-4" />}
                </Button>
                <Button variant="outline" onClick={resetScanner}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          {/* Instructions */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• Point your camera at a QR code</p>
            <p>• Ensure good lighting for best results</p>
            <p>• Hold steady until the code is detected</p>
            <p>• Use the flash button in low light conditions</p>
          </div>
        </CardContent>
      </Card>

      {/* Scan Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {scannedResult?.status === "verified" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              QR Code Scan Result
            </DialogTitle>
            <DialogDescription>Product verification details</DialogDescription>
          </DialogHeader>

          {scannedResult && (
            <div className="space-y-6">
              {/* Status Banner */}
              <div
                className={`p-4 rounded-lg ${
                  scannedResult.status === "verified"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  {scannedResult.status === "verified" ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                  <div>
                    <h3
                      className={`font-semibold ${scannedResult.status === "verified" ? "text-green-800" : "text-red-800"}`}
                    >
                      {scannedResult.status === "verified" ? "Product Verified" : "Verification Failed"}
                    </h3>
                    <p className={`text-sm ${scannedResult.status === "verified" ? "text-green-600" : "text-red-600"}`}>
                      {scannedResult.status === "verified"
                        ? "This product is authentic and verified on the blockchain"
                        : "This product could not be verified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Information */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Product Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-muted-foreground">Product Name</label>
                    <p className="font-medium">{scannedResult.productName}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Manufacturer</label>
                    <p className="font-medium">{scannedResult.manufacturer}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Batch ID</label>
                    <p className="font-medium font-mono">{scannedResult.batchId}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Weight</label>
                    <p className="font-medium">{scannedResult.weight}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Price</label>
                    <p className="font-medium">{scannedResult.price}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Expiry Date</label>
                    <p className="font-medium">{scannedResult.expiryDate}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-muted-foreground">Description</label>
                    <p className="font-medium">{scannedResult.description}</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              {scannedResult.certifications && scannedResult.certifications.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Certifications</h4>
                  <div className="flex gap-2">
                    {scannedResult.certifications.map((cert: string) => (
                      <Badge key={cert} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Blockchain Information */}
              <div>
                <h4 className="font-semibold mb-3">Blockchain Verification</h4>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <label className="text-muted-foreground">Blockchain Hash</label>
                    <p className="font-mono text-xs bg-muted p-2 rounded">{scannedResult.blockchainHash}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-muted-foreground">Scan Location</label>
                      <p className="font-medium">{scannedResult.scanLocation}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Scan Time</label>
                      <p className="font-medium">{new Date(scannedResult.scanTime).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => setShowResult(false)}>Close</Button>
                <Button variant="outline" onClick={resetScanner}>
                  Scan Another
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
