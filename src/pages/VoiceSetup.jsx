import VoiceSetupLayout from "@/components/UserSetup/VoiceSetupLayout";
import UserHeader from "../components/UserSetup/UserHeader";
import { PageNavHeader } from "@/components/layout/page-nav-header"


export default function VoiceSetup() {
    return (
        <>
        <PageNavHeader heading = "dashboard"/>
            <UserHeader />
            <VoiceSetupLayout />
        </>
    )

}