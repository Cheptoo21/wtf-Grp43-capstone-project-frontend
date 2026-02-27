import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function PageNavHeader({
  heading,
  description = null,
 
}) {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <header className="sticky top-0 w-full bg-white/95 backdrop-blur-sm z-40 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Title and Back Button */}
          <div className="flex items-center space-x-2">
            <Button onClick={handleBack} variant="ghost" className="px-2 md:px-4">
              <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
              <span className="hidden sm:inline ml-1">Back</span>
              <span className="sr-only">Go back</span>
            </Button>

            <div className="flex-1">
              <h1 className="text-base sm:text-lg font-bold tracking-tight overflow-hidden text-ellipsis line-clamp-2">
                {heading}
              </h1>

              {description && (
                <p className="text-sm font-medium text-gray-600">
                  {description}
                </p>
              )}
            </div>
          </div>

         
        </div>
      </div>
    </header>
  )
}