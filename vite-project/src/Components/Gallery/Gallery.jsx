import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './Gallery.css'

export function Gallery({ product, removeProduct, updateProduct, addToCard }) {
  if (!product) return null;

  return (
    <div className="card w-full bg-base-100 shadow-xl border border-gray-200">
      <figure className="px-4 pt-4">
        <img src="/src/assets/pic.jpg" alt={product.name} className="rounded-xl h-48 w-full object-cover" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl font-bold">{product.name}</h2>
        <div className="flex flex-col gap-1 my-2">
          <p className="text-lg">Price: <span className="text-green-600 font-bold">${product.price}</span></p>
          <p>Stock: {product.inStock ? '✅ Available' : '❌ Out of Stock'}</p>
          <p className="text-sm opacity-60">Quantity: {product.quantity}</p>
        </div>

        <div className="card-actions grid grid-cols-2 gap-2 w-full mt-4">
          <button className="btn btn-outline btn-sm" onClick={() => addToCard(product)}>Add to Cart</button>
          <button className="btn btn-warning btn-sm" onClick={() => updateProduct(product)}>Update</button>
          <button className="btn btn-error btn-sm" onClick={() => removeProduct(product.id)}>Remove</button>
        </div>
      </div>
    </div>
  )
}