import React, { useState, useContext } from 'react'
import axios from 'axios'
import { cartContext } from '../../context/CartContextProvider'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../Redux/basketSlice';

export default function Cart() {
  const { queryResponse } = useContext(cartContext);
  const { data, isLoading, isError, error, refetch } = queryResponse;
  const [loadingId, setLoadingId] = useState(null);
  const [isClearing, setIsClearing] = useState(false)
  const dispatch = useDispatch();

  async function updateItemQuantity(id, count) {
    setLoadingId(id);

    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: count },
        {
          headers: {
            token: localStorage.getItem("Token")
          }
        }
      );

      if (response.data.status === "success") {
        const { data: updatedData } = await refetch();

        toast.success("Cart updated successfully!");

        console.log("Updated Cart Data:", updatedData?.data?.data);
        console.log("Updated Products:", updatedData?.data?.data?.products);
        console.log("Total Price:", updatedData?.data?.data?.totalCartPrice);
      }
    } catch (err) {
      toast.error("Failed to update cart. Please try again.");
      console.error("Update Error:", err);
    } finally {
      setLoadingId(null);
    }
  }

  async function removeItemFromCart(id) {
    setLoadingId(id);

    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      );

      if (response.data.status === "success") {
        const { data: updatedData } = await refetch();
        dispatch(actions.decrement());
        toast.success("Item removed from cart!");

        console.log("Cart after removal:", updatedData?.data?.data);
        console.log("Remaining items:", updatedData?.data?.data?.products);
      }
    } catch (err) {
      toast.error("Failed to remove item.");
      console.error("Remove Error:", id, err);
    } finally {
      setLoadingId(null);
    }
  }

  async function clearCart() {
    setIsClearing(true);
    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.getItem('Token')
        }
      }
      );
      if (response.data.message === 'success') {
        await refetch();
        dispatch(actions.setCounter(0));
        toast.success("Your basket had been cleard successfully")
      }
    }
    catch (err) {
      console.log("Error: ", err);
    }
    finally {
      setIsClearing(false);
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 font-bold">Error loading cart.</div>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  const cartProducts = data?.data?.data?.products || [];
  const totalCartPrice = data?.data?.data?.totalCartPrice || 0;
  const cartId = data?.data?.cartId || null;
  console.log('cart id: ', cartId);
  return (
    <div className='pt-10'>
      <div className="relative overflow-hidden bg-white shadow-lg rounded-xl border border-gray-100 p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 pt-28">
              <thead className="text-xs uppercase tracking-wider text-gray-500 bg-gray-50 border-b border-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-5 font-bold">Product</th>
                  <th scope="col" className="px-6 py-5 font-bold text-center">Quantity</th>
                  <th scope="col" className="px-6 py-5 font-bold">Unit Price</th>
                  <th scope="col" className="px-6 py-5 font-bold">Total</th>
                  <th scope="col" className="px-6 py-5 font-bold text-right">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cartProducts.map((item) => (
                  <tr key={item._id} className="group hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                          <img
                            src={item.product.imageCover}
                            className="w-full h-full object-contain mix-blend-multiply p-2"
                            alt={item.product.title}
                          />
                        </div>
                        <div className="max-w-[200px]">
                          <h3 className="font-bold text-gray-900 line-clamp-2 leading-snug">
                            {item.product.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">{item.product.category?.name}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center">
                        <div className={`inline-flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm ${loadingId === item.product._id ? 'opacity-50 pointer-events-none' : ''}`}>
                          <button
                            className="px-3 py-1 hover:bg-gray-100 text-gray-500 transition-colors border-r border-gray-100"
                            disabled={loadingId === item.product._id || item.count <= 1}
                            onClick={() => updateItemQuantity(item.product._id, item.count - 1)}
                          >
                            <i className="fa-solid fa-minus text-[10px]"></i>
                          </button>

                          <span className="px-2 py-1 font-semibold text-gray-700 min-w-[40px] text-center">
                            <input
                              type="number"
                              className="w-12 text-center bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              value={item.count}
                              readOnly
                            />
                          </span>

                          <button
                            className="px-3 py-1 hover:bg-gray-100 text-gray-500 transition-colors border-l border-gray-100"
                            disabled={loadingId === item.product._id}
                            onClick={() => updateItemQuantity(item.product._id, item.count + 1)}
                          >
                            <i className="fa-solid fa-plus text-[10px]"></i>
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 font-medium text-gray-500">
                      <p className="text-sm font-bold text-blue-600">
                        {item.price} EGP
                      </p>
                    </td>

                    <td className="px-6 py-5 font-bold text-blue-600">
                      <p className="text-sm font-bold text-blue-600">
                        {(item.price * item.count).toFixed(2)} EGP
                      </p>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => removeItemFromCart(item.product._id)}
                        disabled={loadingId === item.product._id}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all disabled:opacity-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{totalCartPrice} EGP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-xl text-blue-600">{totalCartPrice} EGP</span>
                  </div>
                </div>
              </div>
              {cartId ? (
                <Link
                  to={`/payment/${cartId}`}
                  className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <button
                  disabled
                  className="block w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed text-center"
                >
                  Proceed to Checkout (Cart Empty)
                </button>
              )}

            </div>
          </div>
        </div>
        <button
          onClick={clearCart}
          disabled={isClearing}
          className="w-full block mx-auto w-48 text-center text-red-500 hover:text-red-700 font-medium py-2 transition-colors duration-200 disabled:opacity-50"
        >
          {isClearing ? 'Clearing...' : 'Clear Cart'}
        </button>
      </div>
    </div>
  )
}