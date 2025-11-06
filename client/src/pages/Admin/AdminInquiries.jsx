import { useState } from 'react';
import { useAllInquiries, useUpdateInquiry, useDeleteInquiry } from '../../hooks/useInquiries';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { MessageSquare, Trash2, Eye, User, Mail, Phone, Calendar } from 'lucide-react';

export const AdminInquiries = () => {
    const [statusFilter, setStatusFilter] = useState('');
    const { data, isLoading } = useAllInquiries({ status: statusFilter });
    const updateInquiry = useUpdateInquiry();
    const deleteInquiry = useDeleteInquiry();

    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [viewModal, setViewModal] = useState(false);
    const [adminNotes, setAdminNotes] = useState('');

    const inquiries = data?.data?.inquiries || [];

    const handleUpdateStatus = async (id, status) => {
        await updateInquiry.mutateAsync({ id, data: { status } });
    };

    const handleSaveNotes = async () => {
        if (selectedInquiry) {
            await updateInquiry.mutateAsync({
                id: selectedInquiry._id,
                data: { adminNotes },
            });
            setViewModal(false);
            setSelectedInquiry(null);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this inquiry?')) {
            await deleteInquiry.mutateAsync(id);
        }
    };

    const openViewModal = (inquiry) => {
        setSelectedInquiry(inquiry);
        setAdminNotes(inquiry.adminNotes || '');
        setViewModal(true);
    };

    const getStatusBadge = (status) => {
        const variants = {
            new: 'danger',
            contacted: 'warning',
            closed: 'default',
        };
        return <Badge variant={variants[status]}>{status}</Badge>;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <LoadingSpinner size="lg" text="Loading inquiries..." />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Inquiries</h1>
                    <p className="text-gray-600">Manage customer inquiries and messages</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex gap-3">
                    <Button
                        variant={statusFilter === '' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setStatusFilter('')}
                    >
                        All ({data?.count || 0})
                    </Button>
                    <Button
                        variant={statusFilter === 'new' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setStatusFilter('new')}
                    >
                        New
                    </Button>
                    <Button
                        variant={statusFilter === 'contacted' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setStatusFilter('contacted')}
                    >
                        Contacted
                    </Button>
                    <Button
                        variant={statusFilter === 'closed' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setStatusFilter('closed')}
                    >
                        Closed
                    </Button>
                </div>
            </div>

            {/* Inquiries List */}
            <div className="space-y-4">
                {inquiries.map((inquiry) => (
                    <div key={inquiry._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4 flex-1">
                                {/* Car Image */}
                                <img
                                    src={inquiry.car?.thumbnail?.url}
                                    alt={`${inquiry.car?.make} ${inquiry.car?.model}`}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />

                                {/* Inquiry Details */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {inquiry.car?.year} {inquiry.car?.make} {inquiry.car?.model}
                                        </h3>
                                        {getStatusBadge(inquiry.status)}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                                        <div className="flex items-center gap-2">
                                            <User size={16} />
                                            <span>{inquiry.customerName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail size={16} />
                                            <span><a href={`mailto:${inquiry.customerEmail}`}>{inquiry.customerEmail}</a></span>
                                        </div>
                                        {inquiry.customerPhone && (
                                            <div className="flex items-center gap-2">
                                                <Phone size={16} />
                                                <span>{inquiry.customerPhone}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                        <p className="text-sm font-medium text-gray-700 mb-1">Customer Message:</p>
                                        <p className="text-gray-600">{inquiry.message}</p>
                                    </div>

                                    {inquiry.adminNotes && (
                                        <div className="bg-blue-50 rounded-lg p-3">
                                            <p className="text-sm font-medium text-blue-700 mb-1">Admin Notes:</p>
                                            <p className="text-blue-600 text-sm">{inquiry.adminNotes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 ml-4">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className='flex'
                                    onClick={() => openViewModal(inquiry)}
                                >
                                    <Eye size={16} className="mr-2" />
                                    View
                                </Button>

                                {inquiry.status === 'new' && (
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className='flex'
                                        onClick={() => handleUpdateStatus(inquiry._id, 'contacted')}
                                    >
                                        Mark Contacted
                                    </Button>
                                )}

                                {inquiry.status === 'contacted' && (
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className='flex'
                                        onClick={() => handleUpdateStatus(inquiry._id, 'closed')}
                                    >
                                        Mark Closed
                                    </Button>
                                )}

                                <Button
                                    variant="danger"
                                    size="sm"
                                    className='flex'
                                    onClick={() => handleDelete(inquiry._id)}
                                >
                                    <Trash2 size={16} className="mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

                {inquiries.length === 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
                        <p className="text-gray-500">
                            {statusFilter ? `No ${statusFilter} inquiries at the moment` : 'No inquiries yet'}
                        </p>
                    </div>
                )}
            </div>

            {/* View/Edit Modal */}
            <Modal
                isOpen={viewModal}
                onClose={() => {
                    setViewModal(false);
                    setSelectedInquiry(null);
                }}
                title="Inquiry Details"
                size="lg"
            >
                {selectedInquiry && (
                    <div className="space-y-4">
                        {/* Car Info */}
                        <div className="flex items-center gap-4 pb-4 border-b">
                            <img
                                src={selectedInquiry.car?.thumbnail?.url}
                                alt={`${selectedInquiry.car?.make} ${selectedInquiry.car?.model}`}
                                className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {selectedInquiry.car?.year} {selectedInquiry.car?.make}{' '}
                                    {selectedInquiry.car?.model}
                                </h3>
                                <p className="text-gray-600">
                                    ${selectedInquiry.car?.price?.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div>
                            <h4 className="font-semibold mb-2">Customer Information</h4>
                            <div className="space-y-2 text-sm">
                                <p><strong>Name:</strong> {selectedInquiry.customerName}</p>
                                <p><strong>Email:</strong> {selectedInquiry.customerEmail}</p>
                                {selectedInquiry.customerPhone && (
                                    <p><strong>Phone:</strong> {selectedInquiry.customerPhone}</p>
                                )}
                                <p>
                                    <strong>Date:</strong>{' '}
                                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <h4 className="font-semibold mb-2">Customer Message</h4>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-gray-700">{selectedInquiry.message}</p>
                            </div>
                        </div>

                        {/* Admin Notes */}
                        <div>
                            <h4 className="font-semibold mb-2">Admin Notes</h4>
                            <textarea
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                rows={4}
                                className="input-field"
                                placeholder="Add notes about this inquiry..."
                            />
                        </div>

                        {/* Status Update */}
                        <div>
                            <h4 className="font-semibold mb-2">Status</h4>
                            <div className="flex gap-2">
                                <Button
                                    variant={selectedInquiry.status === 'new' ? 'primary' : 'secondary'}
                                    size="sm"
                                    onClick={() => handleUpdateStatus(selectedInquiry._id, 'new')}
                                >
                                    New
                                </Button>
                                <Button
                                    variant={selectedInquiry.status === 'contacted' ? 'primary' : 'secondary'}
                                    size="sm"
                                    onClick={() => handleUpdateStatus(selectedInquiry._id, 'contacted')}
                                >
                                    Contacted
                                </Button>
                                <Button
                                    variant={selectedInquiry.status === 'closed' ? 'primary' : 'secondary'}
                                    size="sm"
                                    onClick={() => handleUpdateStatus(selectedInquiry._id, 'closed')}
                                >
                                    Closed
                                </Button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                variant="primary"
                                onClick={handleSaveNotes}
                                isLoading={updateInquiry.isPending}
                                className="flex-1"
                            >
                                Save Notes
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setViewModal(false);
                                    setSelectedInquiry(null);
                                }}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};