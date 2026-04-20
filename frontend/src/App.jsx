/**
* Placement and Internship Portal.
* File: App.jsx
* Description: Main component which is set up with routing to behave as single page application. Coontains an outlet for injecting different pages based on the route. Consists of a common navbar for navigation across the student portal.
*/
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

export default App;
