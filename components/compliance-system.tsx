"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, CheckCircle, AlertTriangle, Clock, FileText, Users, Award, Eye, Edit, Trash2 } from "lucide-react"

const complianceStandards = [
  {
    name: "AYUSH Guidelines",
    description: "All standards compliant",
    progress: 100,
    status: "Compliant",
    color: "bg-emerald-500",
    textColor: "text-emerald-700",
    bgColor: "bg-emerald-100",
    icon: Shield,
  },
  {
    name: "WHO-GMP",
    description: "Manufacturing standards",
    progress: 95,
    status: "Compliant",
    color: "bg-blue-500",
    textColor: "text-blue-700",
    bgColor: "bg-blue-100",
    icon: Award,
  },
  {
    name: "ISO Standards",
    description: "Quality assurance",
    progress: 87,
    status: "Compliant",
    color: "bg-purple-500",
    textColor: "text-purple-700",
    bgColor: "bg-purple-100",
    icon: FileText,
  },
]

const systemAlerts = [
  {
    id: 1,
    type: "Temperature Alert",
    message: "Temperature spike detected in batch B7001",
    timestamp: "3 hours ago",
    severity: "warning",
    icon: AlertTriangle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    id: 2,
    type: "Quality Failure",
    message: "Failed quality test for purity test",
    timestamp: "5 hours ago",
    severity: "error",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: 3,
    type: "System Update",
    message: "Blockchain update scheduled for tonight",
    timestamp: "1 day ago",
    severity: "info",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
]

const complianceMetrics = [
  { label: "Compliance Score", value: "94.2%", change: "+2.1%", trend: "up" },
  { label: "Audit Readiness", value: "98.5%", change: "+0.8%", trend: "up" },
  { label: "Documentation", value: "100%", change: "0%", trend: "stable" },
  { label: "Risk Assessment", value: "Low", change: "-15%", trend: "down" },
]

const recentAudits = [
  {
    id: 1,
    auditor: "AYUSH Regulatory Board",
    date: "15/08/2025",
    status: "Passed",
    score: "96.5%",
    type: "Quarterly Review",
  },
  {
    id: 2,
    auditor: "WHO-GMP Inspector",
    date: "02/08/2025",
    status: "Passed",
    score: "94.2%",
    type: "Manufacturing Audit",
  },
  {
    id: 3,
    auditor: "ISO Certification Body",
    date: "20/07/2025",
    status: "Passed",
    score: "91.8%",
    type: "Quality Management",
  },
]

export function ComplianceSystem() {
  const handleViewAlert = (alert: any) => {
    console.log("Viewing alert:", alert.type)
  }

  const handleEditAlert = (alert: any) => {
    console.log("Editing alert:", alert.type)
  }

  const handleDeleteAlert = (alertId: number) => {
    if (confirm("Are you sure you want to dismiss this alert?")) {
      console.log("Dismissed alert:", alertId)
    }
  }

  const handleViewAudit = (audit: any) => {
    console.log("Viewing audit:", audit.auditor)
  }

  const handleEditAudit = (audit: any) => {
    console.log("Editing audit:", audit.auditor)
  }

  const handleDeleteAudit = (auditId: number) => {
    if (confirm("Are you sure you want to delete this audit record?")) {
      console.log("Deleted audit:", auditId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Compliance & Regulatory Status</h1>
        <p className="text-gray-600">Monitor regulatory compliance and system alerts</p>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center gap-1">
                  <span
                    className={`text-xs font-medium ${
                      metric.trend === "up"
                        ? "text-emerald-600"
                        : metric.trend === "down"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {metric.change}
                  </span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regulatory Compliance Status */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Regulatory Compliance Status</CardTitle>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                All Compliant
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              {complianceStandards.map((standard, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${standard.bgColor}`}>
                        <standard.icon className={`w-5 h-5 ${standard.textColor}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{standard.name}</h4>
                        <p className="text-sm text-gray-500">{standard.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`${standard.bgColor} ${standard.textColor}`}>
                      {standard.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Compliance Level</span>
                      <span className="font-medium">{standard.progress}%</span>
                    </div>
                    <Progress value={standard.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* System Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>System Alerts</CardTitle>
            <Button variant="ghost" size="sm" className="text-emerald-600">
              View All Alerts
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border ${alert.bgColor} ${alert.borderColor}`}>
                <div className="flex items-start gap-3">
                  <alert.icon className={`w-5 h-5 mt-0.5 ${alert.color}`} />
                  <div className="flex-1 space-y-1">
                    <h4 className={`font-medium ${alert.color}`}>{alert.type}</h4>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.timestamp}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleViewAlert(alert)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditAlert(alert)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteAlert(alert.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Audits */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Compliance Audits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAudits.map((audit) => (
              <div key={audit.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{audit.auditor}</h4>
                    <p className="text-sm text-gray-500">{audit.type}</p>
                    <p className="text-xs text-gray-400">{audit.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 mb-1">
                      {audit.status}
                    </Badge>
                    <p className="text-sm font-medium text-gray-900">{audit.score}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" onClick={() => handleViewAudit(audit)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditAudit(audit)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteAudit(audit.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <h4 className="font-medium text-blue-900">Update Documentation</h4>
                <p className="text-sm text-blue-700">Review and update SOPs for new AYUSH guidelines</p>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Review
              </Button>
            </div>
            <div className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Users className="w-5 h-5 text-yellow-600" />
              <div className="flex-1">
                <h4 className="font-medium text-yellow-900">Staff Training</h4>
                <p className="text-sm text-yellow-700">Schedule compliance training for new team members</p>
              </div>
              <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 bg-transparent">
                Schedule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
