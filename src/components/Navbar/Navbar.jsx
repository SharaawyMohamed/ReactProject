import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { context } from '../../context/AuthContext';

export default function Navbar() {
    const { Token, setToken } = useContext(context);
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('Token');
        navigate('/login');
    };

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: 'products', label: 'Products' },
        { to: 'brands', label: 'Brands' },
        { to: 'cart', label: 'Cart' }
    ];

    const socialLinks = [
        { icon: 'fab fa-twitter', url: 'https://twitter.com' },
        { icon: 'fab fa-instagram', url: 'https://instagram.com' },
        { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/sharawymohamed/' },
        { icon: 'fab fa-github', url: 'https://github.com/SharaawyMohamed/' }
    ];

    const getNavLinkClass = ({ isActive }) => 
        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            isActive 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
        }`;

    return (
        <header className="fixed w-full z-50 top-0 bg-white shadow-md">
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo and Brand */}
                        <div className="flex items-center gap-8">
                            <NavLink to="/" className="flex items-center space-x-3">
                                <img src={logo} className="h-8 w-auto" alt="Logo" />
                                <span className="text-xl font-bold text-gray-900">Flowbite</span>
                            </NavLink>

                            {/* Navigation Links - Only when logged in */}
                            {Token && (
                                <div className="hidden md:flex items-center space-x-1">
                                    {navLinks.map((link) => (
                                        <NavLink
                                            key={link.to}
                                            to={link.to}
                                            className={getNavLinkClass}
                                        >
                                            {link.label}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right side content */}
                        <div className="flex items-center space-x-4">
                            {/* Social Links - Only when logged in */}
                            {Token && (
                                <div className="hidden md:flex items-center space-x-3">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                            aria-label={social.icon.split(' ')[1]}
                                        >
                                            <i className={`${social.icon} text-lg`}></i>
                                        </a>
                                    ))}
                                </div>
                            )}

                            {/* Auth Buttons */}
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