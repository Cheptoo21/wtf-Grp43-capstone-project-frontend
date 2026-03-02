import Settings from "..//components/settings/settings"
import DashboardLayout from "@/components/dashboard/dashboard"
import { PageNavHeader } from "@/components/layout/page-nav-header"



export default function SettingsPage() {
  return (
    <DashboardLayout>
      <PageNavHeader heading="Settings" />
      
        <Settings />
      
    </DashboardLayout>
  )
}