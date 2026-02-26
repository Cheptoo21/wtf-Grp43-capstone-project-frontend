import UserHeader from "./UserHeader";
import WelcomeIcon from "../../assets/icons/welcome-icon.svg?react";
import Tick from "../../assets/icons/tick.svg?react";
import Voice from "../../assets/icons/voice.svg?react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProfileSetupLayout() {
    const navigate = useNavigate();
    return (
        <>
            <UserHeader />
            <div className="absolute right-0 top-0 w-100 h-100 rounded-full bg-[#13ECA40D] translate-x-1/2 translate-y-[-50%] z-0"></div>
            <div className="absolute left-0 right-0 bottom-0 w-100 h-100 rounded-full bg-[#13ECA40D] backdrop-blur-3xl translate-x-[-50%] translate-y-[50%] z-0"></div>
            <div className="flex flex-col items-center justify-center h-full mt-16 border-1 border-[#13ECA40D]">
                <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-12 shadow-SM z-10 max-w-xl min-w--sm">
                    <div className="w-16 pt-[14px] pb-[14px] rounded-full bg-[#13ECA41A] flex items-center justify-center mb-8 ">
                        <WelcomeIcon />
                    </div>
                    <h3 className="font-manrope font-extrabold sm:text-4xl text-2xl">Welcome, Thandi!</h3>
                    <p className="text-center text-lg font-normal text-[#4C9A80] mt-4">Let’s get you set up. Just a few more steps to secure your account and personalize your experience.</p>
                    <div className="w-full pl-4 mt-12 mb-9 flex">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-4">
                            <Tick />
                        </div>
                        <p className="ml-6 ont-bold font-manrope">Profile Details <span className="block text-primary uppercase font-bold">completed</span></p>
                    </div>
                    <div className="w-full pl-4 flex">
                        <div className="w-10 h-10 rounded-full bg-[#13ECA433] flex items-center justify-center mb-4 border-2 border-primary">
                            <Voice />
                        </div>
                        <p className="ml-6 font-bold font-manrope">Voice Identity <span className="block text-primary font-medium font-[#4C9A80]">Current step</span></p>
                    </div>
                    <Button className="text-black pt-4 pb-4 w-full mt-12 rounded-none hover:bg-[#4C9A80] hover:text-white" onClick={() => navigate("/voice-setup")}>Continue to Voice Setup</Button>
                    <p className="font-manrope font-medium font-sm text-[#4C9A80] mt-4">This will take less than 2 minutes</p>
                </div>
                <p className="mt-8 text-manrope text-sm text-[#4C9A80] z-10">Need help? <a href="mailto:supportteamvoiceledger@gmail.com" className="text-manrope text-primary text-sm font-bold">Contact our support team</a></p>
            </div>
        </>
    )
}