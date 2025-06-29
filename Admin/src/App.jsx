import React,{ useState } from 'react'
import TopBar from './components/TopBar'
import Home from './Pages/Home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <TopBar/>
  <div className="mt-[80px] ">
    <Home/>
  </div>
    </>
  )
}

export default App
