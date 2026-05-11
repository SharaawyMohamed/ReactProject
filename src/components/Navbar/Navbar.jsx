import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { context } from '../../context/AuthContext';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const { Token, setToken } = useContext(context);
    const { counter } = useSelector((state) => state);
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('Token');
        navigate('/login');
    };

    return (
        <header className="fixed w-full z-50 top-0 bg-white shadow-md">
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        <div className="flex items-center gap-8">
                            <NavLink to="/" className="flex items-center space-x-3">
                                <img src={logo} className="h-8 w-auto" alt="Logo" />
                                <span className="text-xl font-bold text-gray-900">Covelo</span>
                            </NavLink>

                            {Token && (
                                <div className="hidden md:flex items-center space-x-1">
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
                                                ? 'text-blue-600 bg-blue-50'
                                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                                            }`
                                        }
                                    >
                                        Home
                                    </NavLink>

                                    <NavLink
                                        to="products"
                                        className={({ isActive }) =>
                                            `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
                                                ? 'text-blue-600 bg-blue-50'
                                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                                            }`
                                        }
                                    >
                                        Products
                                    </NavLink>

                                    <NavLink
                                        to="brands"
                                        className={({ isActive }) =>
                                            `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
                                                ? 'text-blue-600 bg-blue-50'
                                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                                            }`
                                        }
                                    >
                                        Brands
                                    </NavLink>

                                    <div className='relative flex items-center'>
                                        {counter ? <div className='absolute -top-2 -right-2 flex items-center justify-center bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 '>
                                            {counter}
                                        </div> : null

                                        }
                                        <NavLink
                                            to="cart"
                                            className={({ isActive }) =>
                                                `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
                                                    ? 'text-blue-600 bg-blue-50'
                                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                                                }`
                                            }
                                            title="Cart"
                                        >
                                            <i className="fas fa-shopping-cart text-lg"></i>
                                            <span className="sr-only">Cart</span>
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-4">

                            {Token && (
                                <div className="hidden md:flex items-center space-x-3">
                                    <a
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                        aria-label="Twitter"
                                    >
                                        <i className="fab fa-twitter text-lg"></i>
                                    </a>

                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                        aria-label="Instagram"
                                    >
                                        <i className="fab fa-instagram text-lg"></i>
                                    </a>

                                    <a
                                        href="https://www.linkedin.com/in/sharawymohamed/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                        aria-label="LinkedIn"
                                    >
                                        <i className="fab fa-linkedin text-lg"></i>
                                    </a>

                                    <a
                                        href="https://github.com/SharaawyMohamed/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                        aria-label="GitHub"
                                    >
                                        <i className="fab fa-github text-lg"></i>
                                    </a>
                                </div>
                            )}

                            <div className="flex items-center space-x-3">
                                {!Token ? (
                                    <>
                                        <NavLink
                                            to="/login"
                                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                                        >
                                            Login
                                        </NavLink>
                                        <NavLink
                                            to="/register"
                                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            Register
                                        </NavLink>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
                                    >
                                        Logout
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}