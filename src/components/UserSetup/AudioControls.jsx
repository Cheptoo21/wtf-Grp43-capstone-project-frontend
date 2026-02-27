import { CheckCircle } from "lucide-react";

export default function AudioControls({ success, onProceed }) {
  if (!success) return null;

  return (
    <div className="flex flex-col items-center mt-6 gap-4">
      <div className="flex flex-col items-center gap-2">
        <CheckCircle className="text-green-500 w-10 h-10 animate-bounce" />
        <p className="text-green-600 font-semibold text-lg">
          Voice Setup Complete!
        </p>
        <p className="text-[#9CA3AF] text-sm text-center">
          Your passphrase has been saved. You are all set.
        </p>
      </div>

      <button
        onClick={onProceed}
        className="mt-2 bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-all"
      >
        Proceed to Dashboard
      </button>
    </div>
  );
}