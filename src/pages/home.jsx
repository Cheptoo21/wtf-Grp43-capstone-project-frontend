import Header from "../components/Header/Header";
import { Button } from "@/components/ui/button"

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
                        <Button className="bg-white text-black border-1 border-[#E2E8F0] ml-4 py-4 px-8 rounded-xl">Sign In</Button>
                    </div>
                    <div className="flex-1 min-w-94 max-w-112 border-1 border-[#F1F5F9] rounded-[32px] p-8 shadow-2xl">
                        <p>Hello</p> 
                    </div>
                    
                </section>
                   
            </main>
        </div>
    )
}