import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import NotFound from './components/NotFound/NotFound'
import Cart from './components/Cart/Cart'
import CashPayment from './components/CashPayment/CashPayment'
import AuthContext from './context/AuthContext'
import CartContextProvider from './context/CartContextProvider'

import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Category from './components/Category/Category'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

let client = new QueryClient();

export default function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRouter><Home /></ProtectedRouter>, },
        { path: "login", element: <Login /> },
        { path: "Register", element: <Register /> },
        { path: "brands", element: <ProtectedRouter><Brands /></ProtectedRouter> },
        { path: "products", element: <ProtectedRouter><Products /></ProtectedRouter> },
        { path: "cashPayment/:cartId", element: <ProtectedRouter><CashPayment /></ProtectedRouter> },
        { path: "productdetails/:id", element: <ProtectedRouter><ProductDetails /></ProtectedRouter> },
        { path: "cart", element: <ProtectedRouter><Cart /></ProtectedRouter> },
        { path: "category/:categoryId", element: <ProtectedRouter><Category /></ProtectedRouter> },
        { path: "*", element: <ProtectedRouter><NotFound /></ProtectedRouter> },
      ]
    }

  ])

  return (
    <QueryClientProvider client={client}>
      <AuthContext>
        <CartContextProvider>
          <RouterProvider router={router} />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </CartContextProvider>
      </AuthContext>
    </QueryClientProvider>
  )
}

