import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddCouponForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const axiosSecure = useAxiosSecure();

    const handleCoupon = async (e) => {
        e.preventDefault();
        const form = e.target;
        const addCoupon = {
            code: parseInt(form.couponCode.value),
            expiredDate: startDate,
            description: form.couponDescription.value,
            amount: parseInt(form.discountAmount.value)
        }

        const res = await axiosSecure.post('/add-coupon', addCoupon)
        if (res.data.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Coupon add successfully!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div className="py-5 flex justify-center items-center">
            <div className="card w-full max-w-xl bg-white shadow-md p-8 rounded-lg">
                <h1 className="text-2xl font-bold text-center">Add Coupon</h1>
                <form onSubmit={handleCoupon} className="card-body">
                    {/* Coupon Code */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Coupon Code</span>
                        </label>
                        <input type="number" name="couponCode" placeholder="Enter Coupon Code" className="input input-bordered" />
                    </div>
                    {/* Expiry Date */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Expiry Date</span>
                        </label>
                        <DatePicker
                            className='border p-2 rounded-md'
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
                        <textarea name="couponDescription" className="textarea textarea-bordered" placeholder="Describe the coupon..."></textarea>
                    </div>
                    {/* Discount Amount */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Discount Amount</span>
                        </label>
                        <input type="number" name="discountAmount" placeholder="Enter Discount Amount" className="input input-bordered" />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-green-400 hover:bg-black hover:text-white">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCouponForm;