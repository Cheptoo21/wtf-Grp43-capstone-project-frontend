import Mic from "../../assets/icons/mic.svg?react"
import WaveForm from "../../assets/icons/wave-icon.svg?react"
import ArrowUp from "../../assets/icons/arrow-up.svg?react"
import slidebar from "../../assets/images/slidebar.png"

export default function WelcomeCard() {
    return (
        <div className="flex-1 min-w-92 max-w-112 border-1 border-[#F1F5F9] rounded-[32px] p-8 shadow-2xl flex flex-col gap-8 items-center m-auto">
            <div className=" flex items-center justify-center h-24 w-24 bg-primary rounded-full">
                <Mic />
            </div>
            <WaveForm />
            <p className="font-manrope font-medium text-sm text-[#94A3B8]">Listening...</p>
            <div className="bg-[#F6F8F7] border-1 border-[#F1F5F9] rounded-xl p-4 w-full mt-16">
                <div className="flex">
                    <span className="h-8 w-8 inline-flex items-center rounded-full justify-center bg-[#DCFCE7]" mb-8><ArrowUp /></span>
                    <p className="capiitalize font-medium text-base  text-xs text-[#64748B] ml-3"> Today's profit <span className="block  text-xs">$1,240.50</span></p><br />
                </div>
                <img src={slidebar} alt="slidebar" className="mt-8"/>
            </div>
            
        </div>
    )
}