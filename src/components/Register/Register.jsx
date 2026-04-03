import axios from 'axios';
import { useFormik } from 'formik'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
export default function Register() {
    // Hooks
    const [errorApi, setErrorApi] = useState(null);
    let navigate = useNavigate();

    // validation schema
    let yupValidation = Yup.object({
        firstName: Yup.string().required('First Name is required').min(3, 'First Name must be at least 3 characters').max(15, 'First Name must be less than 15 characters'),
        lastName: Yup.string().required('Last Name is required').min(3, 'Last Name must be at least 3 characters').max(15, 'Last Name must be less than 15 characters'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        phone: Yup.string().required('Phone Number is required').matches(/^01[0125][0-9]{8}$/, 'Phone Number must be a valid Egyptian phone number'),
        password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
        confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    // Formik setup
    let formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: yupValidation,
        onSubmit: submitFormik
    })

    // form submission handler
    async function submitFormik(values) {
        const apiData = {
            name: values.firstName + ' ' + values.lastName,
            email: values.email,
            phone: values.phone,
            password: values.password,
            rePassword: values.confirmPassword
        };

        // Make API request to register the user
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', apiData)
            .then((response) => {
                console.log(response.data);
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
                setErrorApi(error.response.data.message);
            });
    }



    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-10">
            {
                errorApi ? <div className="p-4 mb-4 text-sm text-red-400 bg-red-100 rounded-l bg-danger-soft" role="alert">{errorApi}</div> : null
            }
            <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-600">Create Account</h2>
                    <p className="text-gray-500 mt-2">Join us to start managing your devices.</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    <div className="flex-1">
                        <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            type="text" name="firstName"
                            placeholder="First Name"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        {formik.errors.firstName && formik.touched.firstName ? <div className="p-4 mb-4 text-sm text-red-400 bg-red-100 rounded-l bg-danger-soft mt-2" role="alert">{formik.errors.firstName}</div> : null}

                    </div>
                    <div className="flex-1">
                        <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            type="text" name="lastName"
                            placeholder="Last Name"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        {formik.errors.lastName && formik.touched.lastName ? <div className="p-4 mb-4 text-sm text-red-400 bg-red-100 rounded-l bg-danger-soft mt-2" role="alert">{formik.errors.lastName}</div> : null}
                    </div>
                    <div className="flex-1">
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            type="tel" name="phone"
                            placeholder="Phone Number"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-400 bg-red-100 rounded-l bg-danger-soft mt-2" role="alert">{formik.errors.phone}</div> : null}
                    </div>
                    <div>
                        <input
                            onChange={formik.handleChange}

                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            type="email"
                            name="email"
                            placeholder="email@company.com"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-400 bg-red-100 rounded-l bg-danger-soft mt-2" role="alert">{formik.errors.email}</div> : null}
                    </div>
                    <div>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-400 bg-red-100 rounded-l bg-danger-soft mt-2" role="alert">{formik.errors.password}</div> : null}
                    </div>
                    <div>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className="p-4 mb-4 text-sm text-red-400 bg-red-100 rounded-l bg-danger-soft mt-2" role="alert">{formik.errors.confirmPassword}</div> : null}

                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    )
}