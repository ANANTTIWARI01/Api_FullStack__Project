import React from 'react'
import First from './First'
import AddProduct from './AddProduct'
import SingleProduct from './Pages/SingleProduct'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddCategory from './Pages/AddCategory'
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