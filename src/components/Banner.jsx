import React from 'react'
import image from '../images/supermarket-banner.jpeg'

const Banner = () => {
    return (
        <div className='max-w-[1640px] mx-auto p-4'>
            <div className='max-h-[400px] relative'>
                {/* overlay text */}
                <div className='absolute w-full h-full text-gray-200 max-h-[400px] bg-black/30 flex flex-col justify-center rounded-xl'>
                    <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7x'>Your <span className='text-red-500'>Everyday</span></h1>
                    <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7x'><span>Store</span></h1>
                </div>
                <img
                    className='w-full max-h-[400px] object-cover rounded-xl' 
                    src='https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg'
                    alt='banner' />
                {/* <img src={require('../images/supermarket-banner.jpeg')} alt='banner' /> */}
            </div>
        </div>
    )
}

export default Banner
