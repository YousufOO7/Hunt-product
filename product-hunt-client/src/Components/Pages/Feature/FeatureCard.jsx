import { FaVoteYea } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const FeatureCard = ({ featureProduct, refetch }) => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    // console.log(featureProduct)
    const navigate = useNavigate();

    const handleUpvoteCount = async (_id) => {
        const voteData = { name: featureProduct.name, image: featureProduct.image, tags: featureProduct.tags, productId: featureProduct._id, description: featureProduct.description, externalLinks: featureProduct.externalLinks, userEmail: user.email };

        try {
            // Send the vote request
            const res = await axiosPublic.post('/feature-vote', voteData);

            // Check if the vote was successful
            refetch();
            if (res.data.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Thank you for your vote`,
                    showConfirmButton: false,
                    timer: 1500
                });
                // refetch()
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
            alert('An error occurred while voting. Please try again.');
        }
    };

    return (
        <div className="card card-compact border bg-green-300 text-black">
            <figure>
                <img
                    src={featureProduct.image}
                    className="bg-cover w-full h-[200px]"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <Link to={`/feature-detail/${featureProduct._id}`}>
                    <h2 className="lg:text-xl hover:text-green-600"><b>Name:</b> {featureProduct.name}</h2>
                </Link>
                <div className='space-x-2'>
                    <b>Tags:</b>
                    {featureProduct.tags.map((tag, idx) => (
                        <span key={idx} className='badge badge-secondary'>
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="card-actions ">
                    <button
                        onClick={() => {
                            if(!user){
                                navigate('/login')
                            }
                            else{
                                handleUpvoteCount(featureProduct._id)
                            }
                        }}
                        className="btn bg-green-400 text-lg mt-2 w-full"
                        disabled={user && featureProduct.email === user.email}
                    >
                        <FaVoteYea /> {`Upvote (${featureProduct.upvoteCount})`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;