import { FaVoteYea } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import ReviewSectionCard from "../ReviewSectionCard/ReviewSectionCard";
import useAuth from "../../../Hooks/useAuth";

const FeatureDetail = () => {
    const {user} = useAuth();
    const product = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const { name, image, tags, upvoteCount, _id, description, externalLinks, featuredId } = product;

    
    // upvote button
    const handleUpvoteCount = async (_id) => {
           const voteData = { name: product.name, image: product.image, tags: product.tags, productId: product._id, description: product.description, externalLinks: product.externalLinks, userEmail: user.email };

           try {
               // Send the vote request
               const res = await axiosPublic.post('/feature-vote', voteData);
   
               // Check if the vote was successful
               if (res.data.success) {
                   Swal.fire({
                       position: "center",
                       icon: "success",
                       title: `Thank you for your vote`,
                       showConfirmButton: false,
                       timer: 1500
                   });
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

    // report a product
    const handleReport = async (product) => {
        console.log(product);
        const reportProduct = {
            productName: product.name,
            productImage: product.image,
            productTags: product.tags,
            productUpvoteCount: product.upvoteCount,
            productDescription: product.description,
            productLinks: product.externalLinks,
            productId: product._id
        }
        try {
            const res = await axiosPublic.post(`/report-product/${product._id}`, reportProduct)
            console.log(res.data)
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Reported!",
                    text: "Your report has been send!",
                    icon: "success"
                });
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="pt-20 max-w-6xl mx-auto">
            <div>
                <div className="hero py-10">
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
                                    className="btn bg-green-400 "
                                >
                                    <FaVoteYea /> {`Upvote (${upvoteCount})`}
                                </button>

                                {/* review button */}
                                <Link to={`/feature/review/${_id}`}>
                                    <button className="btn bg-orange-400 ">Give Review</button>
                                </Link>

                                {/* report button */}
                                <button
                                    onClick={() => handleReport(product)}
                                    className="btn bg-red-400 ">Report</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReviewSectionCard product={product}></ReviewSectionCard>
        </div>
    );
};

export default FeatureDetail;