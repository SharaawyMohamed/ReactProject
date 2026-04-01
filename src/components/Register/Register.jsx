import axios from 'axios';
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {

    let navigate= useNavigate();

    async function submitFormik(values){
        console.log(values);
        const apiData={
            name: values.firstName + ' ' + values.lastName,
            email: values.email,
            phone: values.phone,
            password: values.password,
            rePassword: values.confirmPassword
        }
        let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',apiData)
        console.log(response.data);

        if(response.data.message == 'success'){
            navigate('/login')
        }
    }

    let formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit:submitFormik
    })
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-40">
            <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-600">Create Account</h2>
                    <p className="text-gray-500 mt-2">Join us to start managing your devices.</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    <div className="flex-1">
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            type="text" name="firstName"
                            placeholder="First Name"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="flex-1">
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            type="text" name="lastName"
                            placeholder="Last Name"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="flex-1">
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            type="tel" name="phone"
                            placeholder="Phone Number"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
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
                    <div>
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
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