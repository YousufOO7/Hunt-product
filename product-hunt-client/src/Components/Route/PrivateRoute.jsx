import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading) return <div className='flex min-h-screen justify-center items-center'><span><span className="loading loading-spinner loading-lg"></span></span></div>

    if(user) return children

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;