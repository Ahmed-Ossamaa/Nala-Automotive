import { useState, useEffect } from 'react';
import { Button } from '../common/Button';

export const InquiryDetails = ({ inquiry, onClose, onUpdateStatus, onSaveNotes, isUpdating }) => {
    const [notes, setNotes] = useState(inquiry?.adminNotes || '');

    useEffect(() => {
        setNotes(inquiry?.adminNotes || '');
    }, [inquiry]);

    if (!inquiry) return null;

    return (
        <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
            {/* Car Info */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <img
                    src={inquiry.car?.thumbnail?.url}
                    alt={`${inquiry.car?.make} ${inquiry.car?.model}`}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {inquiry.car?.year} {inquiry.car?.make}{' '}
                        {inquiry.car?.model}
                    </h3>
                    <p className="text-primary-600 font-medium">
                        ${inquiry.car?.price?.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Customer Information</h4>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                    <div>
                        <p className="text-gray-500 mb-0.5 text-xs">Name</p>
                        <p className="font-medium text-gray-900">{inquiry.customerName}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 mb-0.5 text-xs">Date</p>
                        <p className="font-medium text-gray-900">{new Date(inquiry.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-gray-500 mb-0.5 text-xs">Email</p>
                        <p className="font-medium text-gray-900"><a href={`mailto:${inquiry.customerEmail}`} className="text-blue-600 hover:underline">{inquiry.customerEmail}</a></p>
                    </div>
                    {inquiry.customerPhone && (
                        <div className="col-span-2">
                            <p className="text-gray-500 mb-0.5 text-xs">Phone</p>
                            <p className="font-medium text-gray-900">{inquiry.customerPhone}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Message */}
            <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Customer Message</h4>
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
                </div>
            </div>

            {/* Admin Notes */}
            <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Admin Notes</h4>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none shadow-sm text-gray-700"
                    placeholder="Add private notes about this inquiry..."
                />
            </div>

            {/* Status Update */}
            <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={inquiry.status === 'new' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => onUpdateStatus(inquiry._id, 'new')}
                        className="rounded-full"
                    >
                        New
                    </Button>
                    <Button
                        variant={inquiry.status === 'contacted' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => onUpdateStatus(inquiry._id, 'contacted')}
                        className="rounded-full"
                    >
                        Contacted
                    </Button>
                    <Button
                        variant={inquiry.status === 'closed' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => onUpdateStatus(inquiry._id, 'closed')}
                        className="rounded-full"
                    >
                        Closed
                    </Button>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 pb-2 sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-gray-100 mt-6 -mx-2 px-2">
                <Button
                    variant="primary"
                    onClick={() => onSaveNotes(notes)}
                    isLoading={isUpdating}
                    className="flex-1 shadow-md hover:shadow-lg transition-shadow"
                >
                    Save Changes
                </Button>
                <Button
                    variant="secondary"
                    onClick={onClose}
                    className="hover:bg-gray-100"
                >
                    Close
                </Button>
            </div>
        </div>
    );
};
