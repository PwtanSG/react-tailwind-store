import { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight, FaMinus } from 'react-icons/fa'


const ImageSlider = ({ autoSlide = false, autoSlideInterval = 3000 }) => {

    const [currentImgIndex, setCurrentImgIndex] = useState(0)
    const slides = [
        {
            url: '/images/supermarket-banner.jpeg',
            text: 'Wide Variety Of Choice'
        },
        {
            url: '/images/supermarket-banner1.jpg',
            text: 'Freshest Produce'
        },
        {
            url: '/images/supermarket-banner2.jpg',
            text: 'Your everyday store'
        },
        {
            url: '/images/supermarket-banner3.jpg',
            text: 'Freshness Guarantee'
        },
        {
            url: '/images/supermarket-banner4.jpg',
            text: 'All for you'
        },
    ];

    const prevSlide = () => {
        setCurrentImgIndex(currentImgIndex === 0 ? slides.length - 1 : currentImgIndex - 1)
    };

    const nextSlide = () => {
        // setCurrentImgIndex(currentImgIndex === slides.length - 1 ? 0 : currentImgIndex + 1)
        setCurrentImgIndex((currentImgIndex) => currentImgIndex === slides.length - 1 ? 0 : currentImgIndex + 1)
    };

    const goToSlide = (slideIndex) => {
        setCurrentImgIndex(slideIndex);
    };

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(nextSlide, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, [])

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
                <div className='absolute bottom-5 left-0 right-0'>
                    <div className='flex justify-center items-center'>
                        {
                            slides.map((slide, idx) => (
                                <FaMinus
                                    size={currentImgIndex === idx ? 23 : 20}
                                    key={idx}
                                    className={`${currentImgIndex === idx ? 'text-white' : 'text-gray-300'} mt-2 cursor-pointer`}
                                    onClick={() => goToSlide(idx)}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className='absolute bottom-10 left-10 text-gray-200 font-semibold text-2xl '>
                    {slides[currentImgIndex].text}
                </div>
            </div>
        </div>
    )
}

export default ImageSlider
