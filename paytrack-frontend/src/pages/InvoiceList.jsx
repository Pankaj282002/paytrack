import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

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

  const getStatusClass = (status) => {
    if (status === 'PAID') return 'bg-green-100 text-green-600'
    if (status === 'PENDING') return 'bg-yellow-100 text-yellow-600'
    if (status === 'OVERDUE') return 'bg-red-100 text-red-600'
    return ''
  }

  if (loading) return <div className="text-center mt-20">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-blue-600">
          PayTrack
        </Link>
        <Link
          to="/invoices/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          + Create Invoice
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          All Invoices
        </h2>

        {invoices.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-400">
            No invoices found. Create your first invoice!
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-left">
                <tr>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(invoice => (
                  <tr key={invoice.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{invoice.clientName}</td>
                    <td className="px-4 py-3">₹{invoice.amount}</td>
                    <td className="px-4 py-3">{invoice.dueDate}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <Link
                        to={`/invoices/${invoice.id}`}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        View
                      </Link>
                      <Link
                        to={`/invoices/${invoice.id}/edit`}
                        className="text-yellow-600 hover:underline text-xs"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(invoice.id)}
                        className="text-red-500 hover:underline text-xs"
                      >
                        Delete
                      </button>
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