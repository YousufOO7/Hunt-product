import { Link } from "react-router-dom";
import GoogleLogin from "../Components/Shared/GoogleLogin/GoogleLogin";


const Register = () => {

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0]
        const formData = new FormData();
        formData.append('image', image)

        console.log(name, email, password, image)
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
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                    </div>
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