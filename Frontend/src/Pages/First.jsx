import React from 'react'
import AddProduct from "./AddProduct"
import ShowProduct from '../ShowProduct'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

function First() {
  return (
    <>
      <Header />
      {/* <AddProduct/> */}
      {/* <ShowProduct /> */}
      <Outlet/>
      {/* <Footer/> */}
    </>
  )
}

export default First