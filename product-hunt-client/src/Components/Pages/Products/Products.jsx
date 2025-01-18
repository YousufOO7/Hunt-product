import React, { useEffect, useState } from 'react';
import AllProductsCard from "./AllProductsCard";
// import useProducts from "../../../Hooks/useProducts";
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Products = () => {
    const [search, setSearch] = useState('');
    // const [products, refetch] = useProducts(search);
    const [itemPerPage, setItemPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(0)
    const { count } = useLoaderData();


    const axiosPublic = useAxiosPublic();

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products', search],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/products?page=${currentPage}&size=${itemPerPage}`, { params: { search } });
            return data;
        }
    })

    useEffect(() => {
        refetch();
    }, [currentPage, itemPerPage, refetch]);


    const numberOfPages = Math.ceil(count / itemPerPage);


    const pages = [...Array(numberOfPages).keys()]

    const handleItemPerPage = e => {
        const val = parseInt(e.target.value);
        console.log(val);
        setItemPerPage(val);
        setCurrentPage(0)
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }


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

                {/* pagination button */}
                <div className='space-x-2 flex items-center justify-center my-5'>
                    <button onClick={handlePrevPage} className='btn btn-sm'>Prev</button>
                    {
                        pages.map(page => <button
                            className={currentPage === page ? 'bg-green-400 btn btn-sm' : undefined}
                            onClick={() => setCurrentPage(page)}
                            key={page}>{page}</button>)
                    }
                    <button onClick={handleNextPage} className='btn btn-sm'>Next</button>
                    <select name="" id="" value={itemPerPage} onChange={handleItemPerPage}>
                        <option value="6">6</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Products;
