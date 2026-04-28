import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FileText, Mail, Lock, ArrowRight } from 'lucide-react'
import api from '../services/api'
import { saveToken } from '../services/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      saveToken(res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Side */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#1E3A5F] to-[#2d5a8e] flex-col justify-center items-center p-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
            <FileText size={24} className="text-[#1E3A5F]" />
          </div>
          <span className="text-white text-3xl font-bold">PayTrack</span>
        </div>
        <img
          src="/images/login.svg"
          alt="Secure Login"
          className="w-72 mb-8"
        />
        <h2 className="text-white text-2xl font-semibold text-center mb-4">
          Invoice Smart.<br />Get Paid Fast.
        </h2>
        <p className="text-blue-200 text-center max-w-xs">
          Manage invoices, track payments, and grow your freelance business with confidence.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-[#1E3A5F] rounded-lg flex items-center justify-center">
              <FileText size={16} className="text-white" />
            </div>
            <span className="text-[#1E3A5F] font-bold text-xl">PayTrack</span>
          </div>

          <h1 className="text-2xl font-bold text-[#1E3A5F] mb-2">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">Sign in to your PayTrack account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
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
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E3A5F] text-white py-3 rounded-xl hover:bg-[#162d4a] font-medium flex items-center justify-center gap-2 transition"
            >
              Sign In <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#1E3A5F] font-medium hover:underline">
              Create one
            </Link>
          </p>

          <p className="text-center text-sm text-slate-400 mt-4">
            <Link to="/" className="hover:text-[#1E3A5F] transition">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login