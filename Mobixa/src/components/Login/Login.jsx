import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

  let navigate = useNavigate();
  
  async function submitFormik(values) {
    console.log(values);
    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
    console.log(response.data);
    if (response.data.message == "success") {
      localStorage.setItem('token', response.data.token)
      navigate('/')
    }
  }
  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: submitFormik
  })

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-24">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-600">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to manage your devices.</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              placeholder="email@company.com"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <input
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Create an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
