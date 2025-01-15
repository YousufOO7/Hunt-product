import { FaEdit, FaTrash } from "react-icons/fa";
import useAddProduct from "../../../Hooks/useAddProduct";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const MyAddedProduct = () => {
    const [addedProduct, refetch] = useAddProduct();
    const axiosPublic = useAxiosPublic();

    // handle delete the added product
    const handleDeleteProduct = (id) => {
        // console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // delete from the database
                const res = await axiosPublic.delete(`/add-product/${id}`)
                console.log(res.data);
                refetch()
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    }

    return (
        <div>
            <div>
                <h2 className="md:text-4xl text-center font-bold my-5">My Added Products: {addedProduct.length}</h2>
            </div>

            {
                addedProduct.length > 0 ? <div className="flex flex-col mt-6 pb-5">
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
                                            Number of Vote
                                        </th>
                                        <th className="px-4 py-3.5 text-sm font-normal text-left">
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
                                    {addedProduct.map((product, idx) => (
                                        <tr key={product._id}>
                                            <td className="px-4 py-4 ">
                                                {idx + 1}
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                {product.productName}
                                            </td>
                                            <td className="px-4 py-4 text-sm ">
                                                {0}
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                Pending
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                <button className="btn">Update</button>
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                <button
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                    className="btn">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div>
                <p className="">No product add yet</p>
            </div>
            }
        </div>
    );
};

export default MyAddedProduct;