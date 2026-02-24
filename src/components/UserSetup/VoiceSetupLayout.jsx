import Quote from "../../assets/icons/quotes.svg?react";
import Mic from "../../assets/icons/mic.svg?react";
import WaveFooter from "../../assets/images/wave-footer.png";


export default function VoiceSetupLayout() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-full mt-16">
                <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-10 shadow-SM z-10 max-w-140 min-w--sm border-[#13ECA40D] border-1">
                    <h3 className="font-manrope font-extrabold sm:text-4xl text-2xl">Welcome, Thandi!</h3>   
                    <p className="text-center text-xl font-normal mt-4">Let’s set up your <span className="text-primary">Voice Identity</span> to secure you ledger.</p>
                    <div className="w-full bg-[#E5E7EB5E] shadow-[0px_4px_4px_0px_#10221C40] rounded-2xl mt-14">
                        <div className="flex items-top">
                            <p className="text-medium p font-medium text-[#4C9A80] mb-4 text-primary uppercase inline flex p-4 pb-0"> Please say a short phrase as your voice password</p>
                            <Quote />  
                        </div>
                        <p className="p-4 font-bold text-[#10221C] mt-0 pt-0">"My voice is my secure key for VOXLEDGER</p>  
                    </div>
                    <div className=" flex items-center justify-center h-24 w-24 bg-primary rounded-full mt-15">
                        <Mic />
                    </div>
                    <h4 className="m-4 text-xl font-bold font-manrope">Start Recording</h4>
                    <p className="text-center text-[#9CA3AF]">Speak naturally. We’ll use this sample to verify your identity. </p>
                </div>  
                <img src={WaveFooter} alt="Wave Footer" className="mt-0 pt-0"/>
            </div>
            
        </>
    )
}