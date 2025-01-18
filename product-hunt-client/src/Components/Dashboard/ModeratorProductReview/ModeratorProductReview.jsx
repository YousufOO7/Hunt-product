import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FcApproval, FcCancel } from 'react-icons/fc';
import Swal from 'sweetalert2';

const ModeratorProductReview = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allProduct = [], refetch } = useQuery({
        queryKey: ['all-product'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-product')
            return res.data
        }
    })

    // sert all product by status
    const sortedAllProduct = [...allProduct].sort((a, b) => {
        if (a.status === 'Pending') return -1;
        if (b.status === 'Pending') return 1;
        return 0;
    })


    // handle accept button
    const handleStatusChange = async (id, preStatus, status) => {
        console.log(id, preStatus, status);
        try {
            const res = await axiosSecure.patch(`/update-status/${id}`, { status })
            console.log(res.data)
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Response is update",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    // handle feature button
    const handleFeature = async (product) => {
        const featureProduct = {
            description: product.productDescription,
            image: product.productImage,
            externalLinks: product.productLink,
            name: product.productName,
            email: product.productOwnerEmail,
            tags: product.productTags,
            upvoteCount: product.upvoteCount,
            postedTime: product.timestamp,
            featuredId: product._id          
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to send is a feature section!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.post(`/add-feature/${product._id}`, featureProduct)
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Product add to Feature",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }

    return (
        <div>
            <div className='text-center text-4xl font-bold my-5'>
                All The Product Review Queue: {sortedAllProduct.length}
            </div>

            {
                sortedAllProduct?.length > 0 ? <div className="flex flex-col mt-6 pb-5">
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
                                        {sortedAllProduct.map((product, idx) => (
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
                                                    {
                                                        product.status === 'Rejected' ?
                                                            <button
                                                                disabled
                                                                className='btn btn-sm'>Featured</button>
                                                            :
                                                            <button
                                                                onClick={() => handleFeature(product)}
                                                                className='btn btn-sm'>Featured</button>
                                                    }
                                                </td>
                                                <td className="px-4 py-4 text-sm">
                                                    {product.status}
                                                </td>
                                                <td className="px-4 py-4 text-sm">

                                                    {product.status === 'Accepted' || product.status === 'Rejected' ? <button
                                                        // onClick={() => handleStatusChange(product._id, product.status, "Accepted")}
                                                        disabled
                                                        className="btn btn-sm bg-green-200"
                                                    // disabled={disable[product._id]}
                                                    >Accept <FcApproval></FcApproval></button>
                                                        :
                                                        <button
                                                            onClick={() => handleStatusChange(product._id, product.status, "Accepted")}
                                                            className="btn btn-sm bg-green-200"
                                                        // disabled={disable[product._id]}
                                                        >Accept <FcApproval></FcApproval></button>
                                                    }
                                                </td>
                                                {/* Rejected btn */}
                                                <td className="px-4 py-4 text-sm">
                                                    {
                                                        product.status === 'Accepted' || product.status === 'Rejected' ?
                                                            <button
                                                                disabled
                                                                className="btn btn-sm bg-error text-white"
                                                            >Reject <FcCancel></FcCancel></button>
                                                            :
                                                            <button
                                                                onClick={() => handleStatusChange(product._id, product.status, "Rejected")}
                                                                className="btn btn-sm bg-error text-white"
                                                            >Reject <FcCancel></FcCancel></button>
                                                    }
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