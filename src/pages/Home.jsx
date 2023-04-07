import React from 'react'
import Banner from "../components/Banner";
import ImageSlider from "../components/ImageSlider";
import HeadlineCards from "../components/HeadlineCards";
import Products from "./Products";

const Home = ({search}) => {
    return (
        <>
            {/* <Banner /> */}
            <ImageSlider autoSlide={true} autoSlideInterval={8000}/>
            {/* <HeadlineCards /> */}
            <Products search={search}/>
        </>
    )
}

export default Home
