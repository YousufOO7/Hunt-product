import React from 'react';
import { FaVoteYea } from "react-icons/fa";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

const AllProductsCard = ({ product, refetch }) => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { name, image, tags, upvoteCount, _id, description, externalLinks } = product;

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
                    title: `Thank you for your vote if this ${name}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch()
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
        <div className="card group border bg-green-300 text-black">
            <figure>
                <img src={image} className='bg-cover w-full h-[200px] group-hover:scale-110 transition-transform duration-700' alt={name} />
            </figure>
            <div className="card-body">
                <Link to={`/product/${_id}`}>
                    <h2 className="card-title">{name}</h2>
                </Link>
                <div className='space-x-2'>
                    {tags.map((tag, idx) => (
                        <span key={idx} className='badge badge-secondary'>
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="card-actions justify-end">
                    <button
                        onClick={() => handleUpvoteCount(_id)}
                        className="btn bg-green-400 text-lg mt-2"
                    >
                        <FaVoteYea /> {`Upvote (${upvoteCount})`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllProductsCard;
