"use client";

import { useState, useRef } from "react";
import { extractWithLLM, saveTransaction } from "../";
import {
  Waveform,
  MicButton,
  Spinner,
  SuccessBanner,
  ErrorBanner,
} from "./voiceassistantUI";

const SUBTITLE = {
  idle:        "Tap the mic to speak a transaction",
  recording:   "Listening…",
  transcribing:"Transcribing audio…",
  extracting:  "Extracting fields…",
  preview:     "Does this look right?",
  saving:      "Saving to ledger…",
  success:     "Transaction saved ✓",
  error:       "Something went wrong",
};

export default function DashboardVoiceAssistant() {
  const [recording, setRecording]               = useState(false);
  const [audioURL, setAudioURL]                 = useState(null);
  const [transcript, setTranscript]             = useState("");
  const [phase, setPhase]                       = useState("idle");
  const [extracted, setExtracted]               = useState(null);
  const [savedTransaction, setSavedTransaction] = useState(null);
  const [errorMsg, setErrorMsg]                 = useState("");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef   = useRef([]);

  function reset() {
    setRecording(false);
    setAudioURL(null);
    setTranscript("");
    setExtracted(null);
    setSavedTransaction(null);
    setErrorMsg("");
    setPhase("idle");
  }

  async function startRecording() {
    reset();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Pick a MIME type the browser actually supports
      const mimeType = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/ogg;codecs=opus",
        "audio/mp4",
      ].find((m) => MediaRecorder.isTypeSupported(m)) ?? "";

      const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current   = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      // ─── Fixed onstop handler ─────────────────────────────────────────
      mediaRecorder.onstop = async () => {
        // Stop all mic tracks so the browser indicator goes away
        stream.getTracks().forEach((t) => t.stop());

        const blob = new Blob(audioChunksRef.current, {
          type: mimeType || "audio/webm",
        });
        setAudioURL(URL.createObjectURL(blob));

        try {
          // ── Step 1: Transcribe with OpenAI Whisper ──────────────────
          setPhase("transcribing");

          const formData = new FormData();
          // Whisper needs a filename with an extension it recognises
          const ext = (mimeType.split(";")[0].split("/")[1]) || "webm";
          formData.append("file", blob, `recording.${ext}`);
          formData.append("model", "whisper-1");

          const whisperRes = await fetch(
            "https://api.openai.com/v1/audio/transcriptions",
            {
              method: "POST",
              headers: {
                // ⚠️  Move this key to an env var / proxy when you add a backend
                Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              },
              body: formData,
            }
          );

          if (!whisperRes.ok) {
            const err = await whisperRes.json().catch(() => ({}));
            throw new Error(err?.error?.message ?? `Whisper error ${whisperRes.status}`);
          }

          const { text } = await whisperRes.json();
          if (!text?.trim()) throw new Error("No speech detected — please try again.");
          setTranscript(text);

          // ── Step 2: Extract fields with Claude ──────────────────────
          setPhase("extracting");
          const fields = await extractWithLLM(text);
          setExtracted(fields);

          // ── Step 3: Show preview — let the user confirm before saving
          setPhase("preview");

        } catch (err) {
          setErrorMsg(err.message);
          setPhase("error");
        }
      };
      // ─────────────────────────────────────────────────────────────────

      mediaRecorder.start();
      setRecording(true);
      setPhase("recording");

    } catch (err) {
      const msg = err?.name === "NotAllowedError"
        ? "Microphone access denied — please allow it and try again."
        : err.message;
      setErrorMsg(msg);
      setPhase("error");
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    // phase transitions to "transcribing" inside onstop
  }

  // Called when user clicks "Save Transaction" in the preview card
  async function confirmSave() {
    if (!extracted) return;
    setPhase("saving");
    try {
      const saved = await saveTransaction(extracted);
      setSavedTransaction(saved ?? extracted);
      setPhase("success");
      setTimeout(() => reset(), 4000);
    } catch (err) {
      setErrorMsg(err.message);
      setPhase("error");
    }
  }

  const isProcessing  = ["transcribing", "extracting", "saving"].includes(phase);
  const spinnerLabel  =
    phase === "transcribing" ? "Transcribing audio…"
    : phase === "extracting" ? "Extracting with AI…"
    : "Saving to ledger…";

  return (
    <div
      className="relative overflow-hidden flex flex-col gap-4 rounded-2xl p-5 text-white min-w-[340px] max-w-[420px] border border-white/[0.06]"
      style={{
        background: "linear-gradient(145deg, #0f172a 0%, #0d1f2d 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="m-0 text-[15px] font-semibold text-slate-100 tracking-tight">
            Voice Assistant
          </p>
          <p className={`mt-0.5 text-xs font-medium transition-colors duration-300 ${
            phase === "error" ? "text-red-400" : "text-emerald-400"
          }`}>
            {SUBTITLE[phase]}
          </p>
        </div>

        <MicButton
          recording={recording}
          disabled={isProcessing}
          onClick={recording ? stopRecording : startRecording}
        />
      </div>

      <Waveform active={recording} />

      {/* Transcript quote */}
      {transcript && (
        <p className="m-0 text-xs text-slate-400 italic leading-relaxed border-l-2 border-emerald-500/35 pl-2.5">
          "{transcript}"
        </p>
      )}

      {/* Audio playback */}
      {audioURL && (
        <audio
          controls
          src={audioURL}
          className="w-full h-7"
          style={{ filter: "invert(1) hue-rotate(140deg)" }}
        />
      )}

      {/* Spinner during async steps */}
      {isProcessing && <Spinner label={spinnerLabel} />}

      {/* ── Preview card — shown after extraction, before save ── */}
      {phase === "preview" && extracted && (
        <div className="flex flex-col gap-3 rounded-xl bg-white/[0.04] border border-white/10 p-3.5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <span className="text-slate-500 uppercase tracking-wider text-[10px]">Type</span>
            <span className={`font-semibold capitalize ${
              extracted.transactionType === "sale" ? "text-emerald-400" : "text-red-400"
            }`}>
              {extracted.transactionType}
            </span>

            <span className="text-slate-500 uppercase tracking-wider text-[10px]">Item</span>
            <span className="text-slate-100 font-medium">{extracted.item}</span>

            <span className="text-slate-500 uppercase tracking-wider text-[10px]">Amount</span>
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

      {phase === "success" && savedTransaction && (
        <SuccessBanner transaction={savedTransaction} />
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