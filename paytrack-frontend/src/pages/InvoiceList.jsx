import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, Plus, Eye, Pencil, Trash2, LogOut, User, LayoutDashboard } from 'lucide-react'
import api from '../services/api'
import { removeToken } from '../services/auth'

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/invoices')
      .then(res => {
        setInvoices(res.data)
        setLoading(false)
      })
      .catch(() => navigate('/login'))
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Delete this invoice?')) {
      await api.delete(`/invoices/${id}`)
      setInvoices(invoices.filter(inv => inv.id !== id))
    }
  }

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

  if (loading) return (
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
          <Link to="/dashboard" className="text-blue-200 hover:text-white text-sm flex items-center gap-1 transition">
            <LayoutDashboard size={15} />
            Dashboard
          </Link>
          <Link to="/docs" className="text-blue-200 hover:text-white text-sm flex items-center gap-1 transition">
            <FileText size={15} />
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1E3A5F]">Invoices</h1>
            <p className="text-slate-500 text-sm mt-1">Manage all your invoices here.</p>
          </div>
          <Link
            to="/invoices/create"
            className="bg-[#1E3A5F] text-white px-5 py-2.5 rounded-lg hover:bg-[#162d4a] flex items-center gap-2 text-sm font-medium transition"
          >
            <Plus size={16} />
            Create Invoice
          </Link>
        </div>

        {invoices.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-16 text-center">
            <FileText size={48} className="mx-auto mb-4 text-slate-300" />
            <p className="text-slate-400">No invoices yet. Create your first invoice!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 text-xs uppercase tracking-wide border-b border-slate-100">
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(invoice => (
                  <tr key={invoice.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-medium text-slate-700">{invoice.clientName}</td>
                    <td className="px-6 py-4 font-semibold text-[#1E3A5F]">₹{invoice.amount}</td>
                    <td className="px-6 py-4 text-slate-500">{invoice.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link to={`/invoices/${invoice.id}`} className="text-[#1E3A5F] hover:text-blue-700 transition">
                          <Eye size={16} />
                        </Link>
                        <Link to={`/invoices/${invoice.id}/edit`} className="text-amber-500 hover:text-amber-700 transition">
                          <Pencil size={16} />
                        </Link>
                        <button onClick={() => handleDelete(invoice.id)} className="text-red-400 hover:text-red-600 transition">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default InvoiceList