import ProfileSetupLayout from "@/components/UserSetup/ProfileSetupLayout";
import { PageNavHeader } from "@/components/layout/page-nav-header"

export default function ProfileSetup() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <PageNavHeader heading = "Profile setup"/>
        <ProfileSetupLayout />
    </div>
    
  )
}