// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

const CouponSection = () => {
    const axiosPublic = useAxiosPublic();

    const { data: coupons = [] } = useQuery({
        queryKey: ['all-coupons'],
        queryFn: async () => {
            const res = await axiosPublic.get('all-coupons')
            return res.data
        }
    })

    return (
        <div className="max-w-6xl mx-auto my-10">
            <h2 className="text-4xl md:text-5xl pb-5 text-center font-bold my-3">Coupon's</h2>
            <div className='mt-5'>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper"
                >
                    {coupons.map((coupon) => (
                        <SwiperSlide key={coupon._id}>
                            <div className="bg-green-400 w-4/6 md:w-3/6 lg:w-2/6 mx-auto p-4 rounded-lg shadow-lg relative flex items-center">
                                {/* Left Side (Discount Info) */}
                                <div className="w-1/2 p-4">
                                    <h2 className="text-2xl font-bold">{coupon.amount}% OFF</h2>
                                    <p className="text-sm">on your next purchase</p>
                                    <p className="text-xs text-gray-700">use by {format(new Date(coupon.expiredDate),'P')}</p>
                                </div>

                                {/* Dotted Separator */}
                                <div className="h-20 w-0 border-l-2 border-dashed border-gray-600"></div>

                                {/* Right Side (Coupon Code) */}
                                <div className="w-1/2 text-center p-4">
                                    <h2 className="text-xl font-bold">{coupon.code}</h2>
                                    <p className="text-xs text-gray-700">Coupon Code</p>
                                </div>

                                {/* Notches on both sides */}
                                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full"></div>
                                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full"></div>
                            </div>
                        </SwiperSlide>
                    ))}


                </Swiper>
            </div>


        </div>
    );
};

export default CouponSection;