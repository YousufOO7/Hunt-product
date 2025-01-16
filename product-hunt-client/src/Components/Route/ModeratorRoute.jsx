import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useModerator from '../../Hooks/useModerator';
import { Navigate, useLocation } from 'react-router-dom';

const ModeratorRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isModerator, isModeratorLoading] = useModerator();
    const location = useLocation();

    if(loading || isModeratorLoading) return <div className='flex min-h-screen justify-center items-center'><span><span className="loading loading-spinner loading-lg"></span></span></div>

    if(user && isModerator) return children ;
    
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default ModeratorRoute;