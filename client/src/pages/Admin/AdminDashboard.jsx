import { useDashboardStats } from '../../hooks/useAdmin';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import {
    Car,
    TrendingUp,
    ShoppingCart,
    PlusCircle,
    List,
    AlertCircle
} from 'lucide-react';

export const AdminDashboard = () => {
    const { data, isLoading } = useDashboardStats();

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" text="Loading dashboard..." />
            </div>
        );
    }

    const stats = data?.data;

    const StatCard = (props) => {
        const { icon: Icon, label, value, color = 'primary' } = props;
        return (
            <Card className="hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">{label}</p>
                        <p className="text-2xl lg:text-3xl font-bold text-gray-900">{value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`text-${color}-600`} size={24} />
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Overview</h1>
            </div>

            {/* Action Needed Alert */}
            {(stats?.inquiries?.new > 0) && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3">
                        <div className="flex-shrink-0 mt-1 sm:mt-0">
                            <AlertCircle className="text-red-600" size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-red-900">Action Needed: New Inquiries</h3>
                            <p className="text-red-700 text-sm">
                                You have {stats.inquiries.new} new {stats.inquiries.new === 1 ? 'inquiry' : 'inquiries'} waiting for a response.
                            </p>
                        </div>
                    </div>
                    <Link to="/admin/inquiries" className="w-full sm:w-auto">
                        <Button variant="danger" size="sm" className="w-full sm:w-auto justify-center">
                            View Inquiries
                        </Button>
                    </Link>
                </div>
            )}

            {/* Inventory Stats */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Inventory</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={Car}
                        label="Total Cars"
                        value={stats?.inventory?.total || 0}
                        color="blue"
                    />
                    <StatCard
                        icon={ShoppingCart}
                        label="Available"
                        value={stats?.inventory?.available || 0}
                        color="green"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Sold"
                        value={stats?.inventory?.sold || 0}
                        color="purple"
                    />
                    <StatCard
                        icon={Car}
                        label="Pending"
                        value={stats?.inventory?.pending || 0}
                        color="yellow"
                    />
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <PlusCircle className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Add New Car</h3>
                                    <p className="text-sm text-gray-600">List a new vehicle in your inventory</p>
                                </div>
                            </div>
                            <Link to="/admin/cars/create" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto justify-center">Add Car</Button>
                            </Link>
                        </div>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <List className="text-green-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Manage Inventory</h3>
                                    <p className="text-sm text-gray-600">View and edit your current stock</p>
                                </div>
                            </div>
                            <Link to="/admin/cars" className="w-full sm:w-auto">
                                <Button variant="secondary" className="w-full sm:w-auto justify-center">Cars</Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};