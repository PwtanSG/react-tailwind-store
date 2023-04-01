import { useState } from 'react'

const Banner = () => {
    const APP_PATH = process.env.REACT_APP_PATH
    const bannerImage = APP_PATH + '/images/supermarket-banner.jpeg'
    const [loaded, setLoaded] = useState(false)

    return (
        <div className='w-screen'>
            <div className='max-w-[1640px] mx-auto pt-4 px-4 pb-0'>
                <div className='max-h-[400px] relative'>
                    {/* overlay text */}
                    <div className='absolute w-full h-full text-gray-200 max-h-[400px] bg-black/30 flex flex-col justify-center rounded-xl'>
                        {loaded &&
                            <>
                                <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7x'>Your <span className='text-red-500'>Everyday</span></h1>
                                <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7x'><span>Store</span></h1>
                            </>
                        }
                    </div>
                    <img
                        className='w-full max-h-[400px] object-cover rounded-xl'
                        src={bannerImage}
                        alt='banner'
                        onLoad={() => setLoaded(true)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner
