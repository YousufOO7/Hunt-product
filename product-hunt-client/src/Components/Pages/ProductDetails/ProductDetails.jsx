import { FaVoteYea } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import ReviewSectionCard from "../ReviewSectionCard/ReviewSectionCard";
import useProducts from "../../../Hooks/useProducts";


const ProductDetails = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const product = useLoaderData();
    const [refetch] = useProducts()
    // console.log(product)
    const { name, image, tags, upvoteCount, _id, description, externalLinks } = product;

    // upvote button
    const handleUpvoteCount = async (_id) => {
        const voteData = { name, image, tags, productId: _id, description, externalLinks, userEmail: user.email };

        try {
            // Send the vote request
            const res = await axiosPublic.post('/add-vote', voteData);

            // Check if the vote was successful
            if (res.data.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Thank you for your vote of this ${name}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `You have already voted for this product.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    };

    return (
        <div className="pt-20  bg-orange-50">
            <div className="max-w-6xl mx-auto py-10">

                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row">
                        <div className="lg:w-1/2">
                            <img
                                src={image}
                                className="w-full h-[300px] rounded-lg" />
                        </div>
                        <div className="lg:w-1/2">
                            <h1 className="text-3xl md:text-5xl font-bold">Name: {name}</h1>
                            <p className="py-6"><b>Description:</b> {description}</p>
                            <b>Tags:</b>
                            <div className='space-x-2'>
                                {tags?.map((tag, idx) => (
                                    <span key={idx} className='badge badge-secondary'>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <p className="py-3"><b>Link of Website:</b> <a className="hover:text-red-600" href={`${externalLinks}`}>{externalLinks}</a></p>
                            <div className="flex justify-around items-center mt-2">
                                <button
                                    onClick={() => handleUpvoteCount(_id)}
                                    className="btn bg-green-400 text-lg"
                                >
                                    <FaVoteYea /> {`Upvote (${upvoteCount})`}
                                </button>

                                {/* review button */}
                                <Link to={`/review/${_id}`}>
                                    <button className="btn bg-orange-400 text-lg">Give Review</button>
                                </Link>

                                {/* report button */}
                                <button className="btn bg-red-400 text-lg">Report</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <ReviewSectionCard product={product}></ReviewSectionCard>
        </div >
    );
};

export default ProductDetails;