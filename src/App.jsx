import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      
    </Routes>
  )
}
