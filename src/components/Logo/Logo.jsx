import VoiceInput from "../../assets/icons/voice-input-icon.svg?react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <div className="flex items-center justify-center space-x-2">
        <div className="flex items-center justify-center bg-primary w-8 h-8 rounded-lg">
          <VoiceInput />
        </div>
        <h1 className="text-xl font-bold font-manrope">VoxLedger</h1>
      </div>
    </Link>
  );
}
