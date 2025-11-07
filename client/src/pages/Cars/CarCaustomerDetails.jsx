import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useCustomerCar } from '../../hooks/useCars';
import { useCreateInquiry } from '../../hooks/useInquiries';
import { Container } from '../../components/layout/container';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Calendar, Gauge, Fuel, Cog, Palette, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Badge } from '../../components/common/Badge';

export const CustomerCarDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useCustomerCar(id);
    const createInquiry = useCreateInquiry();
    const [selectedImage, setSelectedImage] = useState(0);
    const [showInquiryModal, setShowInquiryModal] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    const car = data?.data?.car;
    const images = car?.images || [];
    const currentImage = images[selectedImage] || car?.thumbnail;

    const onSubmitInquiry = async (formData) => {
        try {
            await createInquiry.mutateAsync({
                carId: id,
                message: formData.message,
                phone: formData.phone,
            });
            setShowInquiryModal(false);
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return (
            <Container className="py-20">
                <LoadingSpinner size="lg" text="Loading..." />
            </Container>
        );
    }

    if (!car) {
        return (
            <Container className="py-20">
                <div className="text-center">
                    <p className="text-red-600">Car not found</p>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Images */}
                <div>
                    <div className="mb-4">
                        <img
                            src={currentImage?.url}
                            alt={`${car.brand} ${car.model}`}
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
                                    <img src={img.url} alt={`View ${idx + 1}`} className="w-full h-20 object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                {car.year} {car.brand} {car.model}
                            </h1>
                            <Badge variant={car.condition === 'excellent' ? 'success' : 'default'}>
                                {car.condition}
                            </Badge>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-primary-600">
                                ${car.price?.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 text-gray-700">
                            <Calendar size={20} className="text-primary-600" />
                            <div>
                                <p className="text-sm text-gray-500">Year</p>
                                <p className="font-semibold">{car.year}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                            <Gauge size={20} className="text-primary-600" />
                            <div>
                                <p className="text-sm text-gray-500">Mileage</p>
                                <p className="font-semibold">{car.mileage?.toLocaleString()} km</p>
                            </div>
                        </div>
                        {car.fuelType && (
                            <div className="flex items-center gap-3 text-gray-700">
                                <Fuel size={20} className="text-primary-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Fuel Type</p>
                                    <p className="font-semibold capitalize">{car.fuelType}</p>
                                </div>
                            </div>
                        )}
                        {car.transmission && (
                            <div className="flex items-center gap-3 text-gray-700">
                                <Cog size={20} className="text-primary-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Transmission</p>
                                    <p className="font-semibold capitalize">{car.transmission}</p>
                                </div>
                            </div>
                        )}
                        {car.color && (
                            <div className="flex items-center gap-3 text-gray-700">
                                <Palette size={20} className="text-primary-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Color</p>
                                    <p className="font-semibold">{car.color}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    {car.detailedDescription && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-gray-600">{car.detailedDescription}</p>
                        </div>
                    )}

                    {/* Features */}
                    {car.features && car.features.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Features</h3>
                            <div className="flex flex-wrap gap-2">
                                {car.features.map((feature, idx) => (
                                    <Badge key={idx} variant="default">
                                        {feature}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-3">
                        <Button
                            variant="primary"
                            className="w-full"
                            onClick={() => setShowInquiryModal(true)}
                        >
                            <MessageSquare size={20} className="mr-2" />
                            Inquire About This Car
                        </Button>
                        <Link to="/cars">
                            <Button variant="secondary" className="w-full">
                                Back to Cars
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Inquiry Modal */}
            <Modal
                isOpen={showInquiryModal}
                onClose={() => setShowInquiryModal(false)}
                title="Send Inquiry"
            >
                <form onSubmit={handleSubmit(onSubmitInquiry)} className="space-y-4">
                    <p className="text-gray-600">
                        Interested in this {car.year} {car.brand} {car.model}? Send us a message!
                    </p>

                    <Input
                        label="Phone Number (Optional)"
                        type="tel"
                        placeholder="+1234567890"
                        {...register('phone')}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                        </label>
                        <textarea
                            {...register('message', { required: true })}
                            rows={4}
                            className="input-field"
                            placeholder="I'm interested in this car..."
                            required
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                            isLoading={createInquiry.isPending}
                        >
                            Send Inquiry
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setShowInquiryModal(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        </Container>
    );
};
