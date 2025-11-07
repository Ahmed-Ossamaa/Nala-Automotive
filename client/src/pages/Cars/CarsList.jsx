import { Link } from 'react-router-dom';
import { usePublicCars } from '../../hooks/useCars';
import { Container } from '../../components/layout/container';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { Car } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
export const CarsList = () => {
    const { data, isLoading, error } = usePublicCars();
    const { user } = useAuth();

    const cars = data?.data?.cars || [];

    if (isLoading) {
        return (
            <Container className="py-20">
                <div className="flex justify-center">
                    <LoadingSpinner size="lg" text="Loading cars..." />
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-20">
                <div className="text-center">
                    <p className="text-red-600">Error loading cars: {error.message}</p>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Cars</h1>
                <p className="text-gray-600">Explore our collection of quality pre-owned vehicles</p>
            </div>

            {cars.length === 0 ? (
                <EmptyState
                    icon={Car}
                    title="No cars available"
                    description="Check back later for new listings"
                />
            ) : (
                <>
                    <div className="mb-6 text-sm text-gray-600">
                        Showing {cars.length} {cars.length === 1 ? 'car' : 'cars'}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cars.map((car) => (
                            <Link key={car._id} to={user ? `/cars/details/${car._id}` : `/cars/${car._id}`}>
                                <div className="card hover:shadow-lg transition-all">
                                    <div className="relative mb-4">
                                        <img
                                            src={car.thumbnail?.url}
                                            alt={`${car.brand} ${car.model}`}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                                            {car.year}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold mb-2">
                                        {car.brand} {car.model}
                                    </h3>

                                    {car.basicDescription && (
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {car.basicDescription}
                                        </p>
                                    )}
                                    {!user && (
                                        <div className="pt-4 border-t border-gray-100">
                                            <p className="text-primary-600 font-semibold">
                                                Login to see price
                                            </p>
                                        </div>
                                    )}

                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </Container>
    );
};