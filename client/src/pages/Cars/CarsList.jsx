import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePublicCars } from '../../hooks/useCars';
import { Container } from '../../components/layout/container';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { Car, Search, Filter, Lock, ArrowRight, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Pagination } from '../../components/common/Pagination';
import { motion } from 'framer-motion';

export const CarsList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({ brand: '', model: '', year: '', page: 1 });
    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    // debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500);
        return () => clearTimeout(timer);
    }, [filters]);

    const { data, isLoading, error } = usePublicCars(debouncedFilters);

    const cars = data?.data?.cars || [];
    const pagination = data?.pagination;

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/login');
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    if (error) {
        return (
            <Container className="py-24 min-h-[60vh] flex items-center justify-center">
                <div className="text-center bg-red-50 p-8 rounded-2xl border border-red-100 max-w-lg w-full">
                    <p className="text-red-600 font-medium text-lg">Error loading inventory</p>
                    <p className="text-red-500 text-sm mt-2">{error.message}</p>
                </div>
            </Container>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header & Filter Section */}
            <div className=" border-b border-gray-200 pt-8 pb-8 mb-8">
                <Container>
                    <div className=" mb-4 text-center">
                        <h1 className="text-lg md:text-2xl font-semibold  md:font-bold leading-relaxed">
                            Explore our carefully chosen luxury and sport cars.
                        </h1>
                    </div>
                    
                    {/* Search */}
                    <div className="bg-gray-100 px-4 py-2 rounded-2xl shadow-sm  flex flex-col md:flex-row gap-4 md:items-center w-full">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="search"
                                name="brand"
                                value={filters.brand}
                                onChange={handleFilterChange}
                                placeholder="Brand (e.g. Porsche)"
                                className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            />
                        </div>
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="search"
                                name="model"
                                value={filters.model}
                                onChange={handleFilterChange}
                                placeholder="Model (e.g. 911)"
                                className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            />
                        </div>
                        <div className="relative md:w-48">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="number"
                                min={1990}
                                name="year"
                                value={filters.year}
                                onChange={handleFilterChange}
                                placeholder="Year"
                                className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </Container>
            </div>

            <Container>
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4">
                        <LoadingSpinner size="lg" />
                        <p className="text-gray-500 font-medium">Curating vehicles...</p>
                    </div>
                ) : cars.length === 0 ? (
                    <div className="min-h-[40vh] flex items-center justify-center">
                        <EmptyState
                            icon={Car}
                            title="No vehicles found"
                            description="We couldn't find any cars matching your exact criteria. Try broadening your search."
                        />
                    </div>
                ) : (
                    <>
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Showing {cars.length} {cars.length === 1 ? 'Result' : 'Results'} 
                                {pagination?.totalItems > cars.length && ` of ${pagination.totalItems}`}
                            </p>
                        </div>

                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {cars.map((car) => (
                                <motion.div key={car._id} variants={itemVariants}>
                                    <Link 
                                        to={user ? `/cars/details/${car._id}` : `/cars/${car._id}`}
                                        className="group block h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                                    >
                                        {/* Image Header */}
                                        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                                            <img
                                                src={car.thumbnail?.url || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800'}
                                                alt={`${car.brand} ${car.model}`}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            
                                            {/* Status Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur-md shadow-sm
                                                    ${car.status === 'available' ? 'bg-white/90 text-green-700' : 'bg-white/90 text-red-700'}`}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${car.status === 'available' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                                                    {car.status.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Body */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
                                                <Calendar size={14} />
                                                <span>{car.year}</span>
                                            </div>
                                            
                                            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                                                {car.brand} {car.model}
                                            </h3>

                                            {car.basicDescription && (
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                                                    {car.basicDescription}
                                                </p>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-auto border-t border-gray-100">
                                            {!user ? (
                                                <div 
                                                    onClick={handleLoginClick}
                                                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-gray-600 transition-colors"
                                                >
                                                    <div className="flex items-center gap-2 font-medium">
                                                        <Lock size={16} className="text-gray-400" />
                                                        <span className="text-sm">Log in to unlock pricing</span>
                                                    </div>
                                                    <ArrowRight size={18} className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                                                </div>
                                            ) : (
                                                <div className="w-full p-4 flex items-center justify-between text-primary-600 bg-white group-hover:bg-primary-50 transition-colors">
                                                    <span className="text-sm font-semibold">View Full Details</span>
                                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {pagination && pagination.totalPages > 1 && (
                            <div className="mt-12">
                                <Pagination 
                                    currentPage={pagination.currentPage} 
                                    totalPages={pagination.totalPages} 
                                    onPageChange={handlePageChange} 
                                />
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
};