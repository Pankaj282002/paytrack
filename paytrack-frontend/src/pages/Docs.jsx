import { Link } from 'react-router-dom'
import { FileText, CreditCard, LayoutDashboard, Shield, HelpCircle, Code, ArrowRight, CheckCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'

const getMethodClass = (method) => {
  if (method === 'GET') return 'bg-emerald-100 text-emerald-700'
  if (method === 'POST') return 'bg-blue-100 text-blue-700'
  if (method === 'PUT') return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-600'
}

const apis = [
  ['POST', '/api/auth/register', 'Register new user', 'No'],
  ['POST', '/api/auth/login', 'Login and get JWT token', 'No'],
  ['GET', '/api/invoices', 'Get all invoices', 'Yes'],
  ['POST', '/api/invoices', 'Create new invoice', 'Yes'],
  ['GET', '/api/invoices/:id', 'Get invoice detail', 'Yes'],
  ['PUT', '/api/invoices/:id', 'Update invoice', 'Yes'],
  ['DELETE', '/api/invoices/:id', 'Delete invoice', 'Yes'],
  ['GET', '/api/invoices/:id/payments', 'Get payments', 'Yes'],
  ['POST', '/api/invoices/:id/payments', 'Add payment', 'Yes'],
  ['GET', '/api/dashboard', 'Get dashboard summary', 'Yes'],
]

const faqs = [
  ['Is PayTrack free?', 'Yes, PayTrack v1.0.0 is completely free to use.'],
  ['What payment modes are supported?', 'UPI, Cash, Bank Transfer, and Card.'],
  ['Can I have multiple invoices per client?', 'Yes, you can create unlimited invoices for any client.'],
  ['Is my data secure?', 'Yes, passwords are BCrypt hashed and all APIs are JWT protected.'],
]

const Docs = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-[#1E3A5F] px-6 py-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
              <FileText size={15} className="text-[#1E3A5F]" />
            </div>
            <span className="text-white font-bold text-lg">PayTrack</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/login" className="text-blue-200 hover:text-white text-sm transition">Login</Link>
            <Link to="/register" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 text-sm font-medium transition">
              Get Started
            </Link>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 border-t border-blue-800 pt-4 flex flex-col gap-3 max-w-5xl mx-auto">
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-blue-200 text-sm py-1">Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)} className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium text-center">
              Get Started
            </Link>
          </div>
        )}
      </nav>

      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2d5a8e] py-12 md:py-16 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Documentation</h1>
        <p className="text-blue-200 text-base md:text-lg max-w-xl mx-auto">
          Everything you need to know about using PayTrack effectively.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-12">
          {[
            { icon: <FileText size={20} className="text-[#1E3A5F]" />, label: 'Getting Started', href: '#getting-started', bg: 'bg-blue-50' },
            { icon: <CreditCard size={20} className="text-emerald-600" />, label: 'How to Use', href: '#how-to-use', bg: 'bg-emerald-50' },
            { icon: <Code size={20} className="text-violet-600" />, label: 'API Reference', href: '#api-reference', bg: 'bg-violet-50' },
            { icon: <HelpCircle size={20} className="text-amber-600" />, label: 'FAQ', href: '#faq', bg: 'bg-amber-50' },
          ].map((item) => (
            <a key={item.label} href={item.href} className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100 flex flex-col items-center gap-2 hover:shadow-md transition text-center">
              <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center`}>
                {item.icon}
              </div>
              <span className="text-xs md:text-sm font-medium text-slate-700">{item.label}</span>
            </a>
          ))}
        </div>

        <section id="getting-started" className="mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-[#1E3A5F]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F]">1. Getting Started</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6">
            {['Click Get Started on the homepage.', 'Register with your name, email, and password.', 'Login to access your Dashboard.', 'Start creating invoices from the Dashboard or Invoices page.'].map((step, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-slate-50 last:border-0">
                <div className="w-7 h-7 bg-[#1E3A5F] text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </div>
                <p className="text-slate-600 text-sm pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-to-use" className="mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <LayoutDashboard size={20} className="text-emerald-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F]">2. How to Use PayTrack</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: <FileText size={20} className="text-[#1E3A5F]" />, bg: 'bg-blue-50', title: 'Create an Invoice', desc: 'Go to Invoices and click Create Invoice. Fill in client name, email, amount, and due date.' },
              { icon: <CreditCard size={20} className="text-emerald-600" />, bg: 'bg-emerald-50', title: 'Add a Payment', desc: 'Open an invoice and click Add Payment. Enter paid amount, date, and payment mode.' },
              { icon: <CheckCircle size={20} className="text-amber-600" />, bg: 'bg-amber-50', title: 'Update Invoice Status', desc: 'Open an invoice and click Edit Invoice. Change status to PENDING, PAID, or OVERDUE.' },
              { icon: <LayoutDashboard size={20} className="text-violet-600" />, bg: 'bg-violet-50', title: 'View Dashboard', desc: 'Dashboard shows total invoices, paid, pending, overdue amounts and recent invoices.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6">
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="font-semibold text-[#1E3A5F] mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="api-reference" className="mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
              <Code size={20} className="text-violet-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F]">3. API Reference</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 text-xs uppercase tracking-wide border-b border-slate-100 bg-slate-50">
                    <th className="px-4 md:px-6 py-4">Method</th>
                    <th className="px-4 md:px-6 py-4">Endpoint</th>
                    <th className="hidden md:table-cell px-6 py-4">Description</th>
                    <th className="px-4 md:px-6 py-4">Auth</th>
                  </tr>
                </thead>
                <tbody>
                  {apis.map(([method, endpoint, desc, auth], i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition">
                      <td className="px-4 md:px-6 py-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getMethodClass(method)}`}>
                          {method}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3 font-mono text-xs text-slate-600">{endpoint}</td>
                      <td className="hidden md:table-cell px-6 py-3 text-slate-500">{desc}</td>
                      <td className="px-4 md:px-6 py-3">
                        <span className={`text-xs font-medium ${auth === 'Yes' ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {auth === 'Yes' ? 'Required' : 'Public'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-slate-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F]">4. Authentication</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6">
            <p className="text-slate-600 text-sm mb-4">
              PayTrack uses JWT for authentication. After login, include the token in every API request:
            </p>
            <div className="bg-[#1E3A5F] rounded-xl p-4 font-mono text-xs md:text-sm text-emerald-400 overflow-x-auto">
              Authorization: Bearer your_jwt_token_here
            </div>
            <p className="text-slate-400 text-xs mt-3">Token expires after 24 hours. Login again to get a fresh token.</p>
          </div>
        </section>

        <section id="faq" className="mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <HelpCircle size={20} className="text-amber-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1E3A5F]">5. FAQ</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(([q, a], i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-6">
                <h3 className="font-semibold text-[#1E3A5F] mb-2 flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  {q}
                </h3>
                <p className="text-slate-500 text-sm pl-6">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 md:mb-12">
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2d5a8e] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold text-lg md:text-xl mb-2">Interactive API Docs</h3>
              <p className="text-blue-200 text-sm">Explore and test all APIs directly in Swagger UI.</p>
              <p className="text-blue-300 font-mono text-xs mt-2">paytrack-backend-44s7.onrender.com/swagger-ui.html</p>
            </div>
            <a
              href="https://paytrack-backend-44s7.onrender.com/swagger-ui.html"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 text-white px-5 md:px-6 py-3 rounded-xl hover:bg-emerald-600 font-medium flex items-center gap-2 transition shrink-0"
            >
              Open Swagger <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </div>

      <footer className="bg-[#1E3A5F] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <FileText size={14} className="text-[#1E3A5F]" />
            </div>
            <span className="text-white font-semibold">PayTrack</span>
            <span className="text-blue-300 text-sm ml-2">v1.0.0</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-blue-300 text-sm">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/login" className="hover:text-white transition">Login</Link>
            <Link to="/register" className="hover:text-white transition">Register</Link>
          </div>
          <p className="text-blue-300 text-sm">Built with Spring Boot & React</p>
        </div>
      </footer>
    </div>
  )
}

export default Docs