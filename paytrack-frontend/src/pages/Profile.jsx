import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, User, Mail, Shield, Calendar, BookOpen } from 'lucide-react'
import { removeToken } from '../services/auth'
import Navbar from '../components/Navbar'

const Profile = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <FileText size={15} /> },
    { to: '/invoices', label: 'Invoices', icon: <FileText size={15} /> },
    { to: '/docs', label: 'Docs', icon: <BookOpen size={15} /> },
  ]

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      setUser({ email: payload.sub })
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar links={navLinks} />

      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-[#1E3A5F]">Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Your account information.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 mb-6">
          <div className="flex items-center gap-4 md:gap-6 mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#1E3A5F] to-[#2d5a8e] rounded-2xl flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-md shrink-0">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#1E3A5F]">{user?.email}</h2>
              <p className="text-slate-400 text-sm mt-1">PayTrack User</p>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mt-2 inline-block">
                Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Mail size={18} className="text-[#1E3A5F]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400 uppercase tracking-wide">Email</p>
                <p className="text-slate-700 font-medium truncate">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                <Shield size={18} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Security</p>
                <p className="text-slate-700 font-medium text-sm">JWT Authenticated — BCrypt Password</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center shrink-0">
                <Calendar size={18} className="text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Plan</p>
                <p className="text-slate-700 font-medium">Free — v1.0.0</p>
              </div>
            </div>
          </div>
        </div>

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