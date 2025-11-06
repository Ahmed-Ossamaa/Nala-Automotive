import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const GuestRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};