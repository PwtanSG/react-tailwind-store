import { useState, useEffect, useRef } from 'react';
import { redirect, useNavigate } from 'react-router-dom'
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
    const [favourite, setFavourite] = useState([])
    const rendered = useRef(true)

    const IMG_PATH = process.env.REACT_APP_BACKEND_IMAGE_PATH
    const API_URL = process.env.REACT_APP_BACKEND_BASE_URL
    const APP_PATH = process.env.REACT_APP_PATH

    const updateToFavourite = (productId) => {
        let selected_favourite = [...favourite]
        if (selected_favourite.includes(productId)) {
            selected_favourite = selected_favourite.filter(item => item !== productId)
            setFavourite(selected_favourite)
        } else {
            selected_favourite = [...favourite, productId]
            setFavourite(selected_favourite)

        }
        localStorage.setItem('favourite_pid', JSON.stringify(selected_favourite))
    }

    const filterCategory = (category_id) => {
        if (!category_id) {
            setSelectedCategory(category_id)
            setFilteredProducts([...products])
            return
        }
        const filtered_products = products.filter((product) =>
            product.category_id === category_id
        )
        setSelectedCategory(category_id)
        setFilteredProducts(filtered_products)
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

        const getProductData = async () => {
            setLoading(true)
            try {
                const response = await axios({
                    method: 'get',
                    url: API_URL + 'products',
                })
                // setProducts(response.data.Products)
                setProducts(response.data)
                // setFilteredProducts(response.data.Products)
                setFilteredProducts(response.data)
                console.log(response.data)
            } catch (err) {
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
                    url: API_URL + 'categories',
                })
                setCategories(response.data)
                // setCategories(response.data.Category)
                // console.log(response.data)
            } catch (err) {
                setStatus({
                    ...status,
                    error: true,
                    errorMessage: err.response.data.message
                })
            }
        }

        if (rendered.current) {
            // console.log(rendered.current)
            setLoading(true)
            getProductData()
            getCategoriesData()
            setFavourite(localStorage.getItem('favourite_pid') ? JSON.parse(localStorage.getItem('favourite_pid')) : [])
            setLoading(false)
            // rendered.current = false
        }

        return () => {
            rendered.current = false
        }
    }, [API_URL])

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
    }, [searchKeyword, products])



    return (
        <div className='max-w-[1640px] mx-auto px-4 py-8'>
            {/* <h1 id='shop' className='text-orange-600 font-bold text-4xl text-center'>Shop Now!</h1> */}
            {/* filter category */}
            {!loading &&
                <div className='flex flex-col lg:flex-row justify-between'>
                    <div>
                        <div className='font-bold text-gray-700'>Filter by Category : </div>
                        <div>
                            <button
                                className={`m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 ${selectedCategory === 0 ? "bg-orange-600 text-white" : ""}`}
                                onClick={() => filterCategory(0)}
                            >
                                All
                            </button>
                            {
                                categories.map((category) => {
                                    const selected = selectedCategory === category.id
                                    return <button key={category.id}
                                        className={`m-1 transition ease-in-out border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 hover:-translate-y-1 hover:scale-105 ${selected ? "bg-orange-600 text-white" : ""}`}
                                        onClick={() => filterCategory(category.id)}
                                    >
                                        {category.name}
                                    </button>
                                })
                            }
                        </div>
                    </div>
                </div>
            }
            {/* display products */}
            <div className='text-gray-700'>items found : {filteredProducts.length}</div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>

                {filteredProducts.map((item, index) => (
                    <div
                        key={index}
                        className='border shadow-lg rounded-lg hover:scale-105 duration-500'
                    >
                        <img
                            src={item?.image ? IMG_PATH + item.image.substring(item.image.lastIndexOf('/') + 1) : ''}
                            alt={item.name}
                            className='w-full h-[200px] object-cover rounded-t-lg cursor-pointer'
                            onClick={() => navigate(APP_PATH + 'product/' + item.id)}
                        />
                        <div className='flex justify-between px-2 py-4 bg-gray-50'>
                            <p className='font-bold flex items-center'>{item.name}

                                {favourite.includes(item.id) ?
                                    (<FaHeart
                                        size={18}
                                        className='text-[#e60000] ml-2 cursor-pointer'
                                        onClick={() => updateToFavourite(item.id)}
                                    />)
                                    :
                                    (<FaRegHeart
                                        size={18}
                                        className='text-gray-500 ml-2 cursor-pointer'
                                        onClick={() => updateToFavourite(item.id)}
                                    />)}
                            </p>
                            <p>
                                <span className='bg-orange-500 text-white px-2 p-1 rounded-full'>
                                    ${Number(item.price).toFixed(2)}
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
