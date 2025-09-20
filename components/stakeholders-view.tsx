"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Building,
  Truck,
  FlaskConical,
  Store,
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { useState } from "react"

const stakeholders = [
  {
    id: "STK001",
    name: "Green Valley Farms",
    type: "Farmer",
    location: "Rajasthan, India",
    contact: "farmer@greenvalley.com",
    phone: "+91 98765 43210",
    status: "Active",
    joinDate: "2024-03-15",
    products: ["Ashwagandha", "Turmeric", "Neem"],
    rating: 4.8,
    transactions: 45,
  },
  {
    id: "STK002",
    name: "Ayur Processing Unit",
    type: "Processor",
    location: "Gujarat, India",
    contact: "info@ayurprocessing.com",
    phone: "+91 98765 43211",
    status: "Active",
    joinDate: "2024-02-20",
    products: ["Herb Extracts", "Powders"],
    rating: 4.6,
    transactions: 78,
  },
  {
    id: "STK003",
    name: "AYUSH Testing Lab",
    type: "Testing Lab",
    location: "Mumbai, India",
    contact: "lab@ayushtesting.com",
    phone: "+91 98765 43212",
    status: "Active",
    joinDate: "2024-01-10",
    products: ["Quality Testing", "Certification"],
    rating: 4.9,
    transactions: 156,
  },
  {
    id: "STK004",
    name: "Swift Logistics",
    type: "Transporter",
    location: "Delhi, India",
    contact: "dispatch@swiftlogistics.com",
    phone: "+91 98765 43213",
    status: "Active",
    joinDate: "2024-04-05",
    products: ["Transportation", "Cold Chain"],
    rating: 4.5,
    transactions: 89,
  },
  {
    id: "STK005",
    name: "Herbal Mart",
    type: "Retailer",
    location: "Bangalore, India",
    contact: "sales@herbalmart.com",
    phone: "+91 98765 43214",
    status: "Pending",
    joinDate: "2025-01-12",
    products: ["Retail Sales"],
    rating: 0,
    transactions: 0,
  },
]

const stakeholderTypes = [
  { type: "Farmer", count: 12, icon: Building, color: "bg-green-100 text-green-600" },
  { type: "Processor", count: 8, icon: FlaskConical, color: "bg-blue-100 text-blue-600" },
  { type: "Testing Lab", count: 4, icon: FlaskConical, color: "bg-purple-100 text-purple-600" },
  { type: "Transporter", count: 6, icon: Truck, color: "bg-orange-100 text-orange-600" },
  { type: "Retailer", count: 15, icon: Store, color: "bg-pink-100 text-pink-600" },
]

export function StakeholdersView() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [stakeholdersList, setStakeholdersList] = useState(stakeholders)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    contact: "",
    phone: "",
    products: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newStakeholder = {
      id: `STK${String(stakeholdersList.length + 1).padStart(3, "0")}`,
      name: formData.name,
      type: formData.type,
      location: formData.location,
      contact: formData.contact,
      phone: formData.phone,
      status: "Pending",
      joinDate: new Date().toISOString().split("T")[0],
      products: formData.products.split(",").map((p) => p.trim()),
      rating: 0,
      transactions: 0,
    }

    setStakeholdersList([...stakeholdersList, newStakeholder])
    setFormData({ name: "", type: "", location: "", contact: "", phone: "", products: "" })
    setIsDialogOpen(false)
  }

  const handleViewStakeholder = (stakeholder: any) => {
    // Mock view action - could open a detailed view dialog
    console.log("Viewing stakeholder:", stakeholder.name)
  }

  const handleEditStakeholder = (stakeholder: any) => {
    // Mock edit action - could populate form with existing data
    console.log("Editing stakeholder:", stakeholder.name)
    setFormData({
      name: stakeholder.name,
      type: stakeholder.type,
      location: stakeholder.location,
      contact: stakeholder.contact,
      phone: stakeholder.phone,
      products: stakeholder.products.join(", "),
    })
    setIsDialogOpen(true)
  }

  const handleDeleteStakeholder = (stakeholderId: string) => {
    // Mock delete action - remove from list
    if (confirm("Are you sure you want to delete this stakeholder?")) {
      setStakeholdersList(stakeholdersList.filter((s) => s.id !== stakeholderId))
      console.log("Deleted stakeholder:", stakeholderId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Stakeholders</h1>
          <p className="text-sm text-gray-500">Manage supply chain participants and partners</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Stakeholder
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Stakeholder</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter stakeholder name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Farmer">Farmer</SelectItem>
                      <SelectItem value="Processor">Processor</SelectItem>
                      <SelectItem value="Testing Lab">Testing Lab</SelectItem>
                      <SelectItem value="Transporter">Transporter</SelectItem>
                      <SelectItem value="Retailer">Retailer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Email *</Label>
                  <Input
                    id="contact"
                    type="email"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="products">Products/Services</Label>
                <Textarea
                  id="products"
                  value={formData.products}
                  onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                  placeholder="Enter products or services (comma-separated)"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600">
                  Add Stakeholder
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stakeholderTypes.map((type) => (
          <Card key={type.type}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.color}`}>
                  <type.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-900">{type.count}</p>
                  <p className="text-sm text-gray-500">{type.type}s</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Stakeholders</TabsTrigger>
          <TabsTrigger value="farmers">Farmers</TabsTrigger>
          <TabsTrigger value="processors">Processors</TabsTrigger>
          <TabsTrigger value="labs">Testing Labs</TabsTrigger>
          <TabsTrigger value="transporters">Transporters</TabsTrigger>
          <TabsTrigger value="retailers">Retailers</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search stakeholders..." className="pl-10" />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>

          {/* Stakeholders List */}
          <div className="space-y-4">
            {stakeholdersList.map((stakeholder) => (
              <Card key={stakeholder.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-emerald-100 text-emerald-600 font-semibold">
                          {stakeholder.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{stakeholder.name}</h3>
                          <Badge
                            variant={stakeholder.status === "Active" ? "default" : "secondary"}
                            className={stakeholder.status === "Active" ? "bg-emerald-100 text-emerald-700" : ""}
                          >
                            {stakeholder.status}
                          </Badge>
                          <Badge variant="outline">{stakeholder.type}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{stakeholder.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{stakeholder.contact}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{stakeholder.phone}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          <div>
                            <span className="text-gray-500">Products: </span>
                            <span className="text-gray-900">{stakeholder.products.join(", ")}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Rating: </span>
                            <span className="text-gray-900">
                              {stakeholder.rating > 0 ? `${stakeholder.rating}/5` : "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Transactions: </span>
                            <span className="text-gray-900">{stakeholder.transactions}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewStakeholder(stakeholder)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditStakeholder(stakeholder)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteStakeholder(stakeholder.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other tab contents would filter the stakeholders by type */}
        <TabsContent value="farmers">
          <div className="space-y-4">
            {stakeholdersList
              .filter((s) => s.type === "Farmer")
              .map((stakeholder) => (
                <Card key={stakeholder.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-green-100 text-green-600 font-semibold">
                          {stakeholder.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{stakeholder.name}</h3>
                        <p className="text-sm text-gray-600">{stakeholder.location}</p>
                        <p className="text-sm text-gray-500">Products: {stakeholder.products.join(", ")}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Rating: {stakeholder.rating}/5</p>
                        <p className="text-sm text-gray-500">{stakeholder.transactions} transactions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
