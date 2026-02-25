import LoginForm from "../components/auth/login"
import  SiteLayout from "../components/layout/site-layout"
export default function LoginFormPage(){
    return (
        <div>
            <SiteLayout>
           <LoginForm/>
            </SiteLayout>
        </div>
    )
}