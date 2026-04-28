import { Link } from 'react-router-dom'
import { FileText, CreditCard, LayoutDashboard, Shield, HelpCircle, Code, ArrowRight, CheckCircle } from 'lucide-react'

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
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-[#1E3A5F] px-8 py-4 flex justify-between items-center shadow-lg">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
            <FileText size={15} className="text-[#1E3A5F]" />
          </div>
          <span className="text-white font-bold text-lg">PayTrack</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-blue-200 hover:text-white text-sm transition">Login</Link>
          <Link to="/register" className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 text-sm font-medium transition">
            Get Started
          </Link>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2d5a8e] py-16 px-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-3">Documentation</h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Everything you need to know about using PayTrack effectively.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <a href="#getting-started" className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center gap-3 hover:shadow-md transition text-center">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-[#1E3A5F]" />
            </div>
            <span className="text-sm font-medium text-slate-700">Getting Started</span>
          </a>
          <a href="#how-to-use" className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center gap-3 hover:shadow-md transition text-center">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <CreditCard size={20} className="text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">How to Use</span>
          </a>
          <a href="#api-reference" className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center gap-3 hover:shadow-md transition text-center">
            <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
              <Code size={20} className="text-violet-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">API Reference</span>
          </a>
          <a href="#faq" className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center gap-3 hover:shadow-md transition text-center">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <HelpCircle size={20} className="text-amber-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">FAQ</span>
          </a>
        </div>

        <section id="getting-started" className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <FileText size={20} className="text-[#1E3A5F]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1E3A5F]">1. Getting Started</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
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

        <section id="how-to-use" className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <LayoutDashboard size={20} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1E3A5F]">2. How to Use PayTrack</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <FileText size={20} className="text-[#1E3A5F]" />
              </div>
              <h3 className="font-semibold text-[#1E3A5F] mb-2">Create an Invoice</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Go to Invoices and click Create Invoice. Fill in client name, email, amount, and due date.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                <CreditCard size={20} className="text-emerald-600" />
              </div>
              <h3 className="font-semibold text-[#1E3A5F] mb-2">Add a Payment</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Open an invoice and click Add Payment. Enter paid amount, date, and payment mode.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle size={20} className="text-amber-600" />
              </div>
              <h3 className="font-semibold text-[#1E3A5F] mb-2">Update Invoice Status</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Open an invoice and click Edit Invoice. Change status to PENDING, PAID, or OVERDUE.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center mb-4">
                <LayoutDashboard size={20} className="text-violet-600" />
              </div>
              <h3 className="font-semibold text-[#1E3A5F] mb-2">View Dashboard</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Dashboard shows total invoices, paid, pending, overdue amounts and recent invoices.</p>
            </div>
          </div>
        </section>

        <section id="api-reference" className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
              <Code size={20} className="text-violet-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1E3A5F]">3. API Reference</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 text-xs uppercase tracking-wide border-b border-slate-100 bg-slate-50">
                  <th className="px-6 py-4">Method</th>
                  <th className="px-6 py-4">Endpoint</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Auth</th>
                </tr>
              </thead>
              <tbody>
                {apis.map(([method, endpoint, desc, auth], i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition">
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getMethodClass(method)}`}>
                        {method}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-mono text-xs text-slate-600">{endpoint}</td>
                    <td className="px-6 py-3 text-slate-500">{desc}</td>
                    <td className="px-6 py-3">
                      <span className={`text-xs font-medium ${auth === 'Yes' ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {auth === 'Yes' ? 'Required' : 'Public'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1E3A5F]">4. Authentication</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <p className="text-slate-600 text-sm mb-4">
              PayTrack uses JWT for authentication. After login, include the token in every API request:
            </p>
            <div className="bg-[#1E3A5F] rounded-xl p-4 font-mono text-sm text-emerald-400">
              Authorization: Bearer your_jwt_token_here
            </div>
            <p className="text-slate-400 text-xs mt-3">Token expires after 24 hours. Login again to get a fresh token.</p>
          </div>
        </section>

        <section id="faq" className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <HelpCircle size={20} className="text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1E3A5F]">5. FAQ</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(([q, a], i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="font-semibold text-[#1E3A5F] mb-2 flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500" />
                  {q}
                </h3>
                <p className="text-slate-500 text-sm pl-6">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2d5a8e] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-xl mb-2">Interactive API Docs</h3>
              <p className="text-blue-200 text-sm">Explore and test all APIs directly in Swagger UI.</p>
              <p className="text-blue-300 font-mono text-xs mt-2">http://localhost:8080/swagger-ui.html</p>
            </div>
            <a href="http://localhost:8080/swagger-ui.html" target="_blank" rel="noreferrer" className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 font-medium flex items-center gap-2 transition shrink-0">
              Open Swagger <ArrowRight size={16} />
            </a>
          </div>
        </section>

      </div>

      <footer className="bg-[#1E3A5F] py-8 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <FileText size={14} className="text-[#1E3A5F]" />
            </div>
            <span className="text-white font-semibold">PayTrack</span>
            <span className="text-blue-300 text-sm ml-2">v1.0.0</span>
          </div>
          <div className="flex gap-6 text-blue-300 text-sm">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/login" className="hover:text-white transition">Login</Link>
            <Link to="/register" className="hover:text-white transition">Register</Link>
          </div>
          <p className="text-blue-300 text-sm">Built with Spring Boot and React</p>
        </div>
      </footer>
    </div>
  )
}

export default Docs
