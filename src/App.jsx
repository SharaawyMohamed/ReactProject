import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import NotFound from './components/NotFound/NotFound'
import Cart from './components/Cart/Cart'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home />, },
        { path: "login", element: <Login /> },
        { path: "Register", element: <Register /> },
        { path: "brands", element: <Brands /> },
        { path: "products", element: <Products /> },
        { path: "cart", element: <Cart /> },
        { path: "*", element: <NotFound /> },
      ]
    }

  ])

  return <RouterProvider router={router} />
}

export default App
