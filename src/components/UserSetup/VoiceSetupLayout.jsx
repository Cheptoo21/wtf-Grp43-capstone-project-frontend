// import Quote from "../../assets/icons/quotes.svg?react";
// import Mic from "../../assets/icons/mic.svg?react";
// import WaveFooter from "../../assets/images/wave-footer.png";


// export default function VoiceSetupLayout() {
//     return (
//         <>
//             <div className="flex flex-col items-center justify-center h-full mt-16">
//                 <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-10 shadow-SM z-10 max-w-140 min-w--sm border-[#13ECA40D] border-1">
//                     <h3 className="font-manrope font-extrabold sm:text-4xl text-2xl">Welcome, Thandi!</h3>   
//                     <p className="text-center text-xl font-normal mt-4">Let’s set up your <span className="text-primary">Voice Identity</span> to secure you ledger.</p>
//                     <div className="w-full bg-[#E5E7EB5E] shadow-[0px_4px_4px_0px_#10221C40] rounded-2xl mt-14">
//                         <div className="flex items-top">
//                             <p className="text-medium p font-medium text-[#4C9A80] mb-4 text-primary uppercase inline flex p-4 pb-0"> Please say a short phrase as your voice password</p>
//                             <Quote />  
//                         </div>
//                         <p className="p-4 font-bold text-[#10221C] mt-0 pt-0">"My voice is my secure key for VOXLEDGER</p>  
//                     </div>
//                     <div className=" flex items-center justify-center h-24 w-24 bg-primary rounded-full mt-15">
//                         <Mic />
//                     </div>
//                     <h4 className="m-4 text-xl font-bold font-manrope">Start Recording</h4>
//                     <p className="text-center text-[#9CA3AF]">Speak naturally. We’ll use this sample to verify your identity. </p>
//                 </div>  
//                 <img src={WaveFooter} alt="Wave Footer" className="mt-0 pt-0"/>
//             </div>
            
//         </>
//     )
// }

import { useState } from "react";
import Quote from "../../assets/icons/quotes.svg?react";
import Mic from "../../assets/icons/mic.svg?react";
import WaveFooter from "../../assets/images/wave-footer.png";
import { useVoiceRecorder } from "../../hooks/useVoiceRecorder";
import { calculateMatchScore, PASSPHRASE, MATCH_THRESHOLD } from "../../utils/voiceMatch";

export default function VoiceSetupLayout() {
  const { record } = useVoiceRecorder();
  const [status, setStatus] = useState("idle");
  // idle | recording | uploading | success | error | wrongphrase

  const token = localStorage.getItem("token");

  const handleMicClick = async () => {
    if (["uploading", "success"].includes(status)) return;

    try {
      setStatus("recording");
      const spokenText = await record();

      const score = calculateMatchScore(spokenText, PASSPHRASE);
      if (score < MATCH_THRESHOLD) {
        setStatus("wrongphrase");
        return;
      }

      setStatus("uploading");
      const res = await fetch("http://localhost:3000/api/voice/enroll", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passphrase: spokenText.toLowerCase().trim() }),
      });

      const data = await res.json();
      setStatus(data.success ? "success" : "error");

      if (data.success) {
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }
    } catch (err) {
      console.error(err.message);
      setStatus("error");
    }
  };

  const statusConfig = {
    idle:        { label: "Start Recording",               mic: "bg-primary" },
    recording:   { label: "Listening... speak now",        mic: "bg-red-500 animate-pulse" },
    uploading:   { label: "Saving your voice...",          mic: "bg-yellow-400" },
    success:     { label: "Voice enrolled! Redirecting...",mic: "bg-green-500" },
    error:       { label: "Something went wrong.",         mic: "bg-red-400" },
    wrongphrase: { label: "Phrase did not match.",         mic: "bg-orange-400" },
  };

  const { label, mic } = statusConfig[status];
  const isDisabled = ["uploading", "success"].includes(status);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full mt-16">
        <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-10 shadow-SM z-10 max-w-140 border-[#13ECA40D] border-1">

          <h3 className="font-manrope font-extrabold sm:text-4xl text-2xl">
            One Last Step!
          </h3>
          <p className="text-center text-xl font-normal mt-4">
            Set up your <span className="text-primary">Voice Identity</span> to
            secure your ledger.
          </p>

          {/* Passphrase box */}
          <div className="w-full bg-[#E5E7EB5E] shadow-[0px_4px_4px_0px_#10221C40] rounded-2xl mt-14">
            <div className="flex items-top">
              <p className="text-medium font-medium text-[#4C9A80] uppercase inline flex p-4 pb-0">
                Say this phrase exactly:
              </p>
              <Quote />
            </div>
            <p className="p-4 font-bold text-[#10221C]">
              "My voice is my secure key for VoxLedger"
            </p>
          </div>

          {/* Mic button */}
          <button
            onClick={handleMicClick}
            disabled={isDisabled}
            className={`flex items-center justify-center h-24 w-24 rounded-full mt-15 transition-all duration-300
              ${mic}
              ${isDisabled ? "opacity-60 cursor-not-allowed" : "hover:scale-105 cursor-pointer"}
            `}
          >
            <Mic />
          </button>

          <h4 className="m-4 text-xl font-bold font-manrope">{label}</h4>

          {["error", "wrongphrase"].includes(status) && (
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 text-primary underline text-sm"
            >
              Try again
            </button>
          )}
        </div>

        <img src={WaveFooter} alt="Wave Footer" className="mt-0 pt-0" />
      </div>
    </>
  );
}