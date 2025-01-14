


const ReviewSectionCard = ({ product }) => {

    return (
        <div className="py-10 max-w-6xl mx-auto">
            <h1 className="text-4xl text-center font-bold">Reviews</h1>

            <section className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product?.reviews && product?.reviews?.length > 0 ? (
                    product.reviews.map((review, index) => (
                        <div key={index} className="card card-compact bg-base-100 w-full shadow-xl mb-6">
                            <figure>
                                <img
                                    src={review.userPhoto} 
                                    alt={review.userName}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{review.userName}</h2>
                                <div className="flex items-center">
                                    {/* Display rating as stars */}
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={i < review.rating ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            className="w-5 h-5 text-yellow-500"
                                        >
                                            <path
                                                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                            />
                                        </svg>
                                    ))}
                                </div>
                                <p>{review.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews available for this product.</p>
                )}
            </section>
        </div>
    );
};

export default ReviewSectionCard;
