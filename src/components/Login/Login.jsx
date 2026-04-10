import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { context } from '../../context/AuthContext'

export default function Login() {

  //hooks
  const [errorApi, setErrorApi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let userData = React.useContext(context);

  let navigate = useNavigate();

  // Yup validation schema
  let yupValidation = Yup.object({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
  })

  // Setup Formik
  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yupValidation,
    onSubmit: submitFormik
  })

  // Form submission handler
  async function submitFormik(values) {
    setIsLoading(true);
    console.log(values);
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .then((response) => {
        console.log(response.data);
        userData.setToken(response.data.token);
        localStorage.setItem('Token', response.data.token);
        navigate('/');

      }).catch((error) => {
        console.log(error);
        setErrorApi(error.response.data.message);
      }).finally(() => {
        setIsLoading(false);
      })
  }


  return (
    <div className='container'>
      {
        errorApi ? <div className="p-4 mb-4 text-sm text-red-400 bg-red-100 rounded-l bg-danger-soft" role="alert">{errorApi}</div> : null
      }
      <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6 pt-24">
        <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-600">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Sign in to manage your devices.</p>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                name="email"
                placeholder="email@company.com"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-400 bg-red-100 rounded-l bg-danger-soft mt-2" role="alert">{formik.errors.email}</div> : null}

            </div>
            <div>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-400 bg-red-100 rounded-l bg-danger-soft mt-2" role="alert">{formik.errors.password}</div> : null}
            </div>
            <button
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              {isLoading ? <i className='fas fa-spin fa-spinner'></i> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Create an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>

  )
}
