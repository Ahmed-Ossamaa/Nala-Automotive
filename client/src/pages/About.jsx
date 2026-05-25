// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Award, Users, ArrowRight, TrendingUp, Car, Globe, CheckCircle } from "lucide-react";

import { Container } from "../components/layout/container";
import { Button } from "../components/common/Button";

const aboutImageUrl = "https://images.unsplash.com/photo-1614244788272-f6dcdfd8df9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687";

export const About = () => {
    // Staggered animation for list items
    const listVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.6,
                ease: "easeOut"
            },
        }),
    };

    const coreValues = [
        {
            icon: <Shield className="w-7 h-7" />,
            title: "Unwavering Trust",
            desc: "Every listing is rigorously verified, and every transaction is completely transparent. Honesty is the engine of our business."
        },
        {
            icon: <Award className="w-7 h-7" />,
            title: "Premium Quality",
            desc: "We are obsessed with excellence. We exclusively curate vehicles that meet our strict standards for performance, history, and condition."
        },
        {
            icon: <Users className="w-7 h-7" />,
            title: "Community First",
            desc: "NALA Automotive is a destination for enthusiasts and discerning buyers who share a profound passion for exceptional vehicles."
        }
    ];

    const milestones = [
        { icon: <Car className="w-6 h-6" />, value: "5,000+", label: "Vehicles Delivered" },
        { icon: <CheckCircle className="w-6 h-6" />, value: "100%", label: "Verified Listings" },
        { icon: <Globe className="w-6 h-6" />, value: "24/7", label: "Client Support" },
    ];

    return (
        <div className="bg-white overflow-hidden selection:bg-primary-100 selection:text-primary-900">
            
            {/* 1. Hero Section */}
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative bg-gradient-to-b from-gray-50 to-white pt-24 pb-20 md:pt-32 md:pb-24"
            >
                {/* Subtle background decoration */}
                <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[bottom_1px_center] mask-image:linear-gradient(to_bottom,transparent,black)" />
                
                <Container className="relative text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold tracking-wider uppercase mb-6">
                            About NALA Automotive
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                            Driving Trust in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">Every Mile</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            We are a collective of automotive enthusiasts dedicated to engineering the most transparent, secure, and premium car-buying experience on the market.
                        </p>
                    </motion.div>
                </Container>
            </motion.section>

            {/* 2. Our Story Section */}
            <section className="py-16 md:py-24 relative">
                <Container className="px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Image Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="relative group"
                        >
                            {/* Decorative offset box */}
                            <div className="absolute -inset-4 bg-gray-100 rounded-3xl transform rotate-2 group-hover:rotate-1 transition duration-500 hidden md:block" />
                            <img 
                                src={aboutImageUrl} 
                                alt="Modern luxury car dealership interior" 
                                className="relative rounded-2xl shadow-xl object-cover w-full h-full aspect-[4/3] lg:aspect-[4/5] z-10 transition duration-500 group-hover:shadow-2xl"
                            />
                        </motion.div>

                        {/* Text Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                                    We're More Than a Marketplace. <br className="hidden lg:block"/> We're Your Partner.
                                </h2>
                                <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
                                    <p>
                                        Founded in 2024, NALA Automotive was born from a simple realization: the luxury car market deserved a better standard. We were tired of opaque pricing, unverified listings, and the sheer disconnect between buyers and sellers.
                                    </p>
                                    <p>
                                        Our mission is to fuse cutting-edge technology with an unyielding passion for cars. We connect discerning buyers with the finest vehicles, ensuring every step of your journey is seamless, secure, and deeply satisfying.
                                    </p>
                                </div>
                            </div>

                            {/* Progress / Milestones (Ready for backend data) */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                                {milestones.map((stat, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="text-primary-600">{stat.icon}</div>
                                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                        <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* 3. Our Values Section */}
            <section className="bg-gray-50 py-20 md:py-32">
                <Container className="px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                            Our Commitment to You
                        </h2>
                        <p className="text-lg text-gray-600">
                            These core principles guide every line of code we write, every partnership we build, and every vehicle we list.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                        {coreValues.map((value, i) => (
                            <motion.div
                                key={value.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={listVariants}
                                className="bg-white p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* 4. CTA Section */}
            <section className="py-24 relative overflow-hidden">
                {/* Background styling for CTA */}
                <div className="absolute inset-0 bg-blue-900" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-primary-900 opacity-90" />
                
                <Container className="relative text-center px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-8 text-blue-100">
                            <TrendingUp className="w-4 h-4" />
                            Join Thousands of Happy Buyers
                        </div>
                        
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
                            Ready to Find Your Next Car?
                        </h2>
                        
                        <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Browse our curated collection of verified premium vehicles today. Your dream drive is just a few clicks away.
                        </p>
                        
                        <Link to="/cars">
                            <Button
                                size="lg"
                                className="bg-white text-primary-900 hover:bg-gray-50 shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 font-semibold px-8 py-4 rounded-xl"
                            >
                                Browse Our Inventory
                                <ArrowRight className="ml-2 w-5 h-5 inline-block" />
                            </Button>
                        </Link>
                    </motion.div>
                </Container>
            </section>
        </div>
    );
};