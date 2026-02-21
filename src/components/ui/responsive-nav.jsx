import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ResponsiveNav({ navItems = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden sm:block">
        <ul className="flex justify-center space-x-8">
          {navItems.map(({ label, to }, idx) => (
            <li key={idx}>
              <Link to={to} className="text-slate-500 hover:text-gray-900 text-sm font-medium font-manrope">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Hamburger for mobile (sm only) */}
      <div className="block sm:hidden relative">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded focus:outline-none group">
          <Menu size={20} className="text-gray-600 group-hover:text-gray-100 transition-colors" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
            <ul className="flex flex-col space-y-2 p-4">
              {navItems.map(({ label, to }, idx) => (
                <li key={idx}>
                  <Link
                    to={to}
                    className="text-slate-500 hover:text-gray-900 text-sm font-medium font-manrope"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
