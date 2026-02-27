import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/login"
import ProfileSetup from "./pages/ProfileSetup"
import VoiceSetup from "./pages/VoiceSetup"
import Dashboard from "./pages/dashboard"
import Ledger from "./pages/ledger"
import AnalyticsDashboard from "./pages/analytic"
import SettingsPage from "./pages/settings"
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/voice-setup" element={<VoiceSetup />} />
       <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ledger" element={<Ledger />} />
         <Route path="/analytics" element={<AnalyticsDashboard />} />
         <Route path="/settings" element={<SettingsPage/>} />
    </Routes>
  )
}
