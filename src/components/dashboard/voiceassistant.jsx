// src/components/dashboard/VoiceAssistant.jsx
import { Mic } from "lucide-react"

export default function VoiceAssistant() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white flex justify-between items-center">
      <div>
        <p className="text-sm text-emerald-400">Voice Assistant</p>
        <p className="text-xs text-gray-300 mt-1">Listening...</p>
        <div className="mt-4 h-6 w-32 bg-emerald-400/20 rounded" />
      </div>

      <button className="h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center">
        <Mic size={20} />
      </button>
    </div>
  )
}