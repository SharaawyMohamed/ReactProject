import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Gallery } from './Components/Gallery/Gallery'
import './App.css'

export function App() {
   const [products, setProduct] = useState([{
      id: 1,
      name: 'Iphone',
      price: 1000,
      inStock: true,
      quantity: 10
   },
   {
      id: 2,
      name: 'Samsung',
      price: 800,
      inStock: false,
      quantity: 0
   },
   {
      id: 3,
      name: 'Huawei',
      price: 600,
      inStock: true,
      quantity: 5
   },
   {
      id: 4,
      name: 'Xiaomi',
      price: 400,
      inStock: true,
      quantity: 20
   }
   ])

   function removeProduct(id) {
      setProduct(products.filter(product => product.id !== id))
   }

   function updateProduct(product){
      let newProducts=structuredClone(products)
      let index=newProducts.findIndex(p=>p.id===product.id)
      newProducts[index]=product
      setProduct(newProducts)
   }
   return (
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {products.map((product)=> <Gallery key={product.id} product={product} removeProduct={removeProduct} updateProduct={updateProduct}/>)}
      </div>
   )
}


export default App
