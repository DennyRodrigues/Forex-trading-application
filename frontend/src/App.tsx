import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from './routes/LoginPage'
import { Home } from './routes/HomePage'
import { RegisterPage } from './routes/RegisterPage'
import { AuthProvider } from './contexts/authentication/AuthProvider'
import { PastTradesPage } from './routes/PastTradesPage'
import { NavBar } from './components/Nav/NavBar'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/past' element={<PastTradesPage />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
