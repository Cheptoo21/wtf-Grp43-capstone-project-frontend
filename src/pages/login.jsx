import LoginForm from "../components/auth/login"
import  SiteLayout from "../components/layout/site-layout"
import { PageNavHeader } from "@/components/layout/page-nav-header"
export default function LoginFormPage(){
    return (
        <div>
            <PageNavHeader heading = "login"/>
            <SiteLayout>
           <LoginForm/>
            </SiteLayout>
        </div>
    )
}