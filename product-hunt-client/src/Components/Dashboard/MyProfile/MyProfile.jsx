import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyProfile = () => {
    const { user } = useAuth();
    console.log(user);
    const [isPaid, setIsPaid] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/payment-status/${user.email}`)
                .then(res => {
                    setIsPaid(res.data.isPaid)
                })
                .catch(err => console.log('error', err))
        }
    }, [axiosSecure, setIsPaid, isPaid])

    return (
        <div>
            <div className="hero bg-white mt-20 rounded-xl">
                <div className="flex justify-between items-center px-5 border w-full flex-col lg:flex-row py-10">
                    <div className='w-full'>
                        <img
                            src={user?.photoURL}
                            className="w-[300px] h-[300px] bg-cover rounded-full border-2 border-green-400 hover:scale-110 transition-all duration-700" />
                    </div>
                    <div className='w-full'>
                        <h1 className="text-3xl md:text-4xl font-bold w-full">Name: {user?.displayName}</h1>
                        <p className="py-6">
                            <b>Email:</b>  {user?.email}
                        </p>
                        <div className='flex gap-5 items-center'>
                            <p className="">
                                <b>Membership Subscribe :</b>
                            </p>
                            {
                                isPaid ? (
                                    <button className="btn  cursor-not-allowed" disabled>
                                        Verified ✅
                                    </button>
                                ) : (
                                    <Link to='/dashboard/payment' state={{ price: 249 }}>
                                        <button className="btn bg-green-400 hover:bg-black hover:text-white">$249</button>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;