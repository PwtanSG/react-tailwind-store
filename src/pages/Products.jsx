import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Products = () => {
    const navigate = useNavigate();
    const initData = []
    const [products, setProducts] = useState(initData)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState({})

    const IMG_PATH = process.env.REACT_APP_BACKEND_IMAGE_PATH
    const API_URL = process.env.REACT_APP_BACKEND_BASE_URL

    const getProductData = async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: API_URL + 'product',
            })
            setProducts(response.data.Products)
            // setLoading(false)
        } catch (err) {
            // console.log('err', err)
            // setLoading(false)
            setStatus({
                ...status,
                error: true,
                errorMessage: err.response.data.message
            })
        }
    }
    const getCategoriesData = async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: API_URL + 'category',
            })
            setCategories(response.data.Category)
            // setLoading(false)
        } catch (err) {
            // console.log('err', err)
            // setLoading(false)
            setStatus({
                ...status,
                error: true,
                errorMessage: err.response.data.message
            })
        }
    }

    // const getCategoriesData = () => {
    //     axios.get(`${API_URL}category`)
    //         .then((res) => {
    //             console.log(res.data.Category)
    //             setCategories(res.data.Category)
    //         })
    //         .catch(error => console.log('error', error))
    // }

    // const getProductData = () => {
    //     axios.get(`${API_URL}product`)
    //         .then((res) => {
    //             console.log(res.data.Products)
    //             setProducts(res.data.Products)
    //         })
    //         .catch(error => console.log('error', error))
    // }

    // const getCategoriesData = () => {
    //     axios.get(`${API_URL}category`)
    //         .then((res) => {
    //             console.log(res.data.Category)
    //             setCategories(res.data.Category)
    //         })
    //         .catch(error => console.log('error', error))
    // }


    useEffect(() => {
        setLoading(true)
        getProductData()
        getCategoriesData()
        setLoading(false)
    }, [])

    return (
        <div className='max-w-[1640px] mx-auto px-4 py-8'>
            <h1 className='text-orange-600 font-bold text-4xl text-center'>Shop Now!</h1>
            {/* filter category */}
            {!loading &&
                <div className='flex flex-col lg:flex-row justify-between'>
                    <div>
                        <p className='font-bold text-gray-700'>Filter by Category : </p>
                        <div>
                            <button className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300'>All</button>
                            {
                                categories.map((category) => (
                                    <button key={category.categoryid}
                                        className='m-1 transition ease-in-out border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 hover:-translate-y-1 hover:scale-105'
                                    >
                                        {category.cname}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            }
            {/* display products */}
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
                {products.map((item, index) => (
                    <div
                        key={index}
                        className='border shadow-lg rounded-lg hover:scale-105 duration-500'
                    >
                        <img
                            src={item?.imageurl ? IMG_PATH + item.imageurl.substring(item.imageurl.lastIndexOf('/') + 1) : ''}
                            alt={item.name}
                            className='w-full h-[200px] object-cover rounded-t-lg cursor-pointer'
                            onClick={() => navigate('product/' + item.productid)}
                        />
                        {/* src={item?.imageurl ? item.imageurl : ''} */}
                        {/* src={item?.imageurl? item.imageurl : require('../images/avocado.png')}  */}
                        {/* src={item.image} */}
                        <div className='flex justify-between px-2 py-4 bg-gray-50'>
                            <p className='font-bold'>{item.name}</p>
                            <p>
                                <span className='bg-orange-500 text-white px-2 p-1 rounded-full'>
                                    ${item.price}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
