// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Search,
    MessageSquare,
    Shield,
    ArrowRight,
    Sparkles,
    TrendingUp,
    Award,
    ArrowUpRight,
    ListChecks,
    Phone,
    ClipboardCheck,
    KeyRound
} from "lucide-react";

import { Container } from "../components/layout/container";
import { Button } from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

// AnimatedNumber Component 
function AnimatedNumber({ value }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));
    useEffect(() => {
        const controls = animate(count, value, { duration: 2, ease: [0.08, 0.6, 0.5, 0.9] });
        return () => controls.stop();
    }, [value, count]);
    return <motion.span>{rounded}</motion.span>;
}

export const Home = () => {
    const { user } = useAuth();

    const features = [
        {
            icon: <Search className="w-8 h-8" />,
            title: "Smart Search",
            desc: "Find your perfect car with advanced filters and AI-powered search technology.",
            gradient: "from-blue-500 to-cyan-500",
            glowColor: "shadow-blue-500/20"
        },
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Direct Inquiries",
            desc: "Connect directly with sellers and dealerships instantly with one simple click.",
            gradient: "from-purple-500 to-pink-500",
            glowColor: "shadow-purple-500/20"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Verified Listings",
            desc: "Every car is verified for authenticity and transparency you can trust.",
            gradient: "from-green-500 to-emerald-500",
            glowColor: "shadow-green-500/20"
        }
    ];

    const howItWorksSteps = [
        {
            icon: ListChecks,
            title: "Find Your Car",
            desc: "Browse thousands of verified listings with our smart search and filtering."
        },
        {
            icon: Phone,
            title: "Connect with Seller",
            desc: "Contact the dealer or private seller directly through our secure platform."
        },
        {
            icon: ClipboardCheck,
            title: "Test Drive & Inspect",
            desc: "Schedule a test drive and get a professional inspection to ensure quality."
        },
        {
            icon: KeyRound,
            title: "Drive Away Happy",
            desc: "Finalize the paperwork, make a secure payment, and get your new keys."
        }
    ];

    const stats = [
        { label: "Cars Listed", value: 500, suffix: "+" },
        { label: "Happy Customers", value: 2, suffix: "K+" },
        { label: "Verified Dealers", value: 50, suffix: "+" }
    ];

    return (
        <div className="overflow-hidden bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center bg-linear-to-br from-black via-blue-00 to-slate-900">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-size-[64px_64px]"></div>

                <Container className="relative z-10 py-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-8"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Your Journey to the Perfect Car Starts Here</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight"
                        >
                            Find Your Dream Car with{" "}
                            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                NALA Automotive
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                        >
                            Explore premium listings, connect with verified dealers, and drive away in confidence. Your perfect match is just a click away.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            {!user ? (
                                <>
                                    <Link to="/register" className="w-full sm:w-auto">
                                        <Button
                                            size="lg"
                                            variant="primary"
                                            className="w-full sm:w-auto group shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 transform transition-all duration-300"
                                        >
                                            Get Started
                                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform inline-block" />
                                        </Button>
                                    </Link>
                                    <Link to="/cars" className="w-full sm:w-auto">
                                        <Button
                                            size="lg"
                                            variant="secondary"
                                            className="w-full sm:w-auto backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 transform transition-all duration-300"
                                        >
                                            Browse Cars
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <Link to="/cars" className="w-full sm:w-auto">
                                    <Button
                                        size="lg"
                                        variant="primary"
                                        className="w-full sm:w-auto group shadow-xl shadow-blue-500/25 hover:scale-105 transform transition-all duration-300"
                                    >
                                        Browse Cars
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform inline-block" />
                                    </Button>
                                </Link>
                            )}
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="mt-10 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                        >
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                        <AnimatedNumber value={stat.value} />
                                        {stat.suffix}
                                    </div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </Container>

                {/* Scroll anime */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-25 right-1/99 -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-linear-to-b from-white to-gray-50">
                <Container>
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-semibold mb-4"
                        >
                            <Award className="w-4 h-4" />
                            Why Choose Us
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-4xl font-bold text-gray-900 mb-4"
                        >
                            A Trusted Experience for Every Buyer
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-600"
                        >
                            We make car buying simple, transparent, and enjoyable.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                whileHover={{ scale: 1.02 }}
                                className={`group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50`}
                            >
                                <div
                                    className={`absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            blur-lg rounded-2xl ${feature.glowColor}`}
                                />

                                <div className="relative z-10">
                                    <ArrowUpRight className="absolute -top-3 -right-3 w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                                    <div className={`relative w-16 h-16 bg-linear-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                                        {/* icon with Glow effect */}
                                        <div className="absolute inset-0.5 rounded-xl bg-white/60 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative z-10">{feature.icon}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                                </div>

                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-gray-50">
                <Container>
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                        >
                            Your New Car in 4 Simple Steps
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-600"
                        >
                            From browsing to buying, we've streamlined the entire process.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pt-6">
                        {howItWorksSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ scale: 1.03, y: -4 }}
                                className="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center transition-transform"
                            >
                                {/* circular Step Number */}
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center 
                              bg-white border-2 border-blue-500 text-blue-500 rounded-full font-bold text-lg shadow-md">
                                    {i + 1}
                                </div>

                                <div className="flex justify-center mb-6 pt-8">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                        <step.icon className="w-8 h-8" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA Section  */}
            <section className="relative py-24 overflow-hidden bg-slate-900">


                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                    <div className="w-[800px] h-[400px] bg-linear-to-tr from-blue-600/20 via-purple-600/10 to-transparent blur-3xl opacity-50" />
                </div>


                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-size-[64px_64px] opacity-50"></div>

                <Container className="relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-6">
                            <TrendingUp className="w-4 h-4" />
                            Join Thousands of Happy Buyers
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Ready to Start Your Journey?
                        </h2>

                        <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                            Join thousands of satisfied buyers and find your next car today. The perfect ride is waiting for you.
                        </p>

                        {!user ? (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/register">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
                                    >
                                        Get Started Free
                                        <ArrowRight className="ml-2 w-5 h-5 inline-block" />
                                    </Button>
                                </Link>
                                <Link to="/cars">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:scale-105 transform transition-all duration-300"
                                    >
                                        Browse Cars
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Link to="/cars">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    className="bg-white text-blue-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
                                >
                                    Browse Available Cars
                                    <ArrowRight className="ml-2 w-5 h-5 inline-block" />
                                </Button>
                            </Link>
                        )}
                    </motion.div>
                </Container>
            </section>
        </div>
    );
}