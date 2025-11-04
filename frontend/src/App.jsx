import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Jobs from './components/Jobs';
import Browes from './components/Browes';
import ViewProfile from './components/ViewProfile';
import JobDescription from './components/JobDescription';
import { Companies } from './admin/Companies';
import NewCompany from './admin/NewCompany';
import { CompanySetup } from './admin/CompanySetup';
import { AdminJobs } from './admin/AdminJobs';
import NewJobs from './admin/NewJobs';
import Applicants from './admin/Applicants';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/shared/Layout'
import DebugToggle from './components/DebugToggle';

const appRouter = createBrowserRouter([
   {
    path: "/",
    element: <Layout><Home /></Layout>,
  },
  {
    path: "/home",
    element: <Layout><Home /></Layout>,
  },
  {
    path: "/login",
    element: <Layout><Login /></Layout>,
  },
  {
    path: "/signup",
    element: <Layout><Signup /></Layout>,
  },
  {
    path: "/jobs",
    element: (
      <ProtectedRoute>
        <Layout><Jobs /></Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "jobs/description/:id",
    element: (
      <ProtectedRoute>
        <Layout><JobDescription /></Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/browes",
    element: (
      <ProtectedRoute>
        <Layout><Browes /></Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Layout><ViewProfile /></Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Layout><Companies /></Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/new",
    element: (
      <ProtectedRoute>
        <Layout><NewCompany /></Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <Layout><CompanySetup /></Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <Layout><AdminJobs /></Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/new",
    element: (
      <ProtectedRoute>
        <Layout><NewJobs /></Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Layout><Applicants /></Layout>
      </ProtectedRoute>
    ),
  },
])

function App() {
  return (
    <>
    <RouterProvider router={appRouter} />
    {/* <DebugToggle/> */}
    </>
  );
}

export default App;