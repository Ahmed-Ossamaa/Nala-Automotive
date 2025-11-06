import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { FaInstagram,FaFacebookF ,FaTwitter  } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-linear-to-t from-black to-slate-900 text-gray-300 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div >
                        <h3 className="text-white font-bold text-lg mb-4">Nala-Auto</h3>
                        <p className="text-sm">
                            Your trusted platform for quality pre-owned vehicles.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">

                            <li>
                                <Link to="/about" className="hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>+971 50 437 1312 </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} />
                                <span><a href="mailto:Amr@NalaAuto.com">Amr@NalaAuto.com</a></span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/" className="hover:text-white transition-colors">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="https://www.x.com/" className="hover:text-white transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://www.instagram.com/" className="hover:text-white transition-colors">
                                <FaInstagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};