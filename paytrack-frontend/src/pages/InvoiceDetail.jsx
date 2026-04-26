import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

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

  const getStatusClass = (status) => {
    if (status === 'PAID') return 'bg-green-100 text-green-600'
    if (status === 'PENDING') return 'bg-yellow-100 text-yellow-600'
    if (status === 'OVERDUE') return 'bg-red-100 text-red-600'
    return ''
  }

  if (!invoice) return <div className="text-center mt-20">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-blue-600">
          PayTrack
        </Link>
        <Link to="/invoices" className="text-gray-600 hover:text-blue-600 text-sm">
          Back to Invoices
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto p-6">
        {/* Invoice Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Invoice #{invoice.id}
            </h2>
            <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusClass(invoice.status)}`}>
              {invoice.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-700">Client Name</p>
              <p>{invoice.clientName}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Client Email</p>
              <p>{invoice.clientEmail}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Amount</p>
              <p className="text-lg font-bold text-blue-600">₹{invoice.amount}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Due Date</p>
              <p>{invoice.dueDate}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Created At</p>
              <p>{new Date(invoice.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Link
              to={`/invoices/${id}/edit`}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-sm"
            >
              Edit Invoice
            </Link>
          </div>
        </div>

        {/* Payments Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Payment History
            </h3>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              + Add Payment
            </button>
          </div>

          {/* Add Payment Form */}
          {showForm && (
            <form onSubmit={handlePaymentSubmit} className="bg-gray-50 p-4 rounded mb-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-600 text-sm mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    value={paymentForm.paidAmount}
                    onChange={e => setPaymentForm({...paymentForm, paidAmount: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1">Date</label>
                  <input
                    type="date"
                    value={paymentForm.paidDate}
                    onChange={e => setPaymentForm({...paymentForm, paidDate: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1">Payment Mode</label>
                  <select
                    value={paymentForm.paymentMode}
                    onChange={e => setPaymentForm({...paymentForm, paymentMode: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="UPI">UPI</option>
                    <option value="CASH">CASH</option>
                    <option value="BANK_TRANSFER">BANK TRANSFER</option>
                    <option value="CARD">CARD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1">Note</label>
                  <input
                    type="text"
                    value={paymentForm.note}
                    onChange={e => setPaymentForm({...paymentForm, note: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Save Payment
              </button>
            </form>
          )}

          {/* Payment List */}
          {payments.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No payments recorded yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-gray-500 text-left border-b">
                <tr>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Mode</th>
                  <th className="pb-2">Note</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 font-medium text-green-600">₹{payment.paidAmount}</td>
                    <td className="py-2">{payment.paidDate}</td>
                    <td className="py-2">{payment.paymentMode}</td>
                    <td className="py-2 text-gray-400">{payment.note || '-'}</td>
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