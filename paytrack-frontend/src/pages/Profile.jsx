import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    api.get('/dashboard')
      .then(res => {
        // dashboard se user info nahi milti
        // token se email nikal sakte hain
        const token = localStorage.getItem('token')
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({ email: payload.sub })
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-blue-600">
          PayTrack
        </Link>
        <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 text-sm">
          Back to Dashboard
        </Link>
      </nav>

      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Profile</h2>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">{user?.email}</p>
              <p className="text-sm text-gray-400">PayTrack User</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-500">
              More profile features coming in v1.1.0
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile