"use client";

import { useState, useRef } from "react";
import MicButton from "../UserSetup/MicButton";
import AudioPlayback from "../UserSetup/AudioControls";
import TransactionStatus from "./TransactionStatus";

export default function DashboardVoiceAssistant() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [rawText, setRawText] = useState("");
  const [transaction, setTransaction] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // --- Start recording audio ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioURL(URL.createObjectURL(audioBlob));

        // Use Web Speech API for voice → text
        const recognition =
          window.SpeechRecognition || window.webkitSpeechRecognition
            ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
            : null;

        if (!recognition) {
          alert("Speech recognition not supported in this browser.");
          return;
        }

        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setRawText(transcript);
          parseAndSaveTransaction(transcript);
        };

        recognition.onerror = (err) => {
          console.error(err);
          alert("Error converting voice to text");
        };

        recognition.start();
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error(err);
      alert("Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  // --- Parse the voice transcript to a transaction ---
  const parseAndSaveTransaction = (text) => {
    try {
      const parsed = parseTransaction(text);
      setTransaction(parsed);

      // TODO: Replace with actual API call when backend exists
      console.log("Transaction to send:", parsed);
      alert(`Transaction ready to send:\n${JSON.stringify(parsed)}`);
    } catch (err) {
      alert(err.message);
    }
  };

  // --- Parser for simple phrases ---
  const parseTransaction = (input) => {
    const text = input.toLowerCase();

    let type = null;
    if (text.includes("sold")) type = "sale";
    else if (text.includes("bought") || text.includes("purchase") || text.includes("expense"))
      type = "expense";
    else throw new Error("Could not determine transaction type (sale/expense)");

    // Extract amount
    const amountMatch = text.match(/\b\d+(?:\.\d{1,2})?\b/);
    if (!amountMatch) throw new Error("Could not detect amount");
    const amount = parseFloat(amountMatch[0]);

    // Extract item (first word after keyword)
    const itemMatch = text.match(/(?:sold|bought|purchase|expense)\s+([a-zA-Z]+)/);
    if (!itemMatch) throw new Error("Could not detect item name");
    const item = capitalize(itemMatch[1]);

    return { transactionType: type, item, amount, rawText: input, currency: "NGN" };
  };

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <div className="bg-slate-900 rounded-xl p-6 text-white flex flex-col items-center gap-4">
      <p className="text-xs text-emerald-400">Voice Assistant</p>
      <p className="text-xs text-gray-300">Speak your transaction</p>

      <MicButton recording={recording} onClick={recording ? stopRecording : startRecording} />

      <AudioPlayback audioURL={audioURL} />

      <TransactionStatus transaction={transaction} />
    </div>
  );
}