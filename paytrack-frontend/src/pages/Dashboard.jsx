import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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

  if (!summary) return <div className="text-center mt-20">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">PayTrack</h1>
        <div className="flex gap-4">
          <Link to="/invoices" className="text-gray-600 hover:text-blue-600">
            Invoices
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Dashboard</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-500 text-sm">Total Invoices</p>
            <p className="text-2xl font-bold text-blue-600">
              {summary.totalInvoices}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-500 text-sm">Paid</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{summary.totalPaid}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              ₹{summary.totalPending}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-500 text-sm">Overdue</p>
            <p className="text-2xl font-bold text-red-600">
              ₹{summary.totalOverdue}
            </p>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Recent Invoices
            </h3>
            <Link
              to="/invoices/create"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              + Create Invoice
            </Link>
          </div>

          {summary.recentInvoices.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No invoices yet. Create your first invoice!
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2">Client</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Due Date</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentInvoices.map(invoice => (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{invoice.clientName}</td>
                    <td className="py-2">₹{invoice.amount}</td>
                    <td className="py-2">{invoice.dueDate}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium
                        ${invoice.status === 'PAID' ? 'bg-green-100 text-green-600' : ''}
                        ${invoice.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' : ''}
                        ${invoice.status === 'OVERDUE' ? 'bg-red-100 text-red-600' : ''}
                      `}>
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