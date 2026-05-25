import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCreateCar } from '../../hooks/useCars';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { ImageUpload } from '../../components/common/ImageUpload';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';


export const CreateCar = () => {
  const navigate = useNavigate();
  const createCar = useCreateCar();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);

  const onSubmit = async (data) => {

    const formData = new FormData();

    // Add text fields (skip empty strings)
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        formData.append(key, data[key]);
      }
    });

    // Add thumbnail
    if (thumbnail && thumbnail.length > 0) {
      formData.append('thumbnail', thumbnail[0]);
    } else {
      toast.error('Thumbnail image is required');
      return;
    }

    // Add images
    if (images && images.length > 0) {
      images.forEach(image => {
        formData.append('images', image);
      });
    }

    try {
      await createCar.mutateAsync(formData);
      navigate('/admin/cars');
    } catch (error) {
      console.error(error);
    }
  };

  const onInvalid = (errors) => {
    // Collect all error messages
    const errorMessages = Object.values(errors).map(err => err.message).filter(Boolean);
    if (errorMessages.length > 0) {
      // Showing up to 3 errors
      const displayErrors = errorMessages.slice(0, 3);
      const more = errorMessages.length > 3 ? `\n...and ${errorMessages.length - 3} more` : '';
      toast.error(`Please fix the form errors:\n${displayErrors.join('\n')}${more}`, { duration: 5000 });
    } else {
      toast.error('Please fill in all required fields correctly');
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Car</h1>
        <p className="text-gray-600">Fill in the details to add a new car to inventory</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="max-w-6xl">
        <div className="rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Brand *"
                placeholder="Toyota"
                error={errors.brand?.message}
                {...register('brand', { required: 'Brand is required' })}
              />
              <Input
                label="Model *"
                placeholder="Camry"
                error={errors.model?.message}
                {...register('model', { required: 'Model is required' })}
              />
              <Input
                label="Year *"
                type="number"
                placeholder="2020"
                error={errors.year?.message}
                {...register('year', { required: 'Year is required', min: { value: 1900, message: 'Year must be after 1900' } })}
              />
              <Input
                label="Color"
                placeholder="Silver"
                {...register('color')}
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Images</h3>
            <div className="space-y-4">
              <ImageUpload
                label="Thumbnail *"
                onChange={setThumbnail}
                maxFiles={1}
                id="thumbnail-upload"
              />
              <ImageUpload
                label="Additional Images"
                multiple
                maxFiles={10}
                id="images-upload"
                onChange={setImages}
              />
            </div>
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
                placeholder="50000"
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
                placeholder="25000"
                error={errors.price?.message}
                {...register('price', { required: 'Selling price is required' })}
              />
              <Input
                label="Buying Cost *"
                type="number"
                placeholder="20000"
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
          </div>

          {/* Description */}
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

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              isLoading={createCar.isPending}
            >
              Create Car
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