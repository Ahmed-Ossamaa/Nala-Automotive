// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Award, Users, ArrowRight, TrendingUp } from "lucide-react";


import { Container } from "../components/layout/container";
import { Button } from "../components/common/Button";


const aboutImageUrl = "https://images.unsplash.com/photo-1614244788272-f6dcdfd8df9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687";

export const About = () => {
    
    // Staggered animation for list items
    const listVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.5,
                ease: "easeOut"
            },
        }),
    };

    const coreValues = [
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Unwavering Trust",
            desc: "Every listing is verified, and every transaction is transparent. We build trust by ensuring honesty is at the core of everything we do."
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Premium Quality",
            desc: "We are passionate about excellence. We only list vehicles that meet our high standards for quality, performance, and condition."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Community Focus",
            desc: "NALA Automotive is more than a platform; it's a community for enthusiasts and buyers who share a passion for exceptional vehicles."
        }
    ];

    return (
        <div className="bg-white overflow-hidden">
            
            {/* 1. Hero Section */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-gray-50 py-24 sm:py-32"
            >
                <Container className="text-center max-w-4xl">
                    <p className="text-base font-semibold text-primary-600 mb-3">
                        About Us
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Driving Trust in Every Mile
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        We are NALA Automotive, a team of passionate enthusiasts dedicated to creating the most transparent and premium car-buying experience.
                    </p>
                </Container>
            </motion.section>

            {/* 2. Our Story Section */}
            <section className="py-10 sm:py-15">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <img 
                                src={aboutImageUrl} 
                                alt="Modern car dealership interior" 
                                className="rounded-2xl shadow-2xl object-fill w-full h-full aspect-4/3"
                            />
                        </motion.div>

                        {/* Text Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                We're More Than Just a Marketplace. We're Your Partner.
                            </h2>
                            <p className="text-lg text-gray-600">
                                Founded in 2024, NALA Automotive was born from a simple idea: the luxury car market deserved better. We were tired of opaque pricing, unverified listings, and the disconnect between buyers and sellers.
                            </p>
                            <p className="text-lg text-gray-600">
                                Our mission is to combine cutting-edge technology with a genuine passion for cars to create a platform built on a foundation of trust. We connect discerning buyers with the finest vehicles, ensuring every step of the journey is simple, secure, and satisfying.
                            </p>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* 3. Our Values Section */}
            <section className="bg-gray-50 py-24 sm:py-32">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Commitment to You
                        </h2>
                        <p className="text-lg text-gray-600">
                            These values guide every decision we make and every car we list.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {coreValues.map((value, i) => (
                            <motion.div
                                key={value.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                variants={listVariants}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                            >
                                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
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

            {/* 4. CTA Section (Light Version) */}
            <section className="py-24 bg-white">
                <Container className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-sm font-medium mb-6 text-blue-700">
                            <TrendingUp className="w-4 h-4" />
                            Join Thousands of Happy Buyers
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                            Ready to Find Your Next Car?
                        </h2>
                        
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                            Browse our curated collection of verified premium vehicles today. Your dream car is waiting.
                        </p>
                        
                        <Link to="/cars">
                            <Button
                                size="lg"
                                variant="primary"
                                className="shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
                            >
                                Browse Cars
                                <ArrowRight className="ml-2 w-5 h-5 inline-block" />
                            </Button>
                        </Link>
                    </motion.div>
                </Container>
            </section>
        </div>
    );
};