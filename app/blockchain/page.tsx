import { DashboardLayout } from "@/components/dashboard-layout"
import { BlockchainOverview } from "@/components/blockchain-overview"

export default function BlockchainPage() {
  return (
    <DashboardLayout>
      <BlockchainOverview />
    </DashboardLayout>
  )
}
