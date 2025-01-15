import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const MyProfile = () => {
    const { user } = useAuth();
    console.log(user);
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
                            <button className="btn bg-green-400  hover:bg-black hover:text-white">$149</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;