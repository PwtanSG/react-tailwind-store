import { useState } from 'react'
import axios from 'axios'
import { FaSignInAlt, FaSpinner } from 'react-icons/fa'


const Login = () => {

    const loginImage = '/images/supermarket-banner.jpeg'
    const initFormData = {
        email: '',
        password: ''
    }
    const initStatus = {
        error: false,
        errorMessage: ''
    }
    const API_URL = process.env.REACT_APP_BACKEND_BASE_URL
    const [formData, setFormData] = useState(initFormData)
    const [processing, setProcessing] = useState(false)
    const [status, setStatus] = useState(initStatus)

    const onChangeHandler = (e) => {
        setFormData(
            (prevData) => (
                {
                    ...prevData,
                    [e.target.name]: e.target.value
                }
            )
        )
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setStatus({
                error: true,
                errorMessage: 'Please fill in email & password'
            })
            return false;
        }

        var validEmailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!formData.email.match(validEmailFormat)) {
            setStatus({
                error: true,
                errorMessage: 'Invalid email address'
            })
            return false;
        }

        try {
            setProcessing(true)
            const response = await axios(
                {
                    method: 'post',
                    url: `${API_URL}user/login`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: formData
                }
            )
            setProcessing(false)
            if (response.status === 200) {
                if (response.data?.JWT) {
                    localStorage.setItem('user', JSON.stringify({
                        email: formData.email,
                        token: response.data.JWT
                    }))
                    setStatus(initStatus)

                } else {
                    setStatus({
                        error: true,
                        errorMessage: 'Invalid credentials'
                    })
                }
            }
        } catch (error) {
            setProcessing(false)
            console.log(error)
            setStatus({
                error: true,
                errorMessage: 'Error Loging in.'
                // errorMessage: error.message
            })
        }

        // const config = {
        //     method: 'post',
        //     url: `${API_URL}user/login`,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     data: formData
        // };
        // axios(config)
        //     .then(function (response) {
        //         console.log(response)
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img
                    className='w-full h-screen object-cover'
                    src={loginImage}
                    alt='login page' />
            </div>
            <div className='flex flex-col justify-center p-5'>
                <form className='bg-gray-100 p-4 rounded-md'>
                    <h2 className='flex text-2xl font-semibold text-center justify-center items-center'>
                        <FaSignInAlt />
                        <span className='ml-2'>Sign in</span>
                    </h2>
                    {status.error && <div className='text-center text-[#f00] mt-2'>{status.errorMessage}</div>}
                    <div className='flex flex-col py-2'>
                        <label>Email</label>
                        <input
                            name='email'
                            type='text'
                            className='border rounded-lg py-2 px-1'
                            placeholder=' Enter your email'
                            value={formData.email}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Password</label>
                        <input
                            name='password'
                            type='password'
                            className='border rounded-lg py-2'
                            value={formData.password}
                            onChange={onChangeHandler}
                        />
                        <button
                            className='border-orange-500 w-full my-5 py-2 bg-orange-500 hover:bg-orange-400 text-white flex justify-center items-center'
                            onClick={onSubmitHandler}
                            disabled={processing ? true : false}
                        >
                            <span>Sign In</span>
                            {processing && <FaSpinner className='animate-spin ml-2' />}
                        </button>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <div><input type='checkbox' className='mr-2' /></div>
                            <div>Remember Me</div>
                        </div>
                        <p>New Sign Up</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
