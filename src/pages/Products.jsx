import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const Products = (props) => {
    const searchKeyword = props.search
    const navigate = useNavigate();
    const initData = []
    const [products, setProducts] = useState(initData)
    const [filteredProducts, setFilteredProducts] = useState(initData)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState({})
    const [favourite, setFavourite] = useState([1, 2])

    const IMG_PATH = process.env.REACT_APP_BACKEND_IMAGE_PATH
    const API_URL = process.env.REACT_APP_BACKEND_BASE_URL
    const APP_PATH = process.env.REACT_APP_PATH

    const updateToFavourite = (productId) => {
        console.log(productId)
        let selected_favourite = [...favourite]
        if (selected_favourite.includes(productId)) {
            // console.log('included: ', productId, selected_favourite);
            selected_favourite = selected_favourite.filter(item => item != productId)
            setFavourite(selected_favourite)
        } else {
            selected_favourite = [...favourite, productId]
            setFavourite(selected_favourite)
            
        }
        localStorage.setItem('favourite', JSON.stringify(selected_favourite))
    }

    const filterCategory = (category_id) => {
        if (!category_id) {
            setSelectedCategory(category_id)
            setFilteredProducts([...products])
            return
        }
        const filtered_products = products.filter((product) =>
            product.categoryid === category_id
        )
        setSelectedCategory(category_id)
        setFilteredProducts(filtered_products)
    }

    const getProductData = async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: API_URL + 'product',
            })
            setProducts(response.data.Products)
            setFilteredProducts(response.data.Products)
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

    useEffect(() => {
        setLoading(true)
        if (searchKeyword) {
            const searchItems = products.filter(
                item => item.name && item.name.toLowerCase().includes(searchKeyword.toLowerCase()),
            );
            setFilteredProducts(searchItems)
        } else {
            setFilteredProducts([...products])
        }
        setLoading(false)
    }, [searchKeyword])



    return (
        <div className='max-w-[1640px] mx-auto px-4 py-8'>
            {favourite.length}<br></br>
            {favourite.toString()}
            {/* <h1 id='shop' className='text-orange-600 font-bold text-4xl text-center'>Shop Now!</h1> */}
            {/* filter category */}
            {!loading &&
                <div className='flex flex-col lg:flex-row justify-between'>
                    <div>
                        <p className='font-bold text-gray-700'>Filter by Category : </p>
                        <div>
                            <button
                                className={`m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 ${selectedCategory === 0 ? "bg-orange-600 text-white" : ""}`}
                                onClick={() => filterCategory(0)}
                            >
                                All
                            </button>
                            {
                                categories.map((category) => {
                                    const selected = selectedCategory === category.categoryid
                                    return <button key={category.categoryid}
                                        className={`m-1 transition ease-in-out border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 hover:-translate-y-1 hover:scale-105 ${selected ? "bg-orange-600 text-white" : ""}`}
                                        onClick={() => filterCategory(category.categoryid)}
                                    >
                                        {category.cname}
                                    </button>
                                })
                            }
                        </div>
                    </div>
                </div>
            }
            {/* display products */}
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
                {filteredProducts.map((item, index) => (
                    <div
                        key={index}
                        className='border shadow-lg rounded-lg hover:scale-105 duration-500'
                    >
                        <img
                            src={item?.imageurl ? IMG_PATH + item.imageurl.substring(item.imageurl.lastIndexOf('/') + 1) : ''}
                            alt={item.name}
                            className='w-full h-[200px] object-cover rounded-t-lg cursor-pointer'
                            onClick={() => navigate(APP_PATH + 'product/' + item.productid)}
                        />
                        <div className='flex justify-between px-2 py-4 bg-gray-50'>
                            <p className='font-bold flex items-center'>{item.name}
                                <FaRegHeart
                                    size={20}
                                    className={`${favourite.includes(item.productid) ? 'text-[#e60000]' : 'text-gray-500'} ml-2 cursor-pointer`}
                                    onClick={()=>updateToFavourite(item.productid)}
                                />
                            </p>
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
