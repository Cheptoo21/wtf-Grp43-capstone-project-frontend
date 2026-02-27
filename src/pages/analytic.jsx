import AnalyticsDashboard from "../components/analytics/analyticsdashboard"
import DashboardLayout from "@/components/dashboard/dashboard"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function Dashboard() {

  return (
    <div>
    <DashboardLayout>
  <QueryClientProvider client={queryClient}>
    <AnalyticsDashboard />
  </QueryClientProvider>
</DashboardLayout>
    </div>
  )
}
