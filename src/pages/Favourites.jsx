import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaRegHeart, FaHeart } from 'react-icons/fa';


const Favourites = () => {

    const [loading, setLoading] = useState(false)
    const [favProducts, setFavProducts] = useState([])
    const [status, setStatus] = useState({})
    const [favourite, setFavourite] = useState([])
    const IMG_PATH = process.env.REACT_APP_BACKEND_IMAGE_PATH
    const API_URL = process.env.REACT_APP_BACKEND_BASE_URL
    const navigate = useNavigate();
    const rendered = useRef(true)

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

    useEffect(() => {

        const getProductData = async () => {
            setLoading(true)
            const fav = [...favourite]
            try {
                const response = await axios({
                    method: 'get',
                    url: `${API_URL}products`,
                    // url: API_URL + 'products',
                })
                let fav_products = response.data.filter(product => fav.includes(product.id))
                setFavProducts(fav_products)
                setLoading(false)
            } catch (err) {
                // console.log('err', err)
                setLoading(false)
                setStatus({
                    ...status,
                    error: true,
                    errorMessage: err.response.data.message
                })
            }
        }

        getProductData()

    }, [API_URL, favourite])

    useEffect(() => {
        setFavourite(localStorage.getItem('favourite_pid') ? JSON.parse(localStorage.getItem('favourite_pid')) : [])
    }, [])

    return (
        <div className='max-w-[1640px] mx-auto px-4 py-8'>
            <div className='flex '>
                <h1 className='text-orange-600 font-bold text-4xl text-center'>My Favourites ({favProducts.length})</h1>
            </div>
            {!favProducts.length && <div className='py-8'>You have no favourites added yet!</div>}
            {(favProducts.length > 0) && (
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
                    {!loading &&
                        favProducts.map(item => (
                            <div
                                key={item.id}
                                className='border shadow-lg rounded-lg hover:scale-105 duration-500'
                            >
                                <img
                                    src={item?.image ? IMG_PATH + item.image.substring(item.image.lastIndexOf('/') + 1) : ''}
                                    alt={item.name}
                                    className='w-full h-[200px] object-cover rounded-t-lg cursor-pointer'
                                    onClick={() => navigate('/product/' + item.id)}
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
                        ))
                    }
                </div>)}
        </div>
    )
}

export default Favourites
