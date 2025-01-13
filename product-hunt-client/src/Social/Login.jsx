import GoogleLogin from "../Components/Shared/GoogleLogin/GoogleLogin";


const Login = () => {

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value

        console.log(email, password)
    } 

    return (
        <div className="flex justify-center py-10 md:py-20 lg:py-36 bg-gray-400">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="card-body">
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
                    <div className="form-control mt-6">
                        <button className="btn bg-green-400  hover:bg-black hover:text-white">Login</button>
                    </div>
                    <GoogleLogin></GoogleLogin>
                </form>
            </div>
        </div>
    );
};

export default Login;