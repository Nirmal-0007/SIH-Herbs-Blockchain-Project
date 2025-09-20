"use client"

import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, LinkIcon, CheckCircle, Users, Clock, MapPin, Thermometer, Droplets } from "lucide-react"

const recentEvents = [
  {
    id: 1,
    type: "Testing Event",
    icon: "🧪",
    timestamp: "09/09/2025, 21:53:03",
    location: "AYUSH Testing Lab, Mumbai",
    coordinates: "19.0760, 72.8777",
    blockchainTx: "0x0e229f6e...",
    temperature: "20.0°C",
    humidity: "50.0%",
    details: '{"test_type":"Purity and potency analysis","result":"Passed"}',
    status: "Verified",
  },
  {
    id: 2,
    type: "Processing Event",
    icon: "⚙️",
    timestamp: "08/09/2025, 21:53:03",
    location: "Ayur Processing Unit, Gujarat",
    coordinates: "23.0225, 72.5714",
    blockchainTx: "0x21613a47...",
    temperature: "22.0°C",
    humidity: "40.0%",
    details: '{"process":"Cleaning and drying","batch_size":"150kg"}',
    status: "Verified",
  },
  {
    id: 3,
    type: "Transport Event",
    icon: "🚛",
    timestamp: "07/09/2025, 21:53:03",
    location: "Transport to Gujarat",
    coordinates: "25.2048, 74.4629",
    blockchainTx: "0x4f1da8d...",
    temperature: "4.0°C",
    humidity: "45.0%",
    details: '{"vehicle":"Refrigerated truck","duration":"8 hours"}',
    status: "Verified",
  },
  {
    id: 4,
    type: "Collection Event",
    icon: "🌿",
    timestamp: "06/09/2025, 21:53:03",
    location: "Green Valley Farm, Rajasthan",
    coordinates: "26.9124, 75.7873",
    blockchainTx: "0x790c7d6b...",
    temperature: "25.9°C",
    humidity: "65.0%",
    details: '{"notes":"Fresh harvest collected in early morning","weather":"sunny"}',
    status: "Verified",
  },
]

const metrics = [
  { label: "Total Herbs Tracked", value: "4", icon: Leaf, color: "text-emerald-600" },
  { label: "Blockchain Transactions", value: "17", icon: LinkIcon, color: "text-blue-600" },
  { label: "Verified Products", value: "4", icon: CheckCircle, color: "text-green-600" },
  { label: "Active Stakeholders", value: "4", icon: Users, color: "text-orange-600" },
]

const networkStatus = [
  { label: "Network Health", value: "Excellent", color: "text-emerald-600" },
  { label: "Block Height", value: "2,687,201", color: "text-gray-600" },
  { label: "Active Nodes", value: "53", color: "text-gray-600" },
  { label: "Avg Block Time", value: "4.2s", color: "text-gray-600" },
  { label: "Gas Price", value: "12 Gwei", color: "text-gray-600" },
]

const qrVerifications = [
  {
    id: 1,
    product: "Product herb-3",
    batch: "Batch: BATCH001",
    timestamp: "09/09/2025",
    status: "Verified",
  },
  {
    id: 2,
    product: "Product herb-1",
    batch: "Batch: BATCH002",
    timestamp: "08/09/2025",
    status: "Verified",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                </div>
                <div className={cn("p-3 rounded-lg bg-gray-50", metric.color)}>
                  <metric.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Supply Chain Events */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Supply Chain Events</CardTitle>
              <Button variant="ghost" size="sm" className="text-emerald-600">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="text-2xl">{event.icon}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{event.type}</h4>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {event.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {event.timestamp}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-4 h-4" />
                        {event.temperature}
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplets className="w-4 h-4" />
                        {event.humidity}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-mono">Coordinates: {event.coordinates}</span>
                      <br />
                      <span className="font-mono">Blockchain Tx: {event.blockchainTx}</span>
                    </div>
                    <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      <strong>Details:</strong> {event.details}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Blockchain Network Status & QR Verifications */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Network Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {networkStatus.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className={cn("text-sm font-medium", item.color)}>{item.value}</span>
                </div>
              ))}
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white mt-4">
                View Network Details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent QR Verifications</CardTitle>
              <Button variant="ghost" size="sm" className="text-emerald-600">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {qrVerifications.map((verification) => (
                <div key={verification.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{verification.product}</p>
                      <p className="text-xs text-gray-500">{verification.batch}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                      {verification.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{verification.timestamp}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-emerald-600 border-emerald-200 bg-transparent">
                Generate New QR Code
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Geographic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2" />
              <p className="text-lg font-medium">Interactive Map View</p>
              <p className="text-sm opacity-90">Geographic distribution of supply chain events</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
