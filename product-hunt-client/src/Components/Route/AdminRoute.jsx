import { useLocation } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading) return <div className='flex min-h-screen justify-center items-center'><span><span className="loading loading-spinner loading-lg"></span></span></div>

    if(user && isAdmin) return children ;
    
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default AdminRoute;