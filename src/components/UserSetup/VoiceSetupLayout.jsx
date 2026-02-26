"use client"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Footer from "../layout/footer"
import VoiceInstructionCard from "./VoiceInstructionCard"
import MicButton from "./MicButton"
import AudioControls from "./AudioControls"

export default function VoiceSetupLayout() {
  const navigate = useNavigate()
  const [recording, setRecording] = useState(false)
  const [audioURL, setAudioURL] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const url = URL.createObjectURL(audioBlob)
        setAudioURL(url)
      }

      mediaRecorder.start()
      setRecording(true)
    } catch (err) {
      console.error("Error accessing microphone:", err)
      alert("Please allow microphone access to record your voice.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setRecording(false)
    }
  }

  const playAudio = () => {
    if (audioURL) {
      const audio = new Audio(audioURL)
      audio.play()
    }
  }

  const proceedToDashboard = () => {
    navigate("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center h-full mt-16">
      <div className="flex flex-col items-center justify-center bg-white rounded-3xl p-10 shadow-SM z-10 max-w-140 min-w--sm border-[#13ECA40D] border-1">
        <h3 className="font-manrope font-extrabold sm:text-4xl text-2xl">Welcome!</h3>   
        <p className="text-center text-xl font-normal mt-4">
          Let’s set up your <span className="text-primary">Voice Identity</span> to secure your ledger.
        </p>

        <VoiceInstructionCard />

        <MicButton 
          recording={recording} 
          onClick={recording ? stopRecording : startRecording} 
        />

        <h4 className="m-4 text-xl font-bold font-manrope">
          {recording ? "Recording..." : "Start Recording"}
        </h4>
        <p className="text-center text-[#9CA3AF]">
          Speak naturally. We’ll use this sample to verify your identity.
        </p>

        <AudioControls 
          audioURL={audioURL} 
          onPlay={playAudio} 
          onProceed={proceedToDashboard} 
        />
      </div>

      <br />
      <Footer/>
    </div>
  )
}