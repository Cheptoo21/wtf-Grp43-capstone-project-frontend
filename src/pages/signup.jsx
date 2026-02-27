import SignUpForm from "../components/auth/signup"
import  SiteLayout from "../components/layout/site-layout"
import { PageNavHeader } from "@/components/layout/page-nav-header"

export default function Signup(){
    return (
        <div>
            <PageNavHeader heading = "signup"/>
            <SiteLayout>
           <SignUpForm/>
            </SiteLayout>
        </div>
    )
}