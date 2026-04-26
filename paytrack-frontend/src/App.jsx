import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Landing Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<h1>Register Page</h1>} />
        <Route path="/docs" element={<h1>Docs Page</h1>} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/invoices" element={<h1>Invoice List</h1>} />
          <Route path="/invoices/create" element={<h1>Create Invoice</h1>} />
          <Route path="/invoices/:id" element={<h1>Invoice Detail</h1>} />
          <Route path="/invoices/:id/edit" element={<h1>Edit Invoice</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App