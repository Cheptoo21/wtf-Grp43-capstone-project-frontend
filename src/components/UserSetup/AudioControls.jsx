import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function AudioControls({ audioURL, onPlay, onProceed }) {
  if (!audioURL) return null

  return (
    <div className="flex flex-col items-center mt-4 gap-4">
        <div className="flex flex-col items-center gap-2">
        <CheckCircle className="text-green-500 w-10 h-10 animate-bounce" />
        <p className="text-green-600 font-semibold text-lg">
          Voice Setup Complete!
        </p>
      </div>
      <Button 
        onClick={onPlay} 
        className="px-6 py-2 rounded-lg"
      >
        Play Recording
      </Button>

      <Button
        onClick={onProceed}
        
      >
        Proceed to Dashboard
      </Button>
    </div>
  )
}