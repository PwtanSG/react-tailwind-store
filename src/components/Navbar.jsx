import { useState } from 'react'
import { AiOutlineMenu, AiOutlineSearch, AiFillTag } from 'react-icons/ai'
import { BsCart3 } from 'react-icons/bs'
import { FaTimes, FaTruck, FaWallet } from 'react-icons/fa'
import { MdHelp, MdFavorite } from 'react-icons/md'

const Navbar = () => {

    const [showSidebar, setShowSidebar] = useState(false)
    return (
        <div className='w-screen mx-auto flex justify-between items-center p-4 bg-[#f8f8f8]'>
            {/* left side items  */}
            <div className='flex items-center'>
                <div className='cursor-pointer'>
                    <AiOutlineMenu size={30} onClick={() => setShowSidebar(!showSidebar)} />
                </div>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl p-2'>
                    <span className='font-bold font-mono text-orange-600'>Big </span><span className='font-bold font-mono'>Store</span>
                </h1>
                {/* <div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]'>
                    <p className='bg-black text-white rounded-full p-2'>Delivery</p>
                    <p className='p-2'>Pickup</p>
                </div> */}
            </div>


            {/* Search Input */}
            <div className='flex items-center'>
                <div className='bg-gray-200 rounded-full flex items-center px-2 w-[140px] sm:w-[300px]'>
                    <AiOutlineSearch size={25} />
                    <input
                        className='bg-transparent p-2 w-full focus:outline-none'
                        type='text'
                        placeholder='Search...'
                    />
                </div>
                <button className='bg-black text-white p-2 ml-[5px]'><BsCart3 size={20} /></button>
            </div>

            {/* overlay */}
            {showSidebar && <div className='bg-black/80 fixed inset-0'></div>}

            {/* side bar menu */}
            {showSidebar &&
                <div className='fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300'>
                    <FaTimes size={20}
                        className='absolute right-4 mt-4 cursor-pointer text-gray-700 hover:text-black transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none'
                        onClick={() => setShowSidebar(!showSidebar)}
                    />
                    {/* <h2 className='text-2xl p-4'>Menu</h2> */}
                    <div className='flex items-center p-4'>
                        <div className='cursor-pointer'>
                            <AiOutlineMenu size={30} onClick={() => setShowSidebar(!showSidebar)} />
                        </div>
                        <h1 className='text-2xl sm:text-3xl lg:text-4xl p-2'>
                        <span className='font-bold font-mono text-orange-600'>Big </span><span className='font-bold font-mono'>Store</span>
                        </h1>
                    </div>
                    <nav>
                        <ul className='flex-flex-col p-4 text-gray-700'>
                            <li className='text-xl py-3 flex items-center' ><FaTruck size={25} className='mr-4' />Orders</li>
                            <li className='text-xl py-3 flex items-center' ><MdFavorite size={25} className='mr-4' />Favorites</li>
                            <li className='text-xl py-3 flex items-center' ><FaWallet size={25} className='mr-4' />Wallet</li>
                            <li className='text-xl py-3 flex items-center' ><MdHelp size={25} className='mr-4' />Help</li>
                            <li className='text-xl py-3 flex items-center' ><AiFillTag size={25} className='mr-4' />Promotions</li>
                        </ul>
                    </nav>
                </div>
            }
        </div>
    )
}

export default Navbar
