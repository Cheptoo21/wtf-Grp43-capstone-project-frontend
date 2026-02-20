import Header from "../components/Header/Header";
import { Button } from "@/components/ui/button"
import Mic from "../assets/icons/mic.svg?react"
import ArrowRight from "../assets/icons/arrow-right.svg?react"
import WaveForm from "../assets/icons/wave-icon.svg?react"
import ArrowUp from "../assets/icons/arrow-up.svg?react"

export default function Home(){
    return (
        <div className="max-w-7xl md:px-8 mx-auto px-2">
            <Header />
            <main className="flex py-5 items-center my:8 md:my-[138px]">
                <section className="flex flex-col lg:flex-row flex-col gap-12 ">
                    <div className="flex-1 md:pr-32">
                        <p className="inline-flex items-center gap-2 py-2 px-3 bg-[#13ECA41A] rounded-full"><span className="inline-block bg-primary w-2 h-2 rounded-full"></span>Voice 2.0 is live</p>
                        <h2 className="font-manrope font-extrabold text-7xl capitalize my-6">Know your <span className="text-primary">Profit.</span> Every day</h2>
                        <p className="my-6 text-[#64748B] font-normal">The voice-first ledger for modern business. Simply speak your expenses and income, and let VoxLedger handle the rest.</p>
                        <Button className="text-black font-manrope py-4 px-8 rounded-xl">Get Started</Button>
                        <Button className="bg-white text-black border-1 border-[#E2E8F0] ml-4 py-4 px-8 rounded-xl">Sign In <ArrowRight /></Button>
                    </div>
                    <div className="flex-1 min-w-94 max-w-112 border-1 border-[#F1F5F9] rounded-[32px] p-8 shadow-2xl flex flex-col gap-8 items-center justify-center">
                        <div className=" flex items-center justify-center h-24 w-24 bg-primary rounded-full">
                            <Mic />
                        </div>
                        <WaveForm />
                        <p className="font-manrope font-medium text-sm text-[#94A3B8]">Listening...</p>
                        <div className="mx-8 bg-[#F6F8F7] border-1 border-[#F1F5F9] rounded-xl p-4 flex items-center w-full">
                            <span className="h-8 w-8 inline-flex items-center rounded-full justify-center bg-[#DCFCE7]"><ArrowUp /></span>
                            <p className="capiitalize font-medium text-base text-[#64748B]"> Today's profit <span className="block">$1,240.50</span></p>
                            
                        </div>
                        
                    </div>
                    
                </section>
                   
            </main>
        </div>
    )
}