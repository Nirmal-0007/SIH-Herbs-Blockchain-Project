"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { QRScanner } from "@/components/qr-scanner"
import { QRGenerator } from "@/components/qr-generator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function QRScannerPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">QR Code Tools</h1>
          <p className="text-muted-foreground">Generate and scan QR codes for product verification</p>
        </div>

        <Tabs defaultValue="scanner" className="space-y-6">
          <TabsList>
            <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
            <TabsTrigger value="generator">QR Generator</TabsTrigger>
          </TabsList>

          <TabsContent value="scanner">
            <QRScanner />
          </TabsContent>

          <TabsContent value="generator">
            <QRGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
