import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import ProfileSetup from "./pages/ProfileSetup"
import VoiceSetup from "./pages/VoiceSetup"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/voice-setup" element={<VoiceSetup />} />
    </Routes>
  )
}
