import React from 'react'
import Banner from "../components/Banner";
import HeadlineCards from "../components/HeadlineCards";
import Products from "./Products";
import Navbar from "../components/Navbar";

const Home = ({search}) => {
    return (
        <>
            {/* <Navbar /> */}
            <Banner />
            <HeadlineCards />
            <Products search={search}/>
        </>
    )
}

export default Home
