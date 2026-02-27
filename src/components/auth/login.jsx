"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "@/lib/firebase"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        console.log(JSON.stringify(formData))
      if (!res.ok) {
        throw new Error("Invalid email or password")
      }

      const data = await res.json()
      console.log("Login success:", data)

       navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

//fake log , will implement once api is ready
// function handleSubmit(e) {
//   e.preventDefault()
//   setError(null)

//   if (!formData.email || !formData.password) {
//     setError("Please enter email and password")
//     return
//   }

  
//   console.log("Logged in with:", formData)

//   navigate("/dashboard")
// }
  return (
    <Card className="w-full max-w-[450px] min-h-[600px] rounded-xl shadow-md mx-4 sm:mx-0">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Login</CardTitle>
        <CardDescription>
          Welcome back to VoxLedger
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

          
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12 px-4 text-base bg-gray-50"
            />
          </div>

        
          <div className="space-y-1 relative">
            <Label>Password</Label>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="h-12 px-4 text-base bg-gray-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-500"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

         
          <div className="text-right">
            <Button
              variant="link"
              className="text-sm text-emerald-600 hover:underline"
            >
              Forgot Password?
            </Button>
          </div>

         
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          
          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 h-12"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
{/* <Button
  type="submit"
  className="w-full bg-emerald-500 hover:bg-emerald-600 h-12"
>
  Sign In
</Button> */}
     
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">Or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          
          <div className="flex justify-center gap-4">
            <button 
            onClick = {handleGoogleLogin}
            className="h-10 w-10 rounded-full border flex items-center justify-center">
              <img src="/src/assets/icons/google.svg" alt="Google" className="h-5" />
            </button>
            <button 
            onClick = {handleAppleLogin}
            className="h-10 w-10 rounded-full border flex items-center justify-center">
              <img src="/src/assets/icons/apple.svg" alt="Apple" className="h-5" />
            </button>
            
          </div>

          
          <p className="text-xs text-center text-gray-500">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-emerald-600 font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}