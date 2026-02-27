import Quote from "../../assets/icons/quotes.svg?react";

export default function VoiceInstructionCard() {
  return (
    <div className="w-full bg-[#E5E7EB5E] shadow-[0px_4px_4px_0px_#10221C40] rounded-2xl mt-14">
      <div className="flex items-top">
        <p className="text-medium p font-medium text-[#4C9A80] mb-4 text-primary uppercase inline flex p-4 pb-0">
          Please say a short phrase as your voice password
        </p>
        <Quote />  
      </div>
      <p className="p-4 font-bold text-[#10221C] mt-0 pt-0">
        "My voice is my secure key for VOXLEDGER"
      </p>  
    </div>
  )
}