import React from 'react'


const Login = () => {

    const loginImage = '/images/supermarket-banner.jpeg'

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
                    <h2 className='text-2xl font-semibold text-center'>Member Sign in</h2>
                    <div className='flex flex-col py-2'>
                        <label>Username</label>
                        <input
                            type='text'
                            className='border rounded-lg py-2'
                        />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Password</label>
                        <input
                            type='password'
                            className='border rounded-lg py-2'
                        />
                        <button className='border-orange-500 w-full my-5 py-2 bg-orange-500 hover:bg-orange-400 text-white'>Sign In</button>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <div><input type='checkbox' className='mr-2'/></div>
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
