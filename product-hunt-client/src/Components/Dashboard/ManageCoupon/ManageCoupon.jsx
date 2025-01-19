import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { format } from 'date-fns';
import Swal from "sweetalert2";


const ManageCoupon = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allCouponCard = [], refetch } = useQuery({
        queryKey: ['all-coupon'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-coupon')
            return res.data
        }
    })


    // handle delete
    const handleDeleteCoupon = (id) => {
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
                const res = await axiosSecure.delete(`/coupon/${id}`)
                refetch();
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your coupon has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }



    return (
        <div>
            <h2 className="md:text-4xl text-center font-bold my-5">Manage Coupon</h2>

            <div className="flex justify-end my-5">
                <Link to='/dashboard/add-coupon'><button className="btn btn-sm bg-green-300">Add Coupon</button></Link>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5 lg:px-0">
                {
                    allCouponCard.length > 0 ? allCouponCard.map(coupon => <div key={coupon._id} className="card bg-green-200">
                        <div className="card-body">
                            <h2 className="card-title text-xs">Code Number: {coupon.code}</h2>
                            <p className="text-xs"><b>Expiry last Date: </b>
                                {format(new Date(coupon.expiredDate), 'P')}
                            </p>
                            <p className="text-xs"><b>Description:</b> {coupon.description}</p>
                            <p className="text-xs"><b>Amount:</b> ${coupon.amount}</p>
                            <div className="card-actions justify-between">
                                {/* update btn */}
                                <Link to={`/dashboard/updateCoupon/${coupon._id}`}>
                                    <button className="btn btn-sm bg-green-300">Update</button>
                                </Link>

                                {/* delete btn */}
                                <button
                                    onClick={() => handleDeleteCoupon(coupon._id)}
                                    className="btn  btn-sm bg-error">Delete</button>
                            </div>
                        </div>
                    </div>)

                        :
                        <p>There is no coupon cart added</p>
                }
            </section>

        </div>
    );
};

export default ManageCoupon;