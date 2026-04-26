import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import api from '../services/api'

const InvoiceForm = () => {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()

  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    amount: '',
    dueDate: '',
    status: 'PENDING'
  })
  const [error, setError] = useState('')

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
            status: inv.status
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-blue-600">
          PayTrack
        </Link>
        <Link to="/invoices" className="text-gray-600 hover:text-blue-600 text-sm">
          Back to Invoices
        </Link>
      </nav>

      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          {isEdit ? 'Edit Invoice' : 'Create Invoice'}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">Client Name</label>
              <input
                type="text"
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">Client Email</label>
              <input
                type="email"
                name="clientEmail"
                value={form.clientEmail}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {isEdit && (
              <div className="mb-4">
                <label className="block text-gray-600 text-sm mb-1">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PAID">PAID</option>
                  <option value="OVERDUE">OVERDUE</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {isEdit ? 'Update Invoice' : 'Create Invoice'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InvoiceForm