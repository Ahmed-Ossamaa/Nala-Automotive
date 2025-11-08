import { useParams, Link } from 'react-router-dom';
import { useIncrementCarView, usePublicCar } from '../../hooks/useCars';
import { Container } from '../../components/layout/container';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Calendar, Eye } from 'lucide-react';
import { useState } from 'react';


export const PublicCarDetails = () => {
    const { id } = useParams();
    const { data, isLoading, error } = usePublicCar(id);
    const [selectedImage, setSelectedImage] = useState(0);

    const car = data?.data?.car;

    useIncrementCarView(car, id);//for car views per visit (wrapped in useEffect)

    if (isLoading) {
        return (
            <Container className="py-20">
                <div className="flex justify-center">
                    <LoadingSpinner size="lg" text="Loading car details..." />
                </div>
            </Container>
        );
    }

    if (error || !car) {
        return (
            <Container className="py-20">
                <div className="text-center">
                    <p className="text-red-600">Car not found or Unavailable</p>
                    <Link to="/cars">
                        <Button className="mt-4">Back to Cars</Button>
                    </Link>
                </div>
            </Container>
        );
    }

    const images = car.images || [];
    const currentImage = images[selectedImage] || car.thumbnail;

    return (
        <Container className="py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Images */}
                <div>
                    <div className="mb-4">
                        <img
                            src={currentImage?.url}
                            alt={`${car.make} ${car.model}`}
                            className="w-full h-96 object-cover rounded-xl"
                        />
                    </div>

                    {images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`border-2 rounded-lg overflow-hidden ${selectedImage === idx ? 'border-primary-600' : 'border-gray-200'
                                        }`}
                                >
                                    <img
                                        src={img.url}
                                        alt={`View ${idx + 1}`}
                                        className="w-full h-20 object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {car.year} {car.make} {car.model}
                    </h1>

                    <div className="flex items-center gap-4 mb-6 text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar size={20} />
                            <span>{car.year}</span>
                        </div>
                        {car.views && (
                            <div className="flex items-center gap-2">
                                <Eye size={20} />
                                <span>{car.views} views</span>
                            </div>
                        )}
                    </div>

                    {car.basicDescription && (
                        <p className="text-gray-600 mb-8">{car.basicDescription}</p>
                    )}

                    {/* Login CTA */}
                    <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-8 text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Want to see the price?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Login to view full details including price, mileage, and more
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link to="/login">
                                <Button variant="primary" size="lg">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="outline" size="lg">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <Link to="/cars">
                        <Button variant="secondary" className="w-full">
                            Back to Cars
                        </Button>
                    </Link>
                </div>
            </div>
        </Container>
    );
};