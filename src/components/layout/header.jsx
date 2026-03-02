import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";
import Logo from "@/components/Logo/Logo.jsx";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Logo />

        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
          {isLoginPage && (
            <>
              <span>Don’t have an account?</span>
              <Button
                variant="outline"
                size="sm"
                className="bg-emerald-50 hover:bg-emerald-100"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}

          {isSignupPage && (
            <>
              <span>Already have an account?</span>
              <Button
                variant="outline"
                size="sm"
                className="bg-emerald-50 hover:bg-emerald-100"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
            </>
          )}
        </div>

        <div className="sm:hidden">
          <button
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden px-6 pb-3 flex flex-col gap-2 text-sm text-gray-600 bg-white border-t">
          {isLoginPage && (
            <>
              <span>Don’t have an account?</span>
              <Button
                variant="outline"
                size="sm"
                className="bg-emerald-50 hover:bg-emerald-100"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}

          {isSignupPage && (
            <>
              <span>Already have an account?</span>
              <Button
                variant="outline"
                size="sm"
                className="bg-emerald-50 hover:bg-emerald-100"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
