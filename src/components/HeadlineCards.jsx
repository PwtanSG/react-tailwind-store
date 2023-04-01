import React from 'react'

const HeadlineCards = () => {

    const APP_PATH = process.env.REACT_APP_PATH

    return (
        <div className='w-screen'>
            <div className='max-w-[1640px] mx-auto px-4 py-3 grid md:grid-cols-3 gap-3'>
                <div className='rounded-xl relative'>
                    {/* overlay */}
                    <div className='rounded-xl absolute w-full h-full bg-black/40 text-white'>
                        <p className='font-bold text-2xl pt-4 px-2'>Promotions</p>
                        <p className='px-2'>While stock last!</p>
                        <button className='border-white bg-white text-black font-bold mx-2 absolute bottom-4'>View</button>
                    </div>
                    <img
                        className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
                        src={APP_PATH + '/images/grocery2.png'}
                        alt='promotions'
                    />
                </div>
                <div className='rounded-xl relative'>
                    {/* overlay */}
                    <div className='rounded-xl absolute w-full h-full bg-black/40 text-white'>
                        <p className='font-bold text-2xl pt-4 px-2'>Best Seller</p>
                        <p className='px-2'>People just love this!</p>
                        <button className='border-white bg-white text-black font-bold mx-2 absolute bottom-4'>View</button>
                    </div>
                    <img
                        className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
                        src={APP_PATH + '/images/grocery3.png'}
                        alt='best seller'
                    />
                </div>
                <div className='rounded-xl relative'>
                    {/* overlay */}
                    <div className='rounded-xl absolute w-full h-full bg-black/40 text-white'>
                        <p className='font-bold text-2xl pt-4 px-2'>New Arrivals</p>
                        <p className='px-2'>We are new here!</p>
                        <button className='border-white bg-white text-black font-bold mx-2 absolute bottom-4'>View</button>
                    </div>
                    <img
                        className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
                        src={APP_PATH + '/images/grocery4.png'}
                        alt='new arrivals'
                    />
                </div>
            </div>
        </div>
    )
}

export default HeadlineCards
