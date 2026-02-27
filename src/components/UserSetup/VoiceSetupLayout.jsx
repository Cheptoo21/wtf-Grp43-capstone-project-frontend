import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/footer";
import VoiceInstructionCard from "./VoiceInstructionCard";
import MicButton from "./MicButton";
import AudioControls from "./AudioControls";
import { useVoiceRecorder } from "../../hooks/useVoiceRecorder";
import { calculateMatchScore, PASSPHRASE, MATCH_THRESHOLD } from "../../utils/voiceMatch";

const STATUS_CONFIG = {
  idle: {
    label: "Start Recording",
    description: "Speak naturally. Say the phrase above clearly.",
  },
  recording: {
    label: "Listening... speak now",
    description: "Keep speaking until we detect your voice.",
  },
  checking: {
    label: "Checking phrase...",
    description: "Please wait.",
  },
  uploading: {
    label: "Saving your voice...",
    description: "Almost done!",
  },
  success: {
    label: "Voice enrolled successfully!",
    description: "You are all set.",
  },
  wrongphrase: {
    label: "Phrase did not match. Try again.",
    description: 'Please say the exact phrase shown above.',
  },
  error: {
    label: "Something went wrong.",
    description: "Please try again.",
  },
};

export default function VoiceSetupLayout() {
  const navigate = useNavigate();
  const { record, isRecording } = useVoiceRecorder();
  const [status, setStatus] = useState("idle");

  const token = localStorage.getItem("token");

  const isDisabled = ["uploading", "success", "checking"].includes(status);

  const handleMicClick = async () => {
    if (isDisabled) return;

    try {
      setStatus("recording");
      const spokenText = await record();

      setStatus("checking");
      const score = calculateMatchScore(spokenText, PASSPHRASE);

      if (score < MATCH_THRESHOLD) {
        setStatus("wrongphrase");
        return;
      }

      setStatus("uploading");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/voice/enroll`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passphrase: spokenText.toLowerCase().trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err.message);
      setStatus("error");
    }
  };

  const { label, description } = STATUS_CONFIG[status];

  return (
    <div className="flex flex-col items-center justify-center h-full mt-16">
      <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-10 shadow-SM z-10 max-w-140 min-w--sm border-[#13ECA40D] border-1">

        <h3 className="font-manrope font-extrabold sm:text-4xl text-2xl">
          Welcome!
        </h3>
        <p className="text-center text-xl font-normal mt-4">
          Let's set up your{" "}
          <span className="text-primary">Voice Identity</span> to secure your
          ledger.
        </p>

        {status !== "success" && <VoiceInstructionCard />}


        {status !== "success" && (
          <>
            <MicButton
              recording={isRecording}
              onClick={handleMicClick}
              disabled={isDisabled}
            />

            <h4 className="m-4 text-xl font-bold font-manrope">{label}</h4>

            <p className="text-center text-[#9CA3AF]">{description}</p>
          </>
        )}

        {["error", "wrongphrase"].includes(status) && (
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-primary underline text-sm"
          >
            Try again
          </button>
        )}
        <AudioControls
          success={status === "success"}
          onProceed={() => navigate("/dashboard")}
        />
      </div>

      <br />
      <Footer />
    </div>
  );
}