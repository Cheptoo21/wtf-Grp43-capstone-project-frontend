import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react"; // optional hamburger icon

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 font-semibold text-lg">
          <img src="/logo.svg" alt="VoxLedger" className="h-6 sm:h-8" />
          VoxLedger
        </div>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
          <span>Already have an account?</span>
          <Button
            variant="outline"
            className="bg-emerald-50 text-primary-foreground hover:bg-emerald-100"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <button
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="sm:hidden px-6 pb-3 flex flex-col gap-2 text-sm text-gray-600 bg-white border-t">
          <span>Already have an account?</span>
          <Button
            variant="outline"
            className="bg-emerald-50 text-primary-foreground hover:bg-emerald-100"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </div>
      )}
    </header>
  );
}