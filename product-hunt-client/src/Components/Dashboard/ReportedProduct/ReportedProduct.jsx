import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaBook, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ReportedProduct = () => {
    const axiosSecure = useAxiosSecure();

    const {data: reportedProduct = []} = useQuery({
        queryKey: ['reported-product'],
        queryFn: async () => {
            const res = await axiosSecure.get('/reported-product')
            return res.data
        }
    })
    return (
        <div>
           <div>
             <h2 className="text-4xl text-center font-bold my-5"> Reported products: {reportedProduct.length}</h2>
           </div>

           {/* table */}
           <div className="flex flex-col mt-6 pb-5">
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
                                            <th className="py-3.5 px-4 text-sm font-normal text-left">
                                               View Details
                                            </th>
                                            <th className="px-4 py-3.5 text-sm font-normal text-left">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 ">
                                        {reportedProduct.map((product, idx) => (
                                            <tr key={product._id}>
                                                <td className="px-4 py-4 ">
                                                    {idx + 1}
                                                </td>
                                                <td className="px-4 py-4 text-sm">
                                                    {product.productName}
                                                </td>
                                                <td className="px-4 py-4 text-sm">
                                                    <Link to={`/dashboard/product-report/${product._id}`}>
                                                        <button className="btn btn-sm bg-green-200">View Details <FaBook></FaBook></button>
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-4 text-sm">
                                                    <button
                                                        // onClick={() => handleDeleteProduct(product._id)}
                                                        className="btn btn-sm bg-error text-white">Delete <FaTrash></FaTrash></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default ReportedProduct;