import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
    return (
        <div>
            <div className="divider">OR</div>
            <button  className='btn w-full flex mx-auto mt-3 hover:text-white bg-green-400 hover:bg-black'> <FcGoogle className='text-2xl'></FcGoogle> Google</button>
        </div>
    );
};

export default GoogleLogin;