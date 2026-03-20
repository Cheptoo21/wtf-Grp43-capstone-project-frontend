import { useState } from "react";
import { extractWithLLM, saveTransaction } from "../Serivces/transactionservice";
import {
  Waveform,
  MicButton,
  Spinner,
  SuccessBanner,
  ErrorBanner,
} from "./voiceassistantUI";
import { useVoiceRecorder } from "../hooks/useVoiceRecorder";

const SUBTITLE = {
  idle:       "Tap the mic to speak a transaction \n (e.g I bought/sold a bottle of wine for 4000 naira)",
  recording:  "Listening… say your transaction",
  extracting: "Understanding what you said…",
  preview:    "Does this look right?",
  saving:     "Saving to ledger…",
  success:    "Transaction saved ✓",
  error:      "Something went wrong",
};

export default function DashboardVoiceAssistant({setSaved, saved}) {
  const { startRecording, isRecording } = useVoiceRecorder();

  const [phase, setPhase]                       = useState("idle");
  const [transcript, setTranscript]             = useState("");
  const [extracted, setExtracted]               = useState(null);
  const [errorMsg, setErrorMsg]                 = useState("");

  function reset() {
    setTranscript("");
    setExtracted(null);
    setSaved(null);
    setErrorMsg("");
    setPhase("idle");
  }

  async function handleMicPress() {
    if (isRecording || phase === "extracting" || phase === "saving") return;

    reset();

    try {
      setPhase("recording");

      const spokenText = await startRecording();
      setTranscript(spokenText);

      setPhase("extracting");
      const fields = await extractWithLLM(spokenText);
      setExtracted(fields);

      setPhase("preview");

    } catch (err) {
      setErrorMsg(err.message);
      setPhase("error");
    }
  }

  async function confirmSave() {
    if (!extracted) return;
    setPhase("saving");
    try {
      const saved = await saveTransaction(extracted);
      setSaved(saved ?? extracted);
      setPhase("success");
      setTimeout(() => reset(), 4000);
    } catch (err) {
      setErrorMsg(err.message);
      setPhase("error");
    }
  }

  const isProcessing = phase === "extracting" || phase === "saving";
  const spinnerLabel =
    phase === "extracting" ? "Extracting with AI…" : "Saving to ledger…";

  return (
    <div
      className="relative overflow-hidden flex flex-col gap-4 rounded-2xl p-5 text-white min-w-[340px] max-w-[420px] border border-white/[0.06]"
      style={{
        background: "linear-gradient(145deg, #0f172a 0%, #0d1f2d 100%)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="m-0 text-[15px] font-semibold text-slate-100 tracking-tight">
            Voice Assistant
          </p>
          <p
            className={`mt-0.5 text-xs font-medium transition-colors duration-300 whitespace-pre-line ${
              phase === "error" ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {SUBTITLE[phase]}
          </p>
        </div>

        <MicButton
          recording={isRecording}
          disabled={isProcessing}
          onClick={handleMicPress}
        />
      </div>

      <Waveform active={isRecording} />

      {transcript && (
        <p className="m-0 text-xs text-slate-400 italic leading-relaxed border-l-2 border-emerald-500/35 pl-2.5">
          "{transcript}"
        </p>
      )}

      {isProcessing && <Spinner label={spinnerLabel} />}

      {phase === "preview" && extracted && (
        <div className="flex flex-col gap-3 rounded-xl bg-white/[0.04] border border-white/10 p-3.5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <span className="text-slate-500 uppercase tracking-wider text-[10px]">
              Type
            </span>
            <span
              className={`font-semibold capitalize ${
                extracted.transactionType === "sale"
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {extracted.transactionType}
            </span>

            <span className="text-slate-500 uppercase tracking-wider text-[10px]">
              Item
            </span>
            <span className="text-slate-100 font-medium">{extracted.item}</span>

            <span className="text-slate-500 uppercase tracking-wider text-[10px]">
              Amount
            </span>
            <span className="text-slate-100 font-medium">
              {extracted.currency} {Number(extracted.amount).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={confirmSave}
              className="flex-1 text-xs font-semibold py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white transition-colors duration-150 shadow-[0_2px_10px_rgba(16,185,129,0.3)]"
            >
              Save Transaction
            </button>
            <button
              onClick={reset}
              className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] transition-colors duration-150"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {phase === "success" && saved && (
        <SuccessBanner transaction={saved} />
      )}

      {phase === "error" && <ErrorBanner message={errorMsg} />}

      {(phase === "error" || phase === "success") && (
        <button
          onClick={reset}
          className="self-start text-xs text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2"
        >
          {phase === "error" ? "Try again" : "Record another"}
        </button>
      )}
    </div>
  );
}