import React from 'react'
import First from './First'
import AddProduct from './AddProduct'
import SingleProduct from './SingleProduct'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddCategory from './AddCategory'
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
  }
])

function App() {


  return (
    <div>
    <RouterProvider router={router} />
    </div>
  )
}

export default App