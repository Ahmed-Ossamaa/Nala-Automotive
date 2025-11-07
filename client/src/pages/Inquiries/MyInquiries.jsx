import { useMyInquiries } from '../../hooks/useInquiries';
import { Container } from '../../components/layout/container';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { Badge } from '../../components/common/Badge';
import { MessageSquare, Calendar } from 'lucide-react';

export const MyInquiries = () => {
    const { data, isLoading } = useMyInquiries();

    const inquiries = data?.data?.inquiries || [];

    if (isLoading) {
        return (
            <Container className="py-20">
                <LoadingSpinner size="lg" text="Loading inquiries..." />
            </Container>
        );
    }

    const getStatusBadge = (status) => {
        const variants = {
            new: 'primary',
            contacted: 'warning',
            closed: 'default',
        };
        return <Badge variant={variants[status]}>{status}</Badge>;
    };

    return (
        <Container className="py-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">My Inquiries</h1>
                <p className="text-gray-600">Track your car inquiries</p>
            </div>

            {inquiries.length === 0 ? (
                <EmptyState
                    icon={MessageSquare}
                    title="No inquiries yet"
                    description="You haven't sent any inquiries. Browse cars and send an inquiry!"
                />
            ) : (
                <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry._id} className="card">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={inquiry.car?.thumbnail?.url}
                                        alt={`${inquiry.car?.make} ${inquiry.car?.model}`}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            {inquiry.car?.year} {inquiry.car?.make} {inquiry.car?.model}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                            <Calendar size={16} />
                                            <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                {getStatusBadge(inquiry.status)}
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm font-medium text-gray-700 mb-1">Your Message:</p>
                                <p className="text-gray-600">{inquiry.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
};