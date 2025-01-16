import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ModeratorProductReview = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allProduct = [] } = useQuery({
        queryKey: ['all-product'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-product')
            return res.data
        }
    })
    return (
        <div>
            <div className='text-center text-4xl font-bold my-5'>
                All The Product Review Queue: {allProduct.length}
            </div>

            {
                allProduct?.length > 0 ? <div className="flex flex-col mt-6 pb-5">
                    <div className="md:-mx-4 md:-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block  min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border  border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y  divide-gray-200">
                                    <thead className="bg-gray-50 ">
                                        <tr>
                                            <th className="py-3.5 px-4 text-sm font-normal text-left">
                                                #
                                            </th>
                                            <th className="py-3.5 px-4 text-sm font-normal text-left">
                                                Product Name
                                            </th>
                                            <th className="px-4 py-3.5 text-sm font-normal text-left">
                                                View Details
                                            </th>
                                            <th className="py-3.5 px-4 text-sm font-normal text-left">
                                                Featured
                                            </th>
                                            <th className="py-3.5 px-4 text-sm font-normal text-left">
                                                Status
                                            </th>
                                            <th className="px-4 py-3.5 text-sm font-normal text-left">
                                                Action
                                            </th>
                                            <th className="px-4 py-3.5 text-sm font-normal text-left">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 ">
                                        {allProduct.map((product, idx) => (
                                            <tr key={product._id}>
                                                <td className="px-4 py-4 ">
                                                    {idx + 1}
                                                </td>
                                                <td className="px-4 py-4 text-sm">
                                                    {product.productName}
                                                </td>
                                                <td className="px-4 py-4 text-sm ">
                                                    <Link to={`/dashboard/product/${product._id}`}>
                                                        <button className='btn btn-sm'>Details</button>
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-4 text-sm ">
                                                    <button className='btn btn-sm'>Featured</button>
                                                </td>
                                                <td className="px-4 py-4 text-sm">
                                                    {product.status}
                                                </td>
                                                <td className="px-4 py-4 text-sm">

                                                    <button className="btn btn-sm bg-green-200">Accept <FaEdit></FaEdit></button>
                                                </td>
                                                <td className="px-4 py-4 text-sm">
                                                    <button
                                                        // onClick={() => handleDeleteProduct(product._id)}
                                                        className="btn btn-sm bg-error text-white">Reject <FaTrash></FaTrash></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                    : <><p>There is no more review product</p></>
            }

        </div>
    );
};

export default ModeratorProductReview;