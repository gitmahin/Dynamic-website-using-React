import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MyBlog from './pages/MyBlog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Registration from './pages/Registration.jsx'
import Login from './pages/Login.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './store/authenticate.jsx'
import Logout from './pages/Logout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path='' element={<Home />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='myblog' element={<MyBlog />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='registration' element={<Registration />} />
      <Route path='login' element={<Login />} />
      <Route path='logout' element={<Logout />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </AuthProvider>
  </>
)
