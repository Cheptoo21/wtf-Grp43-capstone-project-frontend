import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
} from "lucide-react"
import Logo from "@/components/Logo/logo"
import { useAuth } from "@/context/AuthContext"

export default function Sidebar({onClose}) {
  const { user } = useAuth() || {}
  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col">
      
     
      <div className="px-6 py-4 border-b">
        <Logo />
      </div>

      
      <nav className="flex-1 px-4 py-6 space-y-2">
        <SidebarItem
          to="/dashboard"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
        />
        <SidebarItem
          to="/Ledger"
          icon={<BookOpen size={18} />}
          label="Ledger"
        />
        <SidebarItem
          to="/analytics"
          icon={<BarChart3 size={18} />}
          label="Analytics"
        />
        <SidebarItem
          to="/settings"
          icon={<Settings size={18} />}
          label="Settings"
        />
      </nav>

      
       <div className="px-4 py-4 border-t">
        {user && (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL || "https://i.pravatar.cc/40"}
              alt="User"
              className="h-10 w-10 rounded-full"
            />
            <div className="text-sm">
              <p className="font-medium text-gray-800">
                {user.displayName || "User"}
              </p>
              <p className="text-xs text-gray-500">Premium Plan</p>
            </div>
          </div>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>
      )}
    </aside>
  )
}

function SidebarItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          isActive
            ? "bg-emerald-50 text-emerald-600"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}