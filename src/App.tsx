import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Describe } from './pages/Describe'
import { Report } from './pages/Report'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/describe" element={<Describe />} />
          <Route path="/report" element={<Report />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App