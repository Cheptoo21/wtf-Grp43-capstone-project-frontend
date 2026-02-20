"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Mic, Eye, EyeOff } from "lucide-react"

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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
      const res = await fetch("/api/auth/signup", {
        //waiting for api
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error("Failed to create account")
      }

      const data = await res.json()
      console.log("Signup success:", data)

      
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-[500px] min-h-[700px] rounded-xl shadow-md mx-4 sm:mx-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Join VoxLedger
        </CardTitle>
        <CardDescription>
          Your voice-first finance partner.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
               className="h-12 px-4 text-base bg-gray-50"
            />
          </div>

      
          <div className="space-y-1">
            <Label>Email Address</Label>
            <Input
              name="email"
              type="email"
              placeholder="name@example.com"
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
              placeholder="Create a strong password"
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

        
          <div className="border border-dashed border-emerald-300 rounded-lg p-4 flex gap-3 bg-emerald-50">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-500 text-white">
              <Mic size={18} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium">
                Setup Voice ID{" "}
                <span className="text-emerald-600 font-normal">
                  (Recommended)
                </span>
              </p>
              <p className="text-xs text-gray-600">
                Secure your account using your unique voice print for
                hands-free banking.
              </p>

              <Button
                variant="link"
                onClick={() => 
                    navigate("/setup")
                }
                className="mt-2 text-sm text-emerald-600 font-medium"
              >
                Start Recording
              </Button>
            </div>
          </div>

        
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          
          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-xs text-center text-gray-500">
            By joining, you agree to VoxLedger’s Terms of Service and Privacy Policy.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}