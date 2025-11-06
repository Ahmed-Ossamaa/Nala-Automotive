import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminCars, useMarkCarAsSold, useDeleteCar } from '../../hooks/useCars';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Plus, Edit, Trash2, CheckCircle, Eye } from 'lucide-react';

export const AdminCars = () => {
    const [statusFilter, setStatusFilter] = useState('');
    const { data, isLoading } = useAdminCars({ status: statusFilter });
    const markAsSold = useMarkCarAsSold();
    const deleteCar = useDeleteCar();
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, car: null });

    const cars = data?.data || [];

    const handleMarkAsSold = async (id) => {
        if (confirm('Mark this car as sold?')) {

            await markAsSold.mutateAsync(id);
        }
    };

    const handleDelete = async () => {
        if (deleteModal.car) {
            await deleteCar.mutateAsync(deleteModal.car._id);
            setDeleteModal({ isOpen: false, car: null });
        }
    };

    const getStatusBadge = (status) => {
        const variants = {
            available: 'success',
            sold: 'default',
            pending: 'warning',
        };
        return <Badge variant={variants[status]}>{status}</Badge>;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" text="Loading cars..." />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Cars</h1>
                    <p className="text-gray-600">View and manage all vehicles in inventory</p>
                </div>
                <Link to="/admin/cars/create">
                    <Button variant="success" className='flex'>
                        <Plus size={20} className="mr-2" />
                        Add New Car
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className=" rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex gap-3">
                    <Button
                        variant={statusFilter === '' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setStatusFilter('')}
                    >
                        All ({data?.count || 0})
                    </Button>
                    <Button
                        variant={statusFilter === 'available' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setStatusFilter('available')}
                    >
                        Available
                    </Button>
                    <Button
                        variant={statusFilter === 'sold' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setStatusFilter('sold')}
                    >
                        Sold
                    </Button>
                    <Button
                        variant={statusFilter === 'pending' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setStatusFilter('pending')}
                    >
                        Pending
                    </Button>
                </div>
            </div>

            {/* Cars Table */}
            <div className=" rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profit</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {cars.map((car) => (
                            <tr key={car._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={car.thumbnail?.url}
                                            alt={`${car.brand} ${car.model}`}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {car.year} {car.brand} {car.model}
                                            </p>
                                            <p className="text-sm text-gray-600">{car.mileage?.toLocaleString()} km</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-900 font-semibold">
                                    ${car.price?.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    ${car.totalCosts?.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`font-semibold ${car.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        ${car.profitMargin?.toLocaleString()}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {getStatusBadge(car.status)}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Eye size={16} />
                                        {car.views || 0}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link to={`/admin/cars/edit/${car._id}`}>
                                            <Button variant="secondary" size="sm">
                                                <Edit size={16} />
                                            </Button>
                                        </Link>
                                        {car.status === 'available' && (
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => {handleMarkAsSold(car._id);}}
                                            >
                                                <CheckCircle size={16} />
                                            </Button>
                                        )}
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => setDeleteModal({ isOpen: true, car })}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {cars.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No cars found</p>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, car: null })}
                title="Delete Car"
            >
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete{' '}
                    <strong>
                        {deleteModal.car?.brand} {deleteModal.car?.model} {deleteModal.car?.year}
                    </strong>
                    ? This action cannot be undone and will delete all associated images.
                </p>
                <div className="flex gap-3">
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        isLoading={deleteCar.isPending}
                        className="flex-1"
                    >
                        Delete Permanently
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setDeleteModal({ isOpen: false, car: null })}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal>
        </div>
    );
};
