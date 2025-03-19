import React from 'react'
import First from './Pages/First'
import AddProduct from './Pages/AddProduct'
import SingleProduct from './Pages/SingleProduct'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddCategory from './Pages/AddCategory'
import Register from './Pages/Register'
import Login from './Pages/Login'
const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    },
    {
      path:"/AddProduct",
      element:<AddProduct/>
    },
    {
      path:"/product/:id",
      element:<SingleProduct/>
  },
  {
    path:"/product/category/add",
    element:<AddCategory/>
  },
  {
    path:"/register",
    element: <Register/>
  },
  {
    path:"/login",
    element: <Login/>
  },
])

function App() {


  return (
    <div>
    <RouterProvider router={router} />
    </div>
  )
}

export default App