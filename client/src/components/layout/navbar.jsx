import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard, MessageSquare, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    
    const { user, isAuthenticated, logout, isAdmin } = useAuth();
    const location = useLocation();
    
    const dropdownRef = useRef(null);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close menus on route change
    useEffect(() => {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        await logout();
        setIsProfileOpen(false);
        setIsMenuOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 md:h-15 relative">
                    
                    <div className="flex-shrink-0 z-10">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-primary-600 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-transform duration-300 transform group-hover:-translate-y-0.5">
                                <span className="text-white font-bold text-base md:text-lg tracking-tight">NA</span>
                            </div>
                            <span className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight">NALA</span>
                        </Link>
                    </div>

                    {/*nav links */}
                    <div className="hidden md:flex absolute inset-0 justify-center items-center pointer-events-none">
                        <div className="flex items-center space-x-8 pointer-events-auto">
                            <Link 
                                to="/" 
                                className={`font-medium transition-colors duration-200 ${isActive('/') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/cars" 
                                className={`font-medium transition-colors duration-200 ${isActive('/cars') ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
                            >
                                Browse Cars
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center flex-shrink-0 z-10">
                        {isAuthenticated ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 px-3 py-1.5 border border-transparent rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                                >
                                    <div className="w-8 h-8 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center">
                                        <User size={16} />
                                    </div>
                                    <span className="max-w-[120px] truncate">{user?.name || 'Account'}</span>
                                    <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.15, ease: "easeOut" }}
                                            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 origin-top-right"
                                        >
                                            <div className="px-4 py-3 border-b border-gray-50 mb-2">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                            </div>

                                            {isAdmin ? (
                                                <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors">
                                                    <LayoutDashboard size={16} />
                                                    Dashboard
                                                </Link>
                                            ) : (
                                                <Link to="/inquiries" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors">
                                                    <MessageSquare size={16} />
                                                    My Inquiries
                                                </Link>
                                            )}

                                            <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors">
                                                <User size={16} />
                                                My Profile
                                            </Link>
                                            
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors mt-1 border-t border-gray-50"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu toggle */}
                    <div className="md:hidden flex items-center z-10">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 -mr-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition-colors focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden border-t border-gray-100 bg-white overflow-hidden shadow-lg absolute w-full"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-2">
                            <Link
                                to="/"
                                className={`block px-4 py-3 rounded-xl font-medium ${isActive('/') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/cars"
                                className={`block px-4 py-3 rounded-xl font-medium ${isActive('/cars') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                Browse Cars
                            </Link>

                            <div className="mt-4 border-t border-gray-100 pt-4">
                                {isAuthenticated ? (
                                    <div className="space-y-1">
                                        <div className="px-4 py-2 mb-1 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary-50 text-primary-700 rounded-full flex items-center justify-center">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                                <p className="text-xs text-gray-500">{user?.email}</p>
                                            </div>
                                        </div>
                                        
                                        {isAdmin ? (
                                            <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">
                                                <LayoutDashboard size={18} className="text-gray-400" />
                                                Dashboard
                                            </Link>
                                        ) : (
                                            <Link to="/inquiries" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">
                                                <MessageSquare size={18} className="text-gray-400" />
                                                My Inquiries
                                            </Link>
                                        )}

                                        <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">
                                            <User size={18} className="text-gray-400" />
                                            My Profile
                                        </Link>
                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium mt-2">
                                            <LogOut size={18} />
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3 px-2 pt-2">
                                        <Link to="/login" className="block w-full text-center px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-50 border border-gray-200">
                                            Log in
                                        </Link>
                                        <Link to="/register" className="block w-full text-center px-4 py-3 text-white bg-primary-600 font-medium rounded-xl hover:bg-primary-700 shadow-sm">
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};