import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import Home from './Pages/Home'
import Potholes from './Pages/Potholes'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <TopBar />
      <div className='mt-[85px]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/potholes" element={<Potholes />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
