import React from 'react';
import { FaVoteYea } from "react-icons/fa";

const AllProductsCard = ({ product }) => {
    const { name, image, tags,  upvoteCount } = product;
    // console.log(product)
    return (
        <div className="card  shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className='space-x-2'>
                    {
                        tags.map((tag, idx) => <span key={idx} className='badge badge-secondary'>
                            {tag}
                        </span>)
                    }
                </div>
                <div className="card-actions justify-end">
                    <button className="btn bg-green-400 text-xl"><FaVoteYea></FaVoteYea> {upvoteCount}</button>
                </div>
            </div>
        </div>
    );
};

export default AllProductsCard;