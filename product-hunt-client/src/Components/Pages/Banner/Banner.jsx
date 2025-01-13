import bannerImg from '../../../assets/images/banner.png'

const Banner = () => {
    return (
        <div className='pt-24'>
            <img src={bannerImg} alt="" className='bg-cover w-full h-[500px]' />
        </div>
    );
};

export default Banner;