import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
    children: React.ReactNode;
}

const ProtectedRoute = (props: IProps) => {
    const location = useLocation();
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{props.children}</>;
}

export default ProtectedRoute;