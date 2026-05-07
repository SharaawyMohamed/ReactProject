import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios' // Fixed: lowercase axios
import * as Yup from 'yup'
import toast from 'react-hot-toast'

export default function CashPayment() {
  const { cartId } = useParams(); 
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    shippingAddress: Yup.object({
      details: Yup.string()
        .required('Details is required')
        .min(3, 'Details must be at least 3 characters'),

      phone: Yup.string()
        .required('Phone Number is required')
        .matches(/^01[0125][0-9]{8}$/, 'Phone Number must be a valid Egyptian phone number'),
      
        city: Yup.string()
        .required('City is Required')
        .min(3, 'City must be at least 3 characters'),
     
        postalCode: Yup.string()
        .required('Postal Code is required')
        .length(5, "Postal Code Length should be 5 digits!")
    })
  });

  let formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: '',
        phone: '',
        city: '',
        postalCode: ''
      }
    },
    validationSchema: validationSchema, 
    onSubmit: submitFormik
  });

  async function submitFormik(values) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: values.shippingAddress
        },
        {
          headers: {
            token: localStorage.getItem('Token') // Fixed: added getItem
          }
        }
      );
      
      console.log('Order response:', response.data);
      
      if (response.data.status === 'success') {
        toast.success('Order placed successfully!');
        // Navigate to order confirmation or home
        navigate('/');
      }
    } catch (err) {
      console.log('Error: ', err);
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='container mx-auto'>
      <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6 pt-24">
        <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-600">Shipping Details</h2>
            <p className="text-gray-500 mt-2">Please enter your shipping information</p>
          </div>
          
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Details */}
            <div>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.shippingAddress.details}
                type="text"
                name="shippingAddress.details"
                placeholder="Address details"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {formik.errors.shippingAddress?.details && formik.touched.shippingAddress?.details && (
                <div className="p-2 mb-4 text-sm text-red-500 bg-red-50 rounded mt-2">
                  {formik.errors.shippingAddress.details}
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.shippingAddress.phone}
                type="tel"
                name="shippingAddress.phone"
                placeholder="Phone Number"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {formik.errors.shippingAddress?.phone && formik.touched.shippingAddress?.phone && (
                <div className="p-2 mb-4 text-sm text-red-500 bg-red-50 rounded mt-2">
                  {formik.errors.shippingAddress.phone}
                </div>
              )}
            </div>

            {/* City */}
            <div>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.shippingAddress.city}
                type="text"
                name="shippingAddress.city"
                placeholder="City"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {formik.errors.shippingAddress?.city && formik.touched.shippingAddress?.city && (
                <div className="p-2 mb-4 text-sm text-red-500 bg-red-50 rounded mt-2">
                  {formik.errors.shippingAddress.city}
                </div>
              )}
            </div>

            {/* Postal Code */}
            <div>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.shippingAddress.postalCode}
                type="text"
                name="shippingAddress.postalCode"
                placeholder="Postal Code"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {formik.errors.shippingAddress?.postalCode && formik.touched.shippingAddress?.postalCode && (
                <div className="p-2 mb-4 text-sm text-red-500 bg-red-50 rounded mt-2">
                  {formik.errors.shippingAddress.postalCode}
                </div>
              )}
            </div>

            <button
              disabled={!formik.isValid || !formik.dirty || isLoading}
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <i className='fas fa-spin fa-spinner'></i>
              ) : (
                'Place Order'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Back to <Link to="/cart" className="text-blue-600 font-semibold hover:underline">Cart</Link>
          </p>
        </div>
      </div>
    </div>
  );
}