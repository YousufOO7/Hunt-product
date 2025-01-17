import { FaVoteYea } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";


const ReportProductDetails = () => {
    const reportProduct = useLoaderData();
    const {productImage: image, productDescription: description, productLinks: externalLinks, productName: name, productTags: tags, productUpvoteCount: upvoteCount} = reportProduct || [];


    return (
        <div className='mt-20 bg-white rounded-lg py-5'>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-full">
                        <img
                            src={image}
                            className="w-full h-[300px] rounded-lg" />
                    </div>
                    <div className="w-full">
                        <h1 className="text-3xl md:text-4xl font-bold">Name: {name}</h1>
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
                        <div className=" md:flex md:justify-around items-center mt-2">
                            <button
                                // onClick={() => handleUpvoteCount(_id)}
                                className="btn bg-green-400"
                            >
                                <FaVoteYea /> {`Upvote (${upvoteCount})`}
                            </button>

                            {/* review button */}
                            <button className="btn bg-orange-400">Give Review</button>


                            {/* report button */}
                            <button className="btn bg-red-400">Report</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportProductDetails;