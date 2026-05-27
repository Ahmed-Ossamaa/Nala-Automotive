import { useDashboardStats } from '../../hooks/useAdmin';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Card } from '../../components/common/Card';
import { DollarSign, TrendingUp, MessageSquare, Eye, HandCoins } from 'lucide-react';

export const Analytics = () => {
    const { data, isLoading } = useDashboardStats();

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" text="Loading analytics..." />
            </div>
        );
    }

    const stats = data?.data;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
                <p className="text-gray-600">Strategic overview of financial and inquiry metrics</p>
            </div>

            {/* Financial Stats */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="text-green-600" size={20} />
                            </div>
                            <h3 className="font-semibold text-gray-700">Total Revenue</h3>
                        </div>
                        <p className="text-xl lg:text-2xl font-bold text-gray-900">
                            ${stats?.financial?.totalRevenue?.toLocaleString() || 0}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">From sold cars</p>
                    </Card>

                    <Card>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="text-blue-600" size={20} />
                            </div>
                            <h3 className="font-semibold text-gray-700">Total Profit</h3>
                        </div>
                        <p className="text-xl lg:text-2xl font-bold text-gray-900">
                            ${stats?.financial?.totalProfit?.toLocaleString() || 0}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            Avg: ${Math.round(stats?.financial?.averageProfitPerSoldCar || 0).toLocaleString()}
                        </p>
                    </Card>

                    <Card>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="text-purple-600" size={20} />
                            </div>
                            <h3 className="font-semibold text-gray-700">Expected Revenue</h3>
                        </div>
                        <p className="text-xl lg:text-2xl font-bold text-gray-900">
                            ${stats?.financial?.expectedRevenue?.toLocaleString() || 0}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">From available cars</p>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <HandCoins className="text-purple-600" size={20} />
                            </div>
                            <h3 className="font-semibold text-gray-700">Expected Profit</h3>
                        </div>
                        <p className="text-xl lg:text-2xl font-bold text-gray-900">
                            ${stats?.financial?.potentialProfit?.toLocaleString() || 0}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">From available cars</p>
                    </Card>
                </div>
            </div>

            {/* Inquiries & Most Viewed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Inquiries */}
                <Card>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <MessageSquare size={20} />
                        Inquiries Overview
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                            <span className="text-gray-700">New Inquiries</span>
                            <span className="text-xl font-bold text-red-600">
                                {stats?.inquiries?.new || 0}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                            <span className="text-gray-700">Contacted</span>
                            <span className="text-xl font-bold text-yellow-600">
                                {stats?.inquiries?.contacted || 0}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-700">Closed</span>
                            <span className="text-xl font-bold text-gray-600">
                                {stats?.inquiries?.closed || 0}
                            </span>
                        </div>
                    </div>
                </Card>

                {/* Most Viewed Cars */}
                <Card>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Eye size={20} />
                        Most Viewed Cars
                    </h3>
                    <div className="space-y-3">
                        {stats?.mostViewedCars?.slice(0, 5).map((car) => (
                            <div key={car._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <img
                                    src={car.thumbnail?.url}
                                    alt={`${car.brand} ${car.model}`}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">
                                        {car.brand} {car.model} {car.year}
                                    </p>
                                    <p className="text-sm text-gray-600">{car.views} views</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};
