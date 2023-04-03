import { useState } from 'react'
import { FaAngleLeft, FaAngleRight, FaMinus } from 'react-icons/fa'


const ImageSlider = () => {

    const [currentImgIndex, setCurrentImgIndex] = useState(0)
    const slides = [
        {
            url: '/images/supermarket-banner.jpeg',
            text: 'Wide Variety Of Choice'
        },
        {
            url: '/images/grocery3.png',
            text: 'Freshest Produce'
        },
        {
            url: '/images/grocery4.png',
            text: 'Your everyday store'
        },
        {
            url: '/images/grocery5.png',
            text: 'Freshness Guarantee'
        },
        {
            url: '/images/grocery2.png',
            text: 'All for you'
        },
    ];

    const prevSlide = () => {
        const isFirstSlide = currentImgIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentImgIndex - 1;
        setCurrentImgIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentImgIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentImgIndex + 1;
        setCurrentImgIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentImgIndex(slideIndex);
    };

    return (
        <div className='w-screen'>
            <div className='max-w-[1400px] h-[390px] m-auto py-4 px-4 relative group'>
                <img
                    className='w-full h-full rounded-2xl object-cover duration-500'
                    src={slides[currentImgIndex].url}
                />
                {/* left arrow */}
                <div className='absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-gray-300 hover:text-white bg-black/20 cursor-pointer'>
                    <FaAngleLeft size={30} onClick={prevSlide} />
                </div>
                {/* right arrow */}
                <div className='absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-gray-300 hover:text-white bg-black/20 cursor-pointer'>
                    <FaAngleRight size={30} onClick={nextSlide} />
                </div>
                <div className='flex justify-center'>
                    {
                        slides.map((slide, idx) => (
                            <FaMinus 
                                key={idx} 
                                className={`${currentImgIndex === idx? 'text-gray-800':'text-gray-400' } mt-2 cursor-pointer`} 
                                onClick={()=>goToSlide(idx)}
                            />
                        ))
                    }
                </div>
                <div className='absolute bottom-10 left-10 text-gray-200 font-semibold text-2xl '>
                    {slides[currentImgIndex].text}
                </div>
            </div>

        </div>
    )
}

export default ImageSlider
