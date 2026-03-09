import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './Gallery.css'
export function Gallery({product, removeProduct, updateProduct}) {

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src="../../../src/assets/pic.jpg" alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>Name: {product.name}</p>
        <p>Price: {product.price}</p>
        <p>In Stock: {product.inStock ? 'Yes' : 'No'}</p>
        <p>Quantity: {product.quantity}</p>
      </div>
      <button className="btn btn-primary">Buy Now</button>
      <button className="btn btn-secondary">Add to Cart</button>
      <button className="btn btn-danger" onClick={() => removeProduct(product.id)}>Remove</button>
      <button className="btn btn-warning" onClick={()=>updateProduct(product)}>Update</button>
    </div>
  )
}