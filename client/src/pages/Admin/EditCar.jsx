import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAdminCar, useUpdateCar } from '../../hooks/useCars';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { ImageUpload } from '../../components/common/ImageUpload';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export const EditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useAdminCar(id);
    const updateCar = useUpdateCar();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);

    const car = data?.data;

    useEffect(() => {
        if (car) {
            reset(car);
        }
    }, [car, reset]);

    const onSubmit = async (data) => {
        const formData = new FormData();

        // Add text fields (skip empty strings)
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined && data[key] !== null && data[key] !== '' && key !== 'thumbnail' && key !== 'images') {
                formData.append(key, data[key]);
            }
        });

        // Add new thumbnail if uploaded
        if (thumbnail && thumbnail.length > 0) {
            formData.append('thumbnail', thumbnail[0]);
        }

        // Add new images if uploaded
        if (images && images.length > 0) {
            images.forEach(image => {
                formData.append('images', image);
            });
        }

        try {
            await updateCar.mutateAsync({ id, formData });
            navigate('/admin/cars');
        } catch (error) {
            console.error(error);
        }
    };

    const onInvalid = (errors) => {
        const errorMessages = Object.values(errors).map(err => err.message || 'Required field missing').filter(Boolean);
        if (errorMessages.length > 0) {
            const displayErrors = errorMessages.slice(0, 3);
            const more = errorMessages.length > 3 ? `\n...and ${errorMessages.length - 3} more` : '';
            toast.error(`Please fix the form errors:\n${displayErrors.join('\n')}${more}`, { duration: 5000 });
        } else {
            toast.error('Please fill in all required fields correctly');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" text="Loading car..." />
            </div>
        );
    }

    if (!car) {
        return <div>Car not found</div>;
    }

    return (
        <div>
            <div className="mb-8">
                <Button
                    variant="secondary"
                    onClick={() => navigate('/admin/cars')}
                    className="mb-4 flex"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Cars
                </Button>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Car</h1>
                <p className="text-gray-600">
                    Update details for {car.year} {car.brand} {car.model}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="max-w-6xl">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">

                    {/* Basic Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input 
                                label="Brand *" 
                                error={errors?.brand?.message} 
                                {...register('brand', { required: 'Brand is required' })} 
                            />
                            <Input 
                                label="Model *" 
                                error={errors.model?.message} 
                                {...register('model', { required: 'Model is required' })} 
                            />
                            <Input 
                                label="Year *" 
                                type="number" 
                                error={errors.year?.message} 
                                {...register('year', { required: 'Year is required', min: { value: 1900, message: 'Year must be after 1900' } })} 
                            />
                            <Input 
                                label="Color" 
                                {...register('color')} 
                            />
                            <Select label="Status"
                                options={[
                                    { value: 'available', label: 'Available' },
                                    { value: 'pending', label: 'Pending' },
                                    { value: 'sold', label: 'Sold' },
                                ]}
                                {...register('status')} />
                        </div>
                    </div>

                    {/* Current Images */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Current Images</h3>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {car.images?.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img.url}
                                    alt={`Car ${idx + 1}`}
                                    className="w-full h-24 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                        <ImageUpload
                            label="Replace Thumbnail"
                            onChange={setThumbnail}
                            maxFiles={1}
                        />
                        <ImageUpload
                            label="Replace All Images"
                            multiple
                            maxFiles={10}
                            onChange={setImages}
                        />
                    </div>

                    {/* Specifications */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Engine Size (CC)"
                                type="number"
                                placeholder="2000"
                                error={errors.engineSize?.message}
                                {...register('engineSize')}
                            />
                            <Input 
                                label="Mileage (km) *"
                                type="number"
                                error={errors.mileage?.message}
                                {...register('mileage', { required: 'Mileage is required' })}
                            />
                            <Select
                                label="Transmission"
                                options={[
                                    { value: 'automatic', label: 'Automatic' },
                                    { value: 'manual', label: 'Manual' },
                                    { value: 'cvt', label: 'CVT' },
                                ]}
                                {...register('transmission')}
                            />
                            <Select
                                label="Fuel Type"
                                options={[
                                    { value: 'petrol', label: 'Petrol' },
                                    { value: 'diesel', label: 'Diesel' },
                                    { value: 'electric', label: 'Electric' },
                                    { value: 'hybrid', label: 'Hybrid' },
                                ]}
                                {...register('fuelType')}
                            />
                            <Select
                                label="Condition"
                                options={[
                                    { value: 'excellent', label: 'Excellent' },
                                    { value: 'good', label: 'Good' },
                                    { value: 'fair', label: 'Fair' },
                                    { value: 'needs_work', label: 'Needs Work' },
                                ]}
                                {...register('condition')}
                            />
                        </div>
                    </div>

                    {/* Pricing */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input 
                                label="Selling Price *"
                                type="number" 
                                error={errors.price?.message}
                                {...register('price', { required: 'Selling price is required' })}
                            />
                            <Input 
                                label="Buying Cost *"
                                type="number"
                                error={errors.buyingCost?.message}
                                {...register('buyingCost', { required: 'Buying cost is required' })}
                            />
                            <Input
                                label="Maintenance Cost"
                                type="number"
                                error={errors.maintenanceCosts?.message}
                                {...register('maintenanceCosts')}
                            />
                            <Input
                                label="Parts Cost"
                                type="number"
                                error={errors.partsCosts?.message}
                                {...register('partsCosts')}
                            />
                            <Input
                                label="Other Costs"
                                type="number"
                                error={errors.otherCosts?.message}
                                {...register('otherCosts')}
                            />
                            <Input
                                label="Purchase Date"
                                type="date"
                                error={errors.purchaseDate?.message}
                                {...register('purchaseDate')}
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Description</h3>
                            <textarea
                                className="input-field w-full px-4 py-2 border rounded-lg"
                                rows={3}
                                placeholder="Brief description (visible to guests)"
                                {...register('basicDescription')}
                            />
                            <textarea
                                className="input-field w-full px-4 py-2 border rounded-lg mt-4"
                                rows={5}
                                placeholder="Detailed description (visible to logged-in users)"
                                {...register('detailedDescription')}
                            />
                            <textarea
                                className="input-field w-full px-4 py-2 border rounded-lg mt-4"
                                rows={3}
                                placeholder="Admin notes"
                                {...register('adminNotes')}
                            />

                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={updateCar.isPending}
                        >
                            Update Car
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate('/admin/cars')}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};