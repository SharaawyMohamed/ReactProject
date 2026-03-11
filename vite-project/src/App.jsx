import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Gallery } from './Components/Gallery/Gallery'
import { About } from './Components/About/About'
import { Home } from './Components/Home/Home'
import './App.css'
import Layout from './Components/Layout/Layout'
import Footer from './Components/Footer/Footer'
import Card from './Components/Card/Card'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export function App() {

   const [products, setProduct] = useState([
      { id: 1, name: 'Iphone', price: 1000, inStock: true, quantity: 10 },
      { id: 2, name: 'Samsung', price: 800, inStock: false, quantity: 0 },
      { id: 3, name: 'Huawei', price: 600, inStock: true, quantity: 5 },
      { id: 4, name: 'Xiaomi', price: 400, inStock: true, quantity: 20 }
   ])
   const [cart, setCart] = useState([])

   function removeProduct(id) {
      setProduct(products.filter(product => product.id !== id))
   }

   function updateProduct(product) {
      let newProducts = structuredClone(products)
      let index = newProducts.findIndex(p => p.id === product.id)

      newProducts[index].price = product.price * 1.5;
      setProduct(newProducts)
   }
   function addToCard(product) {
      let newProducts = structuredClone(products)
      let index = newProducts.findIndex(p => p.id === product.id)

      if (newProducts[index].quantity > 0) {
         newProducts[index].quantity -= 1;
         setProduct(newProducts)
         setCart([...cart, product])
      }
   }

   const router = createBrowserRouter([
      {
         path: "",
         element: <Layout />,
         children: [
            { index: true, element: <Home/> },
            {
               path: "gallery",
               element: (
                  <div className="container mx-auto p-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((p) => (
                           <Gallery key={p.id} product={p} removeProduct={removeProduct} updateProduct={updateProduct} addToCard={addToCard} />
                        ))}
                     </div>
                  </div>
               )
            },
            {
               path: "card",
               element: (
                  <div className="container mx-auto p-10">
                     <h2 className="text-2xl mb-4">Items in Cart: {cart.length}</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {cart.map((item, index) => (
                           <Card key={index} product={item} />
                        ))}
                     </div>
                  </div>
               )
            },
            { path: "about", element: <About /> },
            { path: "footer", element: <Footer /> },
            { path: "*", element: <h1 className='text-5xl font-bold'>404 Not Found</h1> }
         ]
      }
   ])

   return <RouterProvider router={router} />
}