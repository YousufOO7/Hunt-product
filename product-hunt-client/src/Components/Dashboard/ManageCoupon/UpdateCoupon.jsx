import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const UpdateCoupon = () => {
    const couponData = useLoaderData();
    const [startDate, setStartDate] = useState(new Date());
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleCouponUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const updateData = {
            code: form.couponCode.value,
            expiredDate: startDate.toISOString(),
            description: form.couponDescription.value,
            amount: parseInt(form.discountAmount.value)
        }

        // console.log(updateData);
        try {
            const res = await axiosSecure.patch(`/updateCoupon/${couponData._id}`, updateData)
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Coupon update successful!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/manageCoupon')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="py-5 flex justify-center items-center">
            <div className="card w-full max-w-xl bg-white shadow-md p-8 rounded-lg">
                <h1 className="text-2xl font-bold text-center">Update Coupon</h1>
                <form onSubmit={handleCouponUpdate} className="card-body">
                    {/* Coupon Code */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Coupon Code</span>
                        </label>
                        <input type="number" defaultValue={couponData.code} name="couponCode" placeholder="Enter Coupon Code" className="input input-bordered" />
                    </div>
                    {/* Expiry Date */}
                    {
                        couponData?.expiredDate &&
                        <p className="my-2">
                            <b>Prev added Date:</b>
                            <div className="form-control">
                                <input
                                    type="text"
                                    value={couponData?.expiredDate ? format(new Date(couponData.expiredDate), 'P') : ''}
                                    readOnly
                                    className="input input-bordered"
                                />
                            </div>
                        </p>
                    }
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Update Expiry Date</span>
                        </label>
                        <DatePicker
                            className='border p-2 rounded-md w-full'
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            minDate={new Date()}
                        ></DatePicker>
                    </div>
                    {/* Coupon Code Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Coupon Code Description</span>
                        </label>
                        <textarea name="couponDescription" defaultValue={couponData.description} className="textarea textarea-bordered" placeholder="Describe the coupon..."></textarea>
                    </div>
                    {/* Discount Amount */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Discount Amount</span>
                        </label>
                        <input type="number" defaultValue={couponData.amount} name="discountAmount" placeholder="Enter Discount Amount" className="input input-bordered" />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-green-400 hover:bg-black hover:text-white">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCoupon;