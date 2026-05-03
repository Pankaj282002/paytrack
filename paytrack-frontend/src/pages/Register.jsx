import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FileText, Mail, Lock, User, ArrowRight, Menu, X } from 'lucide-react'
import api from '../services/api'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await api.post('/auth/register', { name, email, password })
      navigate('/login')
    } catch (err) {
      setError('Registration failed. Try again.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1E3A5F] rounded-lg flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-[#1E3A5F]">PayTrack</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/docs" className="text-slate-600 hover:text-[#1E3A5F] text-sm font-medium">Docs</Link>
            <Link to="/login" className="bg-[#1E3A5F] text-white px-5 py-2 rounded-lg hover:bg-[#162d4a] text-sm font-medium transition">
              Login
            </Link>
          </div>
          <button className="md:hidden text-[#1E3A5F]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 border-t border-slate-100 pt-4 flex flex-col gap-3 max-w-6xl mx-auto">
            <Link to="/docs" onClick={() => setIsOpen(false)} className="text-slate-600 text-sm font-medium py-1">Docs</Link>
            <Link to="/login" onClick={() => setIsOpen(false)} className="bg-[#1E3A5F] text-white px-5 py-2 rounded-lg text-sm font-medium text-center">
              Login
            </Link>
          </div>
        )}
      </nav>

      <div className="flex min-h-[calc(100vh-65px)]">
        {/* Left Side - Desktop only */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#1E3A5F] to-[#2d5a8e] flex-col justify-center items-center p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
              <FileText size={24} className="text-[#1E3A5F]" />
            </div>
            <span className="text-white text-3xl font-bold">PayTrack</span>
          </div>
          <img src="/images/register.svg" alt="Register" className="w-72 mb-8" />
          <h2 className="text-white text-2xl font-semibold text-center mb-4">
            Join PayTrack Today
          </h2>
          <p className="text-blue-200 text-center max-w-xs">
            Create your free account and start managing invoices and payments professionally.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold text-[#1E3A5F] mb-2">Create Account</h1>
            <p className="text-slate-500 text-sm mb-8">Sign up for free — no credit card required</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="mb-5">
                <label className="block text-slate-600 text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-slate-600 text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-slate-600 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E3A5F] text-white py-3 rounded-xl hover:bg-[#162d4a] font-medium flex items-center justify-center gap-2 transition"
              >
                Create Account <ArrowRight size={16} />
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-[#1E3A5F] font-medium hover:underline">
                Sign in
              </Link>
            </p>
            <p className="text-center text-sm text-slate-400 mt-3">
              <Link to="/" className="hover:text-[#1E3A5F] transition">← Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register