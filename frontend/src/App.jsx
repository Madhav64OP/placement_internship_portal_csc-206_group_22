/**
* Placement and Internship Portal.
* File: App.jsx
* Description: Main component which is set up with routing to behave as single page application. Coontains an outlet for injecting different pages based on the route. Consists of a common navbar for navigation across the student portal.
*/
import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import StudentPortalNavbar from './pages/student/Navbar'
import {useSelector} from 'react-redux'
import { useEffect } from 'react'

function App() {
  const {data:user} = useSelector((state)=>state.user)
  const navigate = useNavigate();

  useEffect(() => {

    if (!user) {
      navigate('/login');
    } else if (user.role === 'PIC') {
      navigate('/pic-admin');
    } else if (user.role === 'Associate') {
      navigate('/associate-scan');
    }
  }, [user, navigate]);

  if(!user || user.role!=='Student'){
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading portal...</div>;
  }

  return (
    <>
      <StudentPortalNavbar />
      <Outlet />
    </>
  )
}

export default App;
