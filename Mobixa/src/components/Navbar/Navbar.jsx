import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
export default function Navbar() {
    return <header className="fixed w-full z-20 top-0 start-0 bg-gray-50">
        <nav className="bg-gray-300 fixed top-0 start-0 end-0">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <div className="flex items-center gap-5">
                    <NavLink to="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-7" alt="Flowbite Logo" />
                        <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">Flowbite</span>
                    </NavLink>

                    <ul className="flex gap-5 ">
                        <li><NavLink to="/" >Home</NavLink></li>
                        <li><NavLink to="products" >Products</NavLink></li>
                        <li><NavLink to="brands" >Brands</NavLink></li>
                        <li><NavLink to="cart" >Cart</NavLink></li>

                    </ul>
                </div>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <ul className="flex items-center gap-5">
                        <li><i className="fab fa-twitter"></i></li>
                        <li><i className="fab fa-instagram"></i></li>
                        <li><a href="https://www.linkedin.com/in/sharawymohamed/" target="_blank"><i className="fab fa-linkedin"></i></a></li>
                        <li><a href="https://github.com/SharaawyMohamed/" target="_blank"><i className="fab fa-github"></i></a></li>
                    </ul>
                    <NavLink to="login" className="text-sm font-medium text-fg-brand hover:underline">Login</NavLink>
                    <NavLink to="register" className="text-sm font-medium text-fg-brand hover:underline">Register</NavLink>
                    <span className="text-sm font-medium text-fg-brand hover:underline">Logout</span>

                </div>

            </div>
        </nav>
    </header>

}
