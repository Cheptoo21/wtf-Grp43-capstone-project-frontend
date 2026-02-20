import SignUpForm from "../components/auth/signup"
import  SiteLayout from "../components/layout/site-layout"
export default function Signup(){
    return (
        <div>
            <SiteLayout>
           <SignUpForm/>
            </SiteLayout>
        </div>
    )
}