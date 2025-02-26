import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../Components/Shared/GoogleLogin/GoogleLogin";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";


const Login = () => {
    const { signIn, setUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const from = location.state?.from?.pathname || '/'

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value
        // console.log(email, password);
        // firebase
        signIn(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate(from, { replace: true });
                toast.success(`Welcome ${user?.displayName}`);
            })
            .catch((err) => {
                setError({ login: err.message });
                toast.error('Something went wrong. Please check your credentials.');
            });
    }

    return (
        <div className="py-5 md:py-10 bg-pink-50 px-5 md:px-0 min-h-screen">
            <div className="flex justify-center ">
                <div className="card bg-base-100 w-full max-w-md border">
                    <form onSubmit={handleSubmit} className="card-body">
                        <h2 className="text-4xl font-bold text-center">Login</h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="btn btn-xs absolute right-4 top-12"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {error.login && (
                                <label className="label text-red-500 text-xs">{error.login}</label>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-green-400  hover:bg-black hover:text-white">Login</button>
                        </div>
                        <GoogleLogin></GoogleLogin>
                        <p className="text-center">
                            Don’t have an account?{' '}
                            <Link to="/register" className="text-red-500">
                                Register
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;