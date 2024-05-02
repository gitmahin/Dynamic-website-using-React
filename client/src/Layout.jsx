import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container-wrap">
        <div className="container">
          <Outlet />

        </div>

      </div>
      <Footer />
    </>
  )
}

export default Layout
