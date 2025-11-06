
export const Card = ({ children, className = '', hover = false }) => {
    return (
        <div className={`card ${hover ? 'hover:shadow-md transition-shadow cursor-pointer' : ''} ${className}`}>
            {children}
        </div>
    );
};
