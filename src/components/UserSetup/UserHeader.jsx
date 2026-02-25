import Logo from "@/components/Logo/Logo";
import { CircleUserRound } from "lucide-react";

export default function UserHeader() {
    return (
            <div className="border-b-1 border-#13ECA41A bg-white">
                <div className="max-w-7xl mx-auto p-6 flex items-center justify-between ">
                    <Logo/>
                    <div className="flex items-center justify-center rounded-full bg-[#13ECA41A] border-1 border-green-500" style={{ opacity: 0.2 }}>
                        <CircleUserRound size={40} />
                    </div>
                </div>
           
            </div>
    )
}