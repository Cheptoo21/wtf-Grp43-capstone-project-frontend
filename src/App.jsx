import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import ProfileSetup from "./pages/ProfileSetup";
import VoiceSetup from "./pages/VoiceSetup";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/voice-setup" element={<VoiceSetup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
