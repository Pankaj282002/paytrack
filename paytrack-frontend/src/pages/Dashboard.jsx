import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LayoutDashboard, FileText, CreditCard, AlertCircle, Clock, LogOut, Plus, User } from 'lucide-react'
import api from '../services/api'
import { removeToken } from '../services/auth'

const Dashboard = () => {
  const [summary, setSummary] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/dashboard')
      .then(res => setSummary(res.data))
      .catch(() => navigate('/login'))
  }, [])

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  const getStatusClass = (status) => {
    if (status === 'PAID') return 'bg-emerald-100 text-emerald-700'
    if (status === 'PENDING') return 'bg-amber-100 text-amber-700'
    if (status === 'OVERDUE') return 'bg-red-100 text-red-600'
    return ''
  }

  if (!summary) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-[#1E3A5F] font-medium">Loading...</div>
    </div>
  )

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
          <Link to="/invoices" className="text-blue-200 hover:text-white text-sm flex items-center gap-1 transition">
            <FileText size={15} />
            Invoices
          </Link>
          <Link to="/docs" className="text-blue-200 hover:text-white text-sm flex items-center gap-1 transition">
            <LayoutDashboard size={15} />
            Docs
          </Link>
          <Link to="/profile" className="text-blue-200 hover:text-white text-sm flex items-center gap-1 transition">
            <User size={15} />
            Profile
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

      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1E3A5F]">Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Welcome back! Here's your financial overview.</p>
          </div>
          <Link
            to="/invoices/create"
            className="bg-[#1E3A5F] text-white px-5 py-2.5 rounded-lg hover:bg-[#162d4a] flex items-center gap-2 text-sm font-medium transition"
          >
            <Plus size={16} />
            Create Invoice
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-sm">Total Invoices</p>
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText size={18} className="text-[#1E3A5F]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1E3A5F]">{summary.totalInvoices}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-sm">Paid</p>
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                <CreditCard size={18} className="text-emerald-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-emerald-600">₹{summary.totalPaid}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-sm">Pending</p>
              <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center">
                <Clock size={18} className="text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-amber-600">₹{summary.totalPending}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-sm">Overdue</p>
              <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertCircle size={18} className="text-red-500" />
              </div>
            </div>
            <p className="text-3xl font-bold text-red-500">₹{summary.totalOverdue}</p>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-[#1E3A5F]">Recent Invoices</h2>
            <Link to="/invoices" className="text-sm text-[#1E3A5F] hover:underline font-medium">
              View All
            </Link>
          </div>

          {summary.recentInvoices.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              <p>No invoices yet. Create your first invoice!</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 text-xs uppercase tracking-wide border-b border-slate-100">
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentInvoices.map(invoice => (
                  <tr key={invoice.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-medium text-slate-700">{invoice.clientName}</td>
                    <td className="px-6 py-4 font-semibold text-[#1E3A5F]">₹{invoice.amount}</td>
                    <td className="px-6 py-4 text-slate-500">{invoice.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard