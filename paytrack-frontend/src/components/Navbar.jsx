import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, Menu, X, LayoutDashboard, User, LogOut, BookOpen } from 'lucide-react'
import { removeToken } from '../services/auth'

const Navbar = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <nav className="bg-[#1E3A5F] px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
            <FileText size={15} className="text-[#1E3A5F]" />
          </div>
          <span className="text-white font-bold text-lg">PayTrack</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-blue-200 hover:text-white text-sm flex items-center gap-1 transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="text-blue-200 hover:text-red-400 text-sm flex items-center gap-1 transition"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 border-t border-blue-800 pt-4 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="text-blue-200 hover:text-white text-sm flex items-center gap-2 px-2 py-1 transition"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="text-blue-200 hover:text-red-400 text-sm flex items-center gap-2 px-2 py-1 transition"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar