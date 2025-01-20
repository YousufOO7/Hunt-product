import { useLoaderData } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const ReviewForm = () => {
    const { user } = useAuth();
    const review = useLoaderData();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { image, _id } = review;
    const axiosPublic = useAxiosPublic();

    // console.log(review)

    const handleGivenReview = async (e) => {
        e.preventDefault();
        const reviewData = {
            userName: user?.displayName,
            userPhoto: user?.photoURL,
            userEmail: user?.email,
            reviewId: _id,
            rating,
            comment
        }

        // send to database the review
        const res = await axiosPublic.post('/products/reviews', reviewData);

        if (res.data.success) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Review added successfully!`,
                showConfirmButton: false,
                timer: 1500
            });
            // console.log(res.data);
        } else {
            console.log("Error adding review. Please try again later.");
        }
    }

    return (
        <div className="pt-20 bg-pink-50">
            <div className="max-w-6xl mx-auto">
                <div className="hero">
                    <div className="hero-content flex-col-reverse md:flex-row lg:flex-row">
                        <div className="text-center lg:text-left ">
                            <p className="py-6">
                                <img src={image} className="w-full h-[300px] rounded-md" alt="" />
                            </p>
                        </div>
                        <div className="card bg-base-100 w-full shadow-2xl ">
                            <form onSubmit={handleGivenReview} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" readOnly defaultValue={user?.displayName} placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo</span>
                                    </label>
                                    <input type="url" readOnly defaultValue={user?.photoURL} placeholder="email" className="input input-bordered" required />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        name="comment"
                                        className="textarea textarea-bordered w-full mt-2"
                                        onBlur={(e) => setComment(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Rating (1-5)</span>
                                    </label>
                                    <select
                                        name="rating"
                                        // name={rating}
                                        onBlur={(e) => setRating(Number(e.target.value))}
                                        className="select select-bordered"
                                        required
                                    >
                                        <option value="" disabled>
                                            Select Rating
                                        </option>
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num}>
                                                {num}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn bg-green-400 text-xl">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;