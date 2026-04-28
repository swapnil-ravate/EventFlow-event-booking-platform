import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaTicketAlt, FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const isActive = (path) => location.pathname === path;

    // A helper to assign classes for active vs inactive links
    const getLinkClasses = (path) => {
        return `transition-colors duration-300 font-medium ${isActive(path)
            ? 'text-indigo-400'
            : 'text-gray-300 hover:text-indigo-300'
            }`;
    };

    return (
        <nav className="bg-gray-900/95 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-gray-800 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" onClick={closeMenu} className="text-white text-2xl font-bold flex items-center gap-2 hover:text-indigo-400 transition-colors duration-300">
                            <FaTicketAlt className="text-indigo-500" />
                            <span className="tracking-wide">EventFlow</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
                        <Link to="/" className={getLinkClasses('/')}>Home</Link>
                        {/* <Link to="/" className={getLinkClasses('/')}>Events</Link> */}
                        {user && (
                            <Link
                                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                className={getLinkClasses(user.role === 'admin' ? '/admin' : '/dashboard')}
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer">
                                    <FaUserCircle className="text-xl text-indigo-400" />
                                    <span className="font-medium">{user?.name || 'Profile'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg font-semibold transition-all duration-300 border border-red-500/20"
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-300 hover:text-white font-medium transition-colors duration-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md shadow-indigo-600/20"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-white focus:outline-none p-2 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pt-2 pb-6 space-y-1 bg-gray-900 border-t border-gray-800">
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                        Events
                    </Link>
                    {user && (
                        <Link
                            to={user.role === 'admin' ? '/admin' : '/dashboard'}
                            onClick={closeMenu}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                            Dashboard
                        </Link>
                    )}

                    <div className="pt-4 mt-2 border-t border-gray-800">
                        {user ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 px-3 py-2 text-gray-300">
                                    <FaUserCircle className="text-2xl text-indigo-400" />
                                    <span className="font-medium">{user?.name || 'Profile'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg font-semibold transition-all duration-300 border border-red-500/20"
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-3 px-3">
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="w-full text-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md shadow-indigo-600/20"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
