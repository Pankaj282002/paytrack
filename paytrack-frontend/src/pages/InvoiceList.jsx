import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, Plus, Eye, Pencil, Trash2, User, BookOpen } from 'lucide-react'
import api from '../services/api'
import Navbar from '../components/Navbar'

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <FileText size={15} /> },
    { to: '/docs', label: 'Docs', icon: <BookOpen size={15} /> },
    { to: '/profile', label: 'Profile', icon: <User size={15} /> },
  ]

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
      <Navbar links={navLinks} />

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#1E3A5F]">Invoices</h1>
            <p className="text-slate-500 text-sm mt-1">Manage all your invoices here.</p>
          </div>
          <Link
            to="/invoices/create"
            className="bg-[#1E3A5F] text-white px-3 md:px-5 py-2 rounded-lg hover:bg-[#162d4a] flex items-center gap-2 text-sm font-medium transition"
          >
            <Plus size={16} />
            <span className="hidden md:inline">Create Invoice</span>
            <span className="md:hidden">New</span>
          </Link>
        </div>

        {invoices.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-16 text-center">
            <FileText size={48} className="mx-auto mb-4 text-slate-300" />
            <p className="text-slate-400">No invoices yet. Create your first invoice!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 text-xs uppercase tracking-wide border-b border-slate-100">
                    <th className="px-4 md:px-6 py-4">Client</th>
                    <th className="px-4 md:px-6 py-4">Amount</th>
                    <th className="hidden md:table-cell px-6 py-4">Due Date</th>
                    <th className="px-4 md:px-6 py-4">Status</th>
                    <th className="px-4 md:px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(invoice => (
                    <tr key={invoice.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                      <td className="px-4 md:px-6 py-3 font-medium text-slate-700">{invoice.clientName}</td>
                      <td className="px-4 md:px-6 py-3 font-semibold text-[#1E3A5F]">
                        {invoice.currency === 'USD' ? '$' :
                          invoice.currency === 'EUR' ? '€' :
                            invoice.currency === 'GBP' ? '£' :
                              invoice.currency === 'AED' ? 'د.إ' : '₹'}
                        {invoice.amount}
                      </td>
                      <td className="hidden md:table-cell px-6 py-3 text-slate-500">{invoice.dueDate}</td>
                      <td className="px-4 md:px-6 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3">
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
          </div>
        )}
      </div>
    </div>
  )
}

export default InvoiceList