import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    const {signInWithGoogle} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleLogIn = () => {
        signInWithGoogle()
        .then(result => {
            const user = result.user
            navigate(location?.state ? location?.state : '/')
            toast.success("SignIn Successful!!")
        })
        .catch(error => {
            toast.error("Something was wrong give valid info!!")
        })
    }

    return (
        <div>
            <div className="divider">OR</div>
            <button onClick={handleGoogleLogIn} className='btn w-full flex mx-auto mt-3 hover:text-white bg-green-400 hover:bg-black'> <FcGoogle className='text-2xl'></FcGoogle> Google</button>
        </div>
    );
};

export default GoogleLogin;