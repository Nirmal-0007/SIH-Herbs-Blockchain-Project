"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Eye, Users, Leaf, Truck, TestTube, Activity } from "lucide-react"

const trackingStats = [
  { label: "Tracked Locations", value: "8", icon: MapPin, color: "text-emerald-600" },
  { label: "Collection Points", value: "4", icon: Navigation, color: "text-blue-600" },
  { label: "Event Locations", value: "4", icon: Eye, color: "text-purple-600" },
  { label: "Active Regions", value: "6", icon: Users, color: "text-orange-600" },
]

const collectionLocations = [
  {
    name: "Ashwagandha",
    batch: "Batch: BATCH001",
    coordinates: "26.9124, 75.7873",
    status: "Active",
  },
  {
    name: "Turmeric",
    batch: "Batch: BATCH002",
    coordinates: "23.0225, 72.5714",
    status: "Active",
  },
  {
    name: "Neem",
    batch: "Batch: BATCH003",
    coordinates: "28.7041, 77.1025",
    status: "Active",
  },
  {
    name: "Brahmi",
    batch: "Batch: BATCH004",
    coordinates: "12.9716, 77.5946",
    status: "Active",
  },
]

const supplyChainEvents = [
  {
    name: "Testing Event",
    location: "AYUSH Testing Lab, Mumbai",
    coordinates: "19.0760, 72.8777",
    date: "09/09/2025",
    icon: TestTube,
  },
  {
    name: "Processing Event",
    location: "Ayur Processing Unit, Gujarat",
    coordinates: "74.3677, 74.5018",
    date: "08/09/2025",
    icon: Activity,
  },
  {
    name: "Transport Event",
    location: "Transport to Gujarat",
    coordinates: "25.2048, 74.4629",
    date: "07/09/2025",
    icon: Truck,
  },
  {
    name: "Collection Event",
    location: "Green Valley Farm, Rajasthan",
    coordinates: "26.9124, 75.7873",
    date: "06/09/2025",
    icon: Leaf,
  },
]

export function GeoTracking() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Geo-Tracking</h1>
        <p className="text-gray-600">Track the geographic movement of Ayurvedic herbs</p>
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

      {/* Maps Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collection Points Map */}
        <Card>
          <CardHeader>
            <CardTitle>Collection Points Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-lg overflow-hidden">
              {/* Simulated map with location pins */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">Collection Points [4]</p>
                </div>
              </div>
              {/* Simulated location markers */}
              <div className="absolute top-4 left-8 w-3 h-3 bg-white rounded-full border-2 border-emerald-500"></div>
              <div className="absolute top-12 right-12 w-3 h-3 bg-white rounded-full border-2 border-emerald-500"></div>
              <div className="absolute bottom-8 left-16 w-3 h-3 bg-white rounded-full border-2 border-emerald-500"></div>
              <div className="absolute bottom-12 right-8 w-3 h-3 bg-white rounded-full border-2 border-emerald-500"></div>
            </div>
          </CardContent>
        </Card>

        {/* Supply Chain Events Map */}
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Events Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-lg overflow-hidden">
              {/* Simulated map with event pins */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <Activity className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">Events [4]</p>
                </div>
              </div>
              {/* Simulated event markers */}
              <div className="absolute top-6 left-12 w-3 h-3 bg-white rounded-full border-2 border-blue-500"></div>
              <div className="absolute top-16 right-16 w-3 h-3 bg-white rounded-full border-2 border-blue-500"></div>
              <div className="absolute bottom-12 left-20 w-3 h-3 bg-white rounded-full border-2 border-blue-500"></div>
              <div className="absolute bottom-8 right-12 w-3 h-3 bg-white rounded-full border-2 border-blue-500"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Herb Collection Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Herb Collection Locations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {collectionLocations.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{location.name}</p>
                    <p className="text-sm text-gray-500">{location.batch}</p>
                    <p className="text-xs text-gray-400 font-mono">{location.coordinates}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  {location.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Supply Chain Event Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Event Locations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {supplyChainEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <event.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{event.name}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                    <p className="text-xs text-gray-400 font-mono">{event.coordinates}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
