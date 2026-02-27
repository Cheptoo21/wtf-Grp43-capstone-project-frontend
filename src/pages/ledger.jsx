import LedgerTransaction from "../components/Ledger/ledger"
import DashboardLayout from "@/components/dashboard/dashboard"
import { PageNavHeader } from "@/components/layout/page-nav-header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Ledger() {
  return (
    <DashboardLayout>
      <PageNavHeader heading="Ledger" />
      <QueryClientProvider client={queryClient}>
        <LedgerTransaction />
      </QueryClientProvider>
    </DashboardLayout>
  )
}