import { Outlet } from 'react-router-dom'
import './App.css'
import StudentPortalNavbar from './pages/student/Navbar'

function App() {
  return (
    <>
      <StudentPortalNavbar />
      <Outlet />
    </>
  )
}

export default App
