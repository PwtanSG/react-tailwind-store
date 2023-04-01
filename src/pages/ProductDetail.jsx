import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProductDetail = () => {
    const initProduct = {
        productid: '',
        description: '',
        name: '',
        imageurl: '',
        price: 0
    }
    const initStatus = {}
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState(initProduct)
    const [status, setStatus] = useState(initStatus)
    const { id } = useParams()
    const IMG_PATH= process.env.REACT_APP_BACKEND_IMAGE_PATH
    const API_URL = process.env.REACT_APP_BACKEND_BASE_URL
    const APP_PATH = process.env.REACT_APP_PATH
    // console.log(API_URL)
    const navigate = useNavigate()
    const getProduct = async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: API_URL + 'product/' + id,
            })
            setProduct(response.data)
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

    useEffect(() => {
        getProduct();
    }, [id])

    return (
        <div className='max-w-[840px] mx-auto px-4 py-8'>
            <div className='grid sm:grid-cols-2 gap-8 pt-4'>
                <div
                    className='border shadow-lg rounded-lg'
                >
                    <img
                        src={product?.imageurl? IMG_PATH + product.imageurl.substring(product.imageurl.lastIndexOf('/')+1) : ''}
                        alt={product.name}
                        className='w-full h-[300px] object-cover rounded-lg'
                    />
                    {/* src={product?.imageurl} */}
                    {/* src={item?.imageurl? item.imageurl : require('../images/avocado.png')}  */}
                    {/* src={item.image} */}

                </div>
                <div className='relative'>
                    <h2 className='font-bold mt-0 sm:mt-5'>{product.name}</h2>
                    <p className='mt-3'>{product.description} </p>
                    <p className='mt-3'>Price : ${product.price}</p>
                    <button
                        className='md:absolute md:left-0 md:bottom-5 mt-5 m-1 font-bold border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 hover:font-bold'
                        onClick={() => navigate(APP_PATH)}
                    >
                        Home
                    </button>
                </div>
            </div>

        </div>
    )

}

export default ProductDetail

