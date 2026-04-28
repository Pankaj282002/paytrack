import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, User, LogOut, LayoutDashboard, Mail, Shield, Calendar } from 'lucide-react'
import { removeToken } from '../services/auth'

const Profile = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      setUser({ email: payload.sub })
    }
  }, [])

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-[#1E3A5F] px-8 py-4 flex justify-between items-center shadow-lg">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
            <FileText size={15} className="text-[#1E3A5F]" />
          </div>
          <span className="text-white font-bold text-lg">PayTrack</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-blue-200 hover:text-white text-sm flex items-center gap-1 transition">
            <LayoutDashboard size={15} />
            Dashboard
          </Link>
          <Link to="/invoices" className="text-blue-200 hover:text-white text-sm flex items-center gap-1 transition">
            <FileText size={15} />
            Invoices
          </Link>
          <Link to="/docs" className="text-blue-200 hover:text-white text-sm flex items-center gap-1 transition">
            <FileText size={15} />
            Docs
          </Link>
          <button
            onClick={handleLogout}
            className="text-blue-200 hover:text-red-400 text-sm flex items-center gap-1 transition"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1E3A5F]">Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Your account information.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#1E3A5F] to-[#2d5a8e] rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-md">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1E3A5F]">{user?.email}</h2>
              <p className="text-slate-400 text-sm mt-1">PayTrack User</p>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mt-2 inline-block">
                Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Mail size={18} className="text-[#1E3A5F]" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Email</p>
                <p className="text-slate-700 font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <Shield size={18} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Security</p>
                <p className="text-slate-700 font-medium">JWT Authenticated — BCrypt Password</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                <Calendar size={18} className="text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Plan</p>
                <p className="text-slate-700 font-medium">Free — v1.0.0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2d5a8e] rounded-2xl p-6 text-center">
          <User size={32} className="text-blue-300 mx-auto mb-3" />
          <h3 className="text-white font-semibold mb-1">More Features Coming in v1.1.0</h3>
          <p className="text-blue-200 text-sm">Change password, update profile, and more.</p>
        </div>
      </div>
    </div>
  )
}

export default Profile