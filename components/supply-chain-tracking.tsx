"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Truck, TestTube, Package, Clock, MapPin, Thermometer, Droplets, CheckCircle } from "lucide-react"

const trackingStats = [
  { label: "Collection Events", value: "1", icon: Leaf, color: "text-emerald-600" },
  { label: "Transport Events", value: "1", icon: Truck, color: "text-blue-600" },
  { label: "Testing Events", value: "1", icon: TestTube, color: "text-purple-600" },
  { label: "Total Batches", value: "4", icon: Package, color: "text-orange-600" },
]

const supplyChainEvents = [
  {
    id: 1,
    type: "Testing Event",
    icon: TestTube,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
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
    icon: Package,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
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
    icon: Truck,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    timestamp: "07/09/2025, 21:53:03",
    location: "Transport to Gujarat",
    coordinates: "25.2048, 74.4629",
    blockchainTx: "0x4f1da8d...",
    temperature: "4.0°C",
    humidity: "45.0%",
    details: '{"vehicle":"Refrigerated truck","duration":"8 hours"}',
    status: "Verified",
  },
]

export function SupplyChainTracking() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Supply Chain Tracking</h1>
        <p className="text-gray-600">Track the journey of Ayurvedic herbs from farm to consumer</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trackingStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Supply Chain Events Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Supply Chain Events Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {supplyChainEvents.map((event, index) => (
              <div key={event.id} className="relative">
                {/* Timeline line */}
                {index < supplyChainEvents.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                )}

                <div className="flex items-start gap-4">
                  {/* Event Icon */}
                  <div
                    className={`w-12 h-12 rounded-full ${event.iconBg} flex items-center justify-center flex-shrink-0`}
                  >
                    <event.icon className={`w-6 h-6 ${event.iconColor}`} />
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{event.type}</h3>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {event.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <div>
                          <p className="font-medium">Timestamp</p>
                          <p>{event.timestamp}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p>{event.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Thermometer className="w-4 h-4" />
                        <div>
                          <p className="font-medium">Temperature</p>
                          <p>{event.temperature}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Droplets className="w-4 h-4" />
                        <div>
                          <p className="font-medium">Humidity</p>
                          <p>{event.humidity}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Coordinates: </span>
                        <span className="font-mono text-gray-600">{event.coordinates}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Blockchain Tx: </span>
                        <span className="font-mono text-gray-600">{event.blockchainTx}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Details:</p>
                      <p className="text-sm text-gray-600 font-mono">{event.details}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
