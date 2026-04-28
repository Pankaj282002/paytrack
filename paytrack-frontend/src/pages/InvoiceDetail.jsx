import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FileText, CreditCard, Pencil, Plus, LogOut, User, LayoutDashboard, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import api from '../services/api'
import { removeToken } from '../services/auth'

const InvoiceDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [invoice, setInvoice] = useState(null)
  const [payments, setPayments] = useState([])
  const totalPaid = payments.reduce((sum, p) => sum + parseFloat(p.paidAmount), 0)
const remaining = parseFloat(invoice?.amount || 0) - totalPaid
  const [showForm, setShowForm] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    paidAmount: '',
    paidDate: '',
    paymentMode: 'UPI',
    note: ''
  })

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  useEffect(() => {
    api.get(`/invoices/${id}`)
      .then(res => setInvoice(res.data))
      .catch(() => navigate('/invoices'))

    api.get(`/invoices/${id}/payments`)
      .then(res => setPayments(res.data))
  }, [id])

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post(`/invoices/${id}/payments`, paymentForm)
      setPayments([...payments, res.data])
      setShowForm(false)
      setPaymentForm({ paidAmount: '', paidDate: '', paymentMode: 'UPI', note: '' })
    } catch (err) {
      alert('Failed to add payment')
    }
  }

  const getStatusConfig = (status) => {
    if (status === 'PAID') return { class: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle size={14} /> }
    if (status === 'PENDING') return { class: 'bg-amber-100 text-amber-700', icon: <Clock size={14} /> }
    if (status === 'OVERDUE') return { class: 'bg-red-100 text-red-600', icon: <AlertCircle size={14} /> }
    return { class: '', icon: null }
  }

  if (!invoice) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-[#1E3A5F] font-medium">Loading...</div>
    </div>
  )

  const statusConfig = getStatusConfig(invoice.status)

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

      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1E3A5F]">Invoice #{invoice.id}</h1>
            <p className="text-slate-500 text-sm mt-1">Invoice details and payment history.</p>
          </div>
          <Link
            to={`/invoices/${id}/edit`}
            className="border border-[#1E3A5F] text-[#1E3A5F] px-4 py-2.5 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-sm font-medium transition"
          >
            <Pencil size={15} />
            Edit Invoice
          </Link>
        </div>

        {/* Invoice Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Client</p>
              <p className="text-xl font-semibold text-[#1E3A5F]">{invoice.clientName}</p>
              <p className="text-slate-500 text-sm">{invoice.clientEmail}</p>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.class}`}>
              {statusConfig.icon}
              {invoice.status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-[#1E3A5F]">
                {invoice.currency === 'USD' ? '$' :
                  invoice.currency === 'EUR' ? '€' :
                    invoice.currency === 'GBP' ? '£' :
                      invoice.currency === 'AED' ? 'د.إ' : '₹'}
                {invoice.amount}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Total Paid</p>
              <p className="text-2xl font-bold text-emerald-600">
                {invoice.currency === 'USD' ? '$' :
                  invoice.currency === 'EUR' ? '€' :
                    invoice.currency === 'GBP' ? '£' :
                      invoice.currency === 'AED' ? 'د.إ' : '₹'}
                {totalPaid.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Remaining</p>
              <p className={`text-2xl font-bold ${remaining <= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {invoice.currency === 'USD' ? '$' :
                  invoice.currency === 'EUR' ? '€' :
                    invoice.currency === 'GBP' ? '£' :
                      invoice.currency === 'AED' ? 'د.إ' : '₹'}
                {remaining.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Due Date</p>
              <p className="text-lg font-semibold text-slate-700">{invoice.dueDate}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Currency</p>
              <p className="text-lg font-semibold text-slate-700">{invoice.currency}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Created</p>
              <p className="text-lg font-semibold text-slate-700">
                {new Date(invoice.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Payments Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-[#1E3A5F]">Payment History</h2>
              <p className="text-slate-400 text-sm">{payments.length} payment(s) recorded</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-emerald-500 text-white px-4 py-2.5 rounded-lg hover:bg-emerald-600 flex items-center gap-2 text-sm font-medium transition"
            >
              <Plus size={15} />
              Add Payment
            </button>
          </div>

          {/* Add Payment Form */}
          {showForm && (
            <form onSubmit={handlePaymentSubmit} className="bg-slate-50 rounded-xl p-6 mb-6 border border-slate-100">
              <h3 className="font-medium text-[#1E3A5F] mb-4">New Payment</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-2">Amount (₹)</label>
                  <input
                    type="number"
                    value={paymentForm.paidAmount}
                    onChange={e => setPaymentForm({ ...paymentForm, paidAmount: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E3A5F] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={paymentForm.paidDate}
                    onChange={e => setPaymentForm({ ...paymentForm, paidDate: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E3A5F] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-2">Payment Mode</label>
                  <select
                    value={paymentForm.paymentMode}
                    onChange={e => setPaymentForm({ ...paymentForm, paymentMode: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E3A5F] transition"
                  >
                    <option value="UPI">UPI</option>
                    <option value="CASH">Cash</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                    <option value="CARD">Card</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-2">Note (Optional)</label>
                  <input
                    type="text"
                    value={paymentForm.note}
                    onChange={e => setPaymentForm({ ...paymentForm, note: e.target.value })}
                    placeholder="Add a note"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E3A5F] transition"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-[#1E3A5F] text-white px-6 py-2.5 rounded-xl hover:bg-[#162d4a] text-sm font-medium transition"
                >
                  Save Payment
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl hover:bg-slate-50 text-sm transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Payment List */}
          {payments.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard size={40} className="mx-auto mb-3 text-slate-300" />
              <p className="text-slate-400">No payments recorded yet.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 text-xs uppercase tracking-wide border-b border-slate-100">
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Mode</th>
                  <th className="pb-3">Note</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                    <td className="py-3 font-semibold text-emerald-600">₹{payment.paidAmount}</td>
                    <td className="py-3 text-slate-500">{payment.paidDate}</td>
                    <td className="py-3">
                      <span className="bg-blue-50 text-[#1E3A5F] px-2 py-1 rounded-lg text-xs font-medium">
                        {payment.paymentMode}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400">{payment.note || '—'}</td>
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

export default InvoiceDetail