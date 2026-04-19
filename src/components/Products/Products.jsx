import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
    <div className="container mx-auto pt-10 pb-12 px-4">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 items-stretch">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col h-full bg-white p-5 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">

            <Link to={`/productdetails/${product.id}`} className="block mb-5">
              <div className="relative aspect-square overflow-hidden rounded-xl mb-5">
                {product.priceAfterDiscount && (
                  <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
                    SALE
                  </span>
                )}
                <img
                  className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
                  src={product.imageCover}
                  alt={product.title}
                />
              </div>
            </Link>
            <div className="flex flex-col flex-grow">

              <div className="flex items-center justify-between mb-2 text-blue-500">
                <Link to={`/category/${product.category._id}`}>
                  <span className="text-[11px] underline text-blue-600 uppercase tracking-wider">
                    {product.category.name}
                  </span>
                </Link>
                <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded">
                  <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.169L12 18.896l-7.334 3.87 1.4-8.169-5.934-5.787 8.2-1.192L12 .587z" />
                  </svg>
                  <span className="text-[10px] font-bold text-gray-700">{product.ratingsAverage}</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-gray-900 mb-4 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                {product.title}
              </h3>

              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-0.5">Price</p>

                  <div className="flex flex-col leading-tight">
                    {product.priceAfterDiscount ? (
                      <>
                        <span className="text-[11px] text-red-400 line-through decoration-1">
                          {product.price} EGP
                        </span>
                        <span className="text-sm font-black text-blue-500">
                          {product.priceAfterDiscount} <small className="text-blue-500">EGP</small>
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-black text-blue-700">
                        {product.price} <small className="text-[10px]">EGP</small>
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 w-9 h-9 sm:w-auto sm:px-4 rounded-xl transition-all active:scale-90 shadow-md shadow-blue-100"
                >
                  <svg className="w-4 h-4 sm:me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="hidden sm:inline text-[11px] font-bold">Add To Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
