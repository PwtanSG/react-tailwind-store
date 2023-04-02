import React from 'react'
import Banner from "../components/Banner";
import HeadlineCards from "../components/HeadlineCards";
import Products from "./Products";

const Home = ({search}) => {
    return (
        <>
            <Banner />
            {/* <HeadlineCards /> */}
            <Products search={search}/>
        </>
    )
}

export default Home
