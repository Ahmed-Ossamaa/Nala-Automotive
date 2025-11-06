export const EmptyState = ({ icon: Icon, title, description, action }) => {
    return (
        <div className="text-center py-12">
            {Icon && (
                <div className="flex justify-center mb-4">
                    <Icon size={48} className="text-gray-400" />
                </div>
            )}
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            {description && (
                <p className="text-gray-500 mb-6">{description}</p>
            )}
            {action && <div>{action}</div>}
        </div>
    );
};
