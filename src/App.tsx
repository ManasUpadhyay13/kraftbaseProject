import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom"
import Kanban from './pages/Kanban'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { useEffect } from 'react'
import { checkUserStatus } from './utils/checkUser'
// import 'antd/dist/antd.css';



function App() {

  const navigate = useNavigate()

  useEffect(() => {
    let isUserLoggedIn = checkUserStatus()
    if(!isUserLoggedIn) {
      navigate('/login')
    }
  },[])

  return (
    <div className='krafbaseProject'>
      <Routes>
        <Route path='/' element={<Kanban/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signUp' element={<SignUp/>} />
      </Routes>
    </div>
  )
}

export default App
