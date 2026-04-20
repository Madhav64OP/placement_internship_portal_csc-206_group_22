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
import AppliedCompanyPage from './pages/common/AppliedCompanyPage.jsx';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import AdminQueueDemo from './pages/pic/AdminQueueDemo.jsx';
import LoginPage from './pages/common/LoginPage.jsx';
import PicHeadDashboard from './pages/pic/PicHeadDashboard.jsx';
import AssociatePortal from './pages/pic/AssociatePortal.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/login" element={<LoginPage />} />
      <Route path="/pic-admin" element={<PicHeadDashboard />} />
      <Route path="/associate-scan" element={<AssociatePortal />} />
    <Route path="/" element={<App />} >

    <Route index element={<HomePage />} />
      <Route path="apply" element={<ApplyPage />} />
      <Route path="company-apply/:companyId" element={<CompanyPage />} />
      <Route path="company-track/:userId/:companyId" element={<AppliedCompanyPage />} />
      <Route path="track" element={<TrackPage />} />
      <Route path="/admin-queue/:companyId" element={<AdminQueueDemo />} />
      {/* <Route path="results" element={<ResultsPage />} /> */}
      <Route path="profile" element={<ProfilePage />} />
    </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
