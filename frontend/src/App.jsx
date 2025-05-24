import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './routes/Login';
import { Register } from "./routes/Register";
import { Dashboard } from "./routes/Dashboard";
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import {Forgotpassword} from  './routes/Forgotpassword'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
           <Route path="/password" element={<Forgotpassword />} />
        </Routes>
      </AuthProvider>

     
    </BrowserRouter>
  )
}

export default App
