import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../Components/Shared/GoogleLogin/GoogleLogin";
import axios from "axios";
import useAuth from "../Hooks/useAuth";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";
import { imageUpload } from "../Apis/Utilis";


const Register = () => {
    const { updateUserProfile, createNewUser, setUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0]
        // const formData = new FormData();
        // formData.append('image', image)
        setError('');

        if (password.length < 6) {
            setError({ ...error, password: "Password length must be at least 6 character" })
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError({ ...error, password: "Password must have Lowercase letter" })
            return;

        }
        if (!/[A-Z]/.test(password)) {
            setError({ ...error, password: "Password must have Uppercase letter" })
            return;
        }

        // send to image data to imgBB
        // const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
        // const imageUrl = data.data.display_url
        const photo = await imageUpload(image);

       
        try {
            console.log(email, password);
            const result = await createNewUser(email, password);

            await updateUserProfile({ displayName: name, photoURL: photo })

            console.log(result);
            navigate('/')
        }
        catch {
            (error) => {
                console.log(error);
            }
        }
    }

    return (
        <div className="flex justify-center py-5 bg-gray-400">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Enter Your Name" className="input input-bordered" required />
                    </div>
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
                            type={showPassword ? "text" : "password"}
                            name='password'
                            placeholder="password"
                            className="input input-bordered"
                            required />

                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="btn btn-xs absolute right-4 top-12">
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </button>
                    </div>
                    {
                        error.password &&
                        <label className="label text-red-600 text-xs">
                            {error.password}
                        </label>
                    }
                    <div>
                        <input required type="file" name="image" accept="image/*" className="file-input w-full max-w-xs" />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-green-400  hover:bg-black hover:text-white">Register</button>
                    </div>
                    <GoogleLogin></GoogleLogin>
                    <p className="text-center mt-3">
                        Already have an account?{' '}
                        <Link to="/login" className="text-red-500">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;