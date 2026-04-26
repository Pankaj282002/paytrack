import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../services/auth'

const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute