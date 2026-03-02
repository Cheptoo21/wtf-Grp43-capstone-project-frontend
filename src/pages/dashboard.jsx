import DashboardLayout from "@/components/dashboard/dashboard"
import DashboardContents from "../components/dashboard/dashboardcontents"
import { PageNavHeader } from "@/components/layout/page-nav-header"
export default function Dashboard() {

  return (
    <div>
    <PageNavHeader heading = "dashboard"/>
    <DashboardLayout>
     <DashboardContents />
    </DashboardLayout>
    </div>
  )
}