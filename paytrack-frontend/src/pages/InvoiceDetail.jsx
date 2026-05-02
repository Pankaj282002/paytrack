import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FileText, CreditCard, Pencil, Plus, User, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import api from '../services/api'
import Navbar from '../components/Navbar'

const getCurrencySymbol = (currency) => {
  if (currency === 'USD') return '$'
  if (currency === 'EUR') return '€'
  if (currency === 'GBP') return '£'
  if (currency === 'AED') return 'د.إ'
  return '₹'
}

const InvoiceDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [invoice, setInvoice] = useState(null)
  const [payments, setPayments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    paidAmount: '',
    paidDate: '',
    paymentMode: 'UPI',
    note: ''
  })

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <FileText size={15} /> },
    { to: '/invoices', label: 'Invoices', icon: <FileText size={15} /> },
    { to: '/profile', label: 'Profile', icon: <User size={15} /> },
  ]

  useEffect(() => {
    api.get(`/invoices/${id}`)
      .then(res => setInvoice(res.data))
      .catch(() => navigate('/invoices'))

    api.get(`/invoices/${id}/payments`)
      .then(res => setPayments(res.data))
  }, [id])

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()

    const enteredAmount = parseFloat(paymentForm.paidAmount)
    if (enteredAmount > remaining) {
      alert(`Payment amount cannot exceed remaining amount of ${symbol}${remaining.toFixed(2)}`)
      return
    }
    if (enteredAmount <= 0) {
      alert('Payment amount must be greater than 0')
      return
    }

    try {
      const res = await api.post(`/invoices/${id}/payments`, paymentForm)
      const updatedPayments = [...payments, res.data]
      setPayments(updatedPayments)
      setShowForm(false)
      setPaymentForm({ paidAmount: '', paidDate: '', paymentMode: 'UPI', note: '' })
      const invoiceRes = await api.get(`/invoices/${id}`)
      setInvoice(invoiceRes.data)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add payment')
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

  const symbol = getCurrencySymbol(invoice.currency)
  const totalPaid = payments.reduce((sum, p) => sum + Math.round(parseFloat(p.paidAmount) * 100), 0) / 100
  const advanceAmount = Math.round(parseFloat(invoice.advanceAmount || 0) * 100) / 100
  const totalPaidWithAdvance = Math.round((totalPaid + advanceAmount) * 100) / 100
  const remaining = Math.round((parseFloat(invoice.amount || 0) - totalPaidWithAdvance) * 100) / 100
  const statusConfig = getStatusConfig(invoice.status)

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar links={navLinks} />

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#1E3A5F]">Invoice #{invoice.id}</h1>
            <p className="text-slate-500 text-sm mt-1">Invoice details and payment history.</p>
          </div>
          <Link
            to={`/invoices/${id}/edit`}
            className="border border-[#1E3A5F] text-[#1E3A5F] px-3 md:px-4 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-sm font-medium transition"
          >
            <Pencil size={15} />
            <span className="hidden md:inline">Edit Invoice</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-8 mb-6">
          <div className="flex justify-between items-start mb-5">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Client</p>
              <p className="text-lg md:text-xl font-semibold text-[#1E3A5F]">{invoice.clientName}</p>
              <p className="text-slate-500 text-sm">{invoice.clientEmail}</p>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.class}`}>
              {statusConfig.icon}
              {invoice.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-5 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Total Amount</p>
              <p className="text-xl md:text-2xl font-bold text-[#1E3A5F]">{symbol}{invoice.amount}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Advance Paid</p>
              <p className="text-xl md:text-2xl font-bold text-blue-600">{symbol}{advanceAmount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Total Paid</p>
              <p className="text-xl md:text-2xl font-bold text-emerald-600">{symbol}{totalPaidWithAdvance.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Remaining</p>
              <p className={`text-xl md:text-2xl font-bold ${remaining <= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {symbol}{remaining.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Due Date</p>
              <p className="text-base md:text-lg font-semibold text-slate-700">{invoice.dueDate}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Currency</p>
              <p className="text-base md:text-lg font-semibold text-slate-700">{invoice.currency}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-8">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-base md:text-lg font-semibold text-[#1E3A5F]">Payment History</h2>
              <p className="text-slate-400 text-sm">{payments.length} payment(s) recorded</p>
            </div>
            {invoice.status !== 'PAID' && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-emerald-500 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-emerald-600 flex items-center gap-2 text-sm font-medium transition"
              >
                <Plus size={15} />
                <span className="hidden md:inline">Add Payment</span>
                <span className="md:hidden">Add</span>
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handlePaymentSubmit} className="bg-slate-50 rounded-xl p-4 md:p-6 mb-6 border border-slate-100">
              <h3 className="font-medium text-[#1E3A5F] mb-4">New Payment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-2">Amount ({symbol})</label>
                  <input
                    type="number"
                    value={paymentForm.paidAmount}
                    onChange={e => setPaymentForm({...paymentForm, paidAmount: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E3A5F] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={paymentForm.paidDate}
                    onChange={e => setPaymentForm({...paymentForm, paidDate: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#1E3A5F] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 text-sm font-medium mb-2">Payment Mode</label>
                  <select
                    value={paymentForm.paymentMode}
                    onChange={e => setPaymentForm({...paymentForm, paymentMode: e.target.value})}
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
                    onChange={e => setPaymentForm({...paymentForm, note: e.target.value})}
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

          {payments.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard size={40} className="mx-auto mb-3 text-slate-300" />
              <p className="text-slate-400">No payments recorded yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 text-xs uppercase tracking-wide border-b border-slate-100">
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Mode</th>
                    <th className="hidden md:table-cell pb-3">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(payment => (
                    <tr key={payment.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                      <td className="py-3 font-semibold text-emerald-600">{symbol}{payment.paidAmount}</td>
                      <td className="py-3 text-slate-500">{payment.paidDate}</td>
                      <td className="py-3">
                        <span className="bg-blue-50 text-[#1E3A5F] px-2 py-1 rounded-lg text-xs font-medium">
                          {payment.paymentMode}
                        </span>
                      </td>
                      <td className="hidden md:table-cell py-3 text-slate-400">{payment.note || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetail