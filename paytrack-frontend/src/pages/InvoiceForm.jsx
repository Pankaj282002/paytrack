import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { FileText, User, BookOpen } from 'lucide-react'
import api from '../services/api'
import Navbar from '../components/Navbar'

const InvoiceForm = () => {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()

  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    amount: '',
    dueDate: '',
    status: 'PENDING',
    currency: 'INR',
    advanceAmount: ''
  })
  const [error, setError] = useState('')

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <FileText size={15} /> },
    { to: '/invoices', label: 'Invoices', icon: <FileText size={15} /> },
    { to: '/profile', label: 'Profile', icon: <User size={15} /> },
  ]

  useEffect(() => {
    if (isEdit) {
      api.get(`/invoices/${id}`)
        .then(res => {
          const inv = res.data
          setForm({
            clientName: inv.clientName,
            clientEmail: inv.clientEmail,
            amount: inv.amount,
            dueDate: inv.dueDate,
            status: inv.status,
            currency: inv.currency || 'INR',
            advanceAmount: inv.advanceAmount || ''
          })
        })
        .catch(() => navigate('/invoices'))
    }
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEdit) {
        await api.put(`/invoices/${id}`, form)
      } else {
        await api.post('/invoices', form)
      }
      navigate('/invoices')
    } catch (err) {
      setError('Something went wrong. Try again.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar links={navLinks} />

      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-[#1E3A5F]">
            {isEdit ? 'Edit Invoice' : 'Create Invoice'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isEdit ? 'Update invoice details below.' : 'Fill in the details to create a new invoice.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-slate-600 text-sm font-medium mb-2">Client Name</label>
              <input
                type="text"
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                placeholder="Enter client name"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block text-slate-600 text-sm font-medium mb-2">Client Email</label>
              <input
                type="email"
                name="clientEmail"
                value={form.clientEmail}
                onChange={handleChange}
                placeholder="Enter client email"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition"
              />
            </div>

            <div className="mb-5">
              <label className="block text-slate-600 text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block text-slate-600 text-sm font-medium mb-2">Currency</label>
              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AED">AED (د.إ)</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-slate-600 text-sm font-medium mb-2">Advance Amount (Optional)</label>
              <input
                type="number"
                name="advanceAmount"
                value={form.advanceAmount}
                onChange={handleChange}
                placeholder="Enter advance amount if any"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition"
              />
            </div>

            <div className="mb-5">
              <label className="block text-slate-600 text-sm font-medium mb-2">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition"
                required
              />
            </div>

            {isEdit && (
              <div className="mb-5">
                <label className="block text-slate-600 text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F] transition"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PAID">PAID</option>
                  <option value="OVERDUE">OVERDUE</option>
                </select>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 bg-[#1E3A5F] text-white py-3 rounded-xl hover:bg-[#162d4a] font-medium transition"
              >
                {isEdit ? 'Update Invoice' : 'Create Invoice'}
              </button>
              <Link
                to="/invoices"
                className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl hover:bg-slate-50 font-medium transition text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InvoiceForm