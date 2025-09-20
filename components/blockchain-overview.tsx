"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Blocks,
  Shield,
  Clock,
  CheckCircle,
  Search,
  Copy,
  ExternalLink,
  TrendingUp,
  Database,
  Zap,
  Server,
  Globe,
  Activity,
  Users,
} from "lucide-react"

// Mock blockchain data
const blockchainStats = {
  totalBlocks: 15847,
  totalTransactions: 89234,
  networkHashRate: "2.4 TH/s",
  avgBlockTime: "12.3s",
  pendingTransactions: 156,
  networkStatus: "Healthy",
}

const recentBlocks = [
  {
    id: "0x1a2b3c4d",
    height: 15847,
    timestamp: "2 minutes ago",
    transactions: 23,
    hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
    status: "confirmed",
    validator: "Node-Alpha-7",
  },
  {
    id: "0x2b3c4d5e",
    height: 15846,
    timestamp: "14 minutes ago",
    transactions: 31,
    hash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
    status: "confirmed",
    validator: "Node-Beta-3",
  },
  {
    id: "0x3c4d5e6f",
    height: 15845,
    timestamp: "26 minutes ago",
    transactions: 18,
    hash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
    status: "confirmed",
    validator: "Node-Gamma-1",
  },
]

const recentTransactions = [
  {
    id: "0xabc123",
    type: "Product Registration",
    from: "0x1234...5678",
    to: "0x9876...5432",
    value: "Hemp Batch #H2024-001",
    timestamp: "3 minutes ago",
    status: "confirmed",
    gasUsed: "21,000",
  },
  {
    id: "0xdef456",
    type: "Quality Verification",
    from: "0x2345...6789",
    to: "0x8765...4321",
    value: "Lab Test Results",
    timestamp: "7 minutes ago",
    status: "confirmed",
    gasUsed: "45,000",
  },
  {
    id: "0xghi789",
    type: "Ownership Transfer",
    from: "0x3456...7890",
    to: "0x7654...3210",
    value: "Cannabis Batch #C2024-015",
    timestamp: "12 minutes ago",
    status: "pending",
    gasUsed: "32,000",
  },
]

const networkDetails = {
  consensus: "Proof of Stake",
  totalValidators: 127,
  activeValidators: 124,
  networkVersion: "v2.1.4",
  chainId: "herbtrust-mainnet-1",
  genesisTime: "2024-01-15T00:00:00Z",
  epochDuration: "24 hours",
  slashingConditions: ["Double signing", "Downtime > 5%"],
  governanceProposals: 23,
  stakingRatio: "68.4%",
  inflationRate: "7.2%",
  bondedTokens: "45,234,567 HERB",
  unbondingPeriod: "21 days",
}

const validators = [
  { name: "Node-Alpha-7", stake: "2,345,678 HERB", uptime: "99.8%", commission: "5%", status: "active" },
  { name: "Node-Beta-3", stake: "1,987,432 HERB", uptime: "99.5%", commission: "3%", status: "active" },
  { name: "Node-Gamma-1", stake: "1,654,321 HERB", uptime: "98.9%", commission: "4%", status: "active" },
  { name: "Node-Delta-9", stake: "1,432,876 HERB", uptime: "99.2%", commission: "6%", status: "active" },
  { name: "Node-Epsilon-5", stake: "1,234,567 HERB", uptime: "97.8%", commission: "5%", status: "jailed" },
]

const networkNodes = [
  { id: "node-001", location: "Mumbai, India", type: "Validator", status: "online", latency: "12ms", peers: 45 },
  { id: "node-002", location: "Delhi, India", type: "Full Node", status: "online", latency: "8ms", peers: 38 },
  { id: "node-003", location: "Bangalore, India", type: "Validator", status: "online", latency: "15ms", peers: 52 },
  { id: "node-004", location: "Pune, India", type: "Full Node", status: "syncing", latency: "23ms", peers: 29 },
  { id: "node-005", location: "Chennai, India", type: "Validator", status: "online", latency: "18ms", peers: 41 },
]

export function BlockchainOverview() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBlock, setSelectedBlock] = useState<any>(null)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blockchain Explorer</h1>
          <p className="text-muted-foreground">Real-time blockchain network monitoring and transaction tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-primary">Live Network</span>
        </div>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blocks</CardTitle>
            <Blocks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{blockchainStats.totalBlocks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12 in last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {blockchainStats.totalTransactions.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +234 in last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Hash Rate</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{blockchainStats.networkHashRate}</div>
            <p className="text-xs text-muted-foreground">
              <Shield className="inline h-3 w-3 mr-1" />
              Network secured
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Block Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{blockchainStats.avgBlockTime}</div>
            <p className="text-xs text-muted-foreground">
              <CheckCircle className="inline h-3 w-3 mr-1" />
              Optimal performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Search</CardTitle>
          <CardDescription>Search for blocks, transactions, or addresses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter block hash, transaction ID, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="blocks" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="blocks">Recent Blocks</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="network">Network Health</TabsTrigger>
          <TabsTrigger value="validators">Validators</TabsTrigger>
          <TabsTrigger value="nodes">Network Nodes</TabsTrigger>
        </TabsList>

        <TabsContent value="blocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Latest Blocks</CardTitle>
              <CardDescription>Most recently mined blocks on the network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBlocks.map((block) => (
                  <div key={block.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Blocks className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">Block #{block.height}</span>
                          <Badge variant="secondary">{block.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {block.transactions} transactions • {block.timestamp}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">{truncateHash(block.hash)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Block #{block.height} Details</DialogTitle>
                            <DialogDescription>Detailed information about this block</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Block Hash</label>
                                <div className="flex items-center gap-2">
                                  <code className="text-xs bg-muted p-1 rounded">{block.hash}</code>
                                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(block.hash)}>
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Validator</label>
                                <p className="text-sm">{block.validator}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Transactions</label>
                                <p className="text-sm">{block.transactions}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Timestamp</label>
                                <p className="text-sm">{block.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(block.hash)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest transactions on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Database className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{tx.type}</span>
                          <Badge variant={tx.status === "confirmed" ? "default" : "secondary"}>{tx.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tx.value} • {tx.timestamp}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          From: {tx.from} → To: {tx.to}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">Gas: {tx.gasUsed}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(tx.id)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Status</CardTitle>
                <CardDescription>Current blockchain network health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Network Status</span>
                  <Badge className="bg-primary text-primary-foreground">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {blockchainStats.networkStatus}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Block Production</span>
                    <span>98.5%</span>
                  </div>
                  <Progress value={98.5} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Network Sync</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Validator Uptime</span>
                    <span>99.2%</span>
                  </div>
                  <Progress value={99.2} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network Information</CardTitle>
                <CardDescription>Detailed blockchain network specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Consensus</span>
                  <span className="text-sm font-medium">{networkDetails.consensus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Chain ID</span>
                  <span className="text-sm font-medium font-mono">{networkDetails.chainId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Network Version</span>
                  <span className="text-sm font-medium">{networkDetails.networkVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Validators</span>
                  <span className="text-sm font-medium">
                    {networkDetails.activeValidators}/{networkDetails.totalValidators}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Staking Ratio</span>
                  <span className="text-sm font-medium">{networkDetails.stakingRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Inflation Rate</span>
                  <span className="text-sm font-medium">{networkDetails.inflationRate}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Transactions</CardTitle>
                <CardDescription>Transactions waiting for confirmation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-3xl font-bold text-foreground mb-2">{blockchainStats.pendingTransactions}</div>
                  <p className="text-muted-foreground">transactions in mempool</p>
                  <div className="mt-4">
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      Avg wait time: 2.3 minutes
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Governance</CardTitle>
                <CardDescription>Network governance and proposals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Proposals</span>
                  <span className="text-sm font-medium">{networkDetails.governanceProposals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Bonded Tokens</span>
                  <span className="text-sm font-medium">{networkDetails.bondedTokens}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Unbonding Period</span>
                  <span className="text-sm font-medium">{networkDetails.unbondingPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Epoch Duration</span>
                  <span className="text-sm font-medium">{networkDetails.epochDuration}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="validators" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Validators</CardTitle>
              <CardDescription>Active validators securing the network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {validators.map((validator, index) => (
                  <div
                    key={validator.name}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Server className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{validator.name}</span>
                          <Badge variant={validator.status === "active" ? "default" : "destructive"}>
                            {validator.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Stake: {validator.stake} • Uptime: {validator.uptime}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">Commission: {validator.commission}</div>
                      <div className="text-xs text-muted-foreground">Rank #{index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nodes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Nodes</CardTitle>
              <CardDescription>Distributed nodes across the network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {networkNodes.map((node) => (
                  <div key={node.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{node.id}</span>
                          <Badge variant={node.status === "online" ? "default" : "secondary"}>{node.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {node.location} • {node.type}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        <Activity className="inline h-3 w-3 mr-1" />
                        {node.latency}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <Users className="inline h-3 w-3 mr-1" />
                        {node.peers} peers
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
