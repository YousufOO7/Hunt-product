import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEdit, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleMakeUserAdmin = (user) => {
        // console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/admin/${user._id}`)
                refetch()
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: `${user.name} is now an Admin!`,
                        icon: "success"
                    });
                }
            }
        });
    }

    const handleMakeModerator = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this moderator!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/moderator/${user._id}`)
                refetch()
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: `${user.name} is now an Moderator!`,
                        icon: "success"
                    });
                }
            }
        });
    }

    return (
        <div>
            <div>
                <h2 className="text-4xl text-center font-bold my-5"> All Users</h2>
            </div>

            <div className="flex flex-col mt-6 pb-5">
                <div className="md:-mx-4 md:-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block  min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border  border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y  divide-gray-200">
                                <thead className="bg-green-200 ">
                                    <tr>
                                        <th className="py-3.5 px-4 text-sm font-normal text-left">
                                            #
                                        </th>
                                        <th className="py-3.5 px-4 text-sm font-normal text-left">
                                            User Name
                                        </th>
                                        <th className="py-3.5 px-4 text-sm font-normal text-left">
                                            User Email
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
                                    {users.map((user, idx) => (
                                        <tr key={user._id}>
                                            <td className="px-4 py-4 ">
                                                {idx + 1}
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-4 text-sm ">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-4 text-sm">

                                                {user?.role === 'admin' ? 'Admin' : <button
                                                    onClick={() => handleMakeUserAdmin(user)}
                                                    className="btn btn-sm bg-green-200">Admin <FaUser></FaUser></button>}

                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                {user?.role === 'moderator' ? 'Moderator' : <button
                                                    onClick={() => handleMakeModerator(user)}
                                                    className="btn btn-sm bg-green-200">Moderator <FaUser></FaUser></button>}
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

export default AllUsers;