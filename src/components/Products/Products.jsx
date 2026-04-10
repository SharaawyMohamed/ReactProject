import React, { useEffect } from 'react'
import { context } from '../../context/CounterContextProvider'
import axios from 'axios'

export default function Products() {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    getProducts();
  }, [])

  async function getProducts() {
    setIsLoading(true);

    await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then((response) => {
        setProducts(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
  <div className="container mx-auto pt-24 pb-12 px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-10 items-stretch">
      {products.map((product) => (
        <div key={product.id} className="group flex flex-col h-full bg-white p-5 border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
          
          {/* 1. حاوية الصورة الموحدة */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50 mb-5">
            <img
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              src={product.imageCover}
              alt={product.title}
            />
          </div>

          {/* 2. محتوى الكارت */}
          <div className="flex flex-col flex-grow">
            
            {/* النجوم بناءً على التقييم */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i + 1 <= Math.round(product.ratingsAverage) ? 'text-yellow-400' : 'text-gray-200'}`} 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.169L12 18.896l-7.334 3.87 1.4-8.169-5.934-5.787 8.2-1.192L12 .587z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {product.ratingsAverage}
              </span>
            </div>

            {/* العنوان (محدد بسطرين لضمان التساوي) */}
            <h3 className="text-md font-bold text-gray-900 mb-4 line-clamp-2 leading-snug">
              {product.title}
            </h3>

            {/* 3. حاوية السعر والزر (مثبتة في القاع بـ mt-auto) */}
            <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Price</p>
                <span className="text-l font-black text-blue-700">${product.price}</span>
              </div>
              
             <button type="button" className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-xs px-4 py-2 transition-colors focus:outline-none">
                <svg className="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Add to cart
              </button>
            </div>
          </div>

        </div>
      ))}
    </div>
  </div>
);
}
