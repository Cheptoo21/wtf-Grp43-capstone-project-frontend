import ArrowRight from "../../assets/icons/arrow-right.svg?react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const navigate = useNavigate();
    
    return (
        <div className="flex-1 lg:pr-48">
            <p className="inline-flex items-center gap-2 py-2 px-3 bg-[#13ECA41A] rounded-full"><span className="inline-block bg-primary w-2 h-2 rounded-full"></span>Voice 2.0 is live</p>
            <h2 className="font-manrope font-extrabold text-7xl capitalize my-6">Know your <span className="text-primary">Profit.</span> <br />Every day</h2>
            <p className="my-6 text-[#64748B] font-normal">The voice-first ledger for modern business. Simply speak your expenses and income, and let VoxLedger handle the rest.</p>
            <Button onClick={() => navigate("/signup")} className="text-black font-manrope py-4 px-8 rounded-xl hover:bg-[#13ECA41A] shadow-[0px_4px_6px_-4px_#13ECA433]">Get Started</Button>
            <Button className="bg-white text-black border-1 border-[#E2E8F0] ml-4 py-4 px-8 rounded-xl hover:bg-[#13ECA41A]">Sign In <ArrowRight /></Button>
        </div>
    )
}