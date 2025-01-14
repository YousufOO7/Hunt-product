import React, { useState } from 'react';
import AllProductsCard from "./AllProductsCard";
import useProducts from "../../../Hooks/useProducts";

const Products = () => {
    const [search, setSearch] = useState('');
    const [products, refetch] = useProducts(search);

    
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="pt-20">
            <div className="max-w-6xl mx-auto my-10">
                <h2 className="text-4xl font-bold my-3 text-center">All Products</h2>
                {/* Search input */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search by tags..."
                        className="input input-bordered w-full"
                    />
                </div>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 px-5 md:px-0">
                    {
                        products.map(product => <AllProductsCard refetch={refetch} key={product._id} product={product}></AllProductsCard>)
                    }
                </section>
            </div>
        </div>
    );
};

export default Products;
