import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom';
import App from './App.jsx'
import ApplyPage from './pages/student/ApplyPage.jsx';
import TrackPage from './pages/student/TrackPage.jsx';
import ResultsPage from './pages/common/ResultsPage.jsx';
import ProfilePage from './pages/student/ProfilePage.jsx';
import HomePage from './pages/student/HomePage.jsx';
import CompanyPage from './pages/common/CompanyPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route index element={<HomePage />} />
      <Route path="apply" element={<ApplyPage />} />
      <Route path="company-apply/:companyName" element={<CompanyPage />} />
      <Route path="track" element={<TrackPage />} />
      <Route path="results" element={<ResultsPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
