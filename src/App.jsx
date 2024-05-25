import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter , Routes, Route} from 'react-router-dom'
import { Home } from './Pages/Home'
import { Header } from './Components/Header'
import { Register } from './Pages/Register'
import { Login } from './Pages/Login'
import { Contacts } from './Pages/Contacts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/register' Component={Register} />
        <Route path='/login' Component={Login} />
        <Route path='/contact' Component={Contacts} />
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
