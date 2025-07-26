import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import Root from './utils/Root'
import Login from './pages/Login'
import ProtectedRoutes from './utils/ProtectedRoutes'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/admin/dashboard" element={<ProtectedRoutes requireRole={["admin"]}><h1>Admin Dashboard</h1></ProtectedRoutes>}/>
        <Route path="/customer/dashboard" element={<h1>customer dashboard</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path='/unauthorized' element={<p className='font-bold text-3xl mt-20 ml-20'>Unauthorized</p>}></Route>
      </Routes>
    </Router>
  )
}

export default App
