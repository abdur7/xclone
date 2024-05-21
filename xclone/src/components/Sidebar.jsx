import Link from 'next/link';
import React from 'react'
import { BsTwitterX } from "react-icons/bs"
import { RiHome2Fill } from "react-icons/ri";

export default function Sidebar() {
    return (
        <div className='flex flex-col gap-4 p-3 '>
            <div >
                <Link href="/">
                    <BsTwitterX
                        className='w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200' />
                </Link>
            </div>

            <Link href='/'
                className=' flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'>

                <RiHome2Fill className='w-7 h-7' />
                <span className='font-bold hidden lg:inline'>Home</span>
            </Link>

            <button className='bg-blue-500 text-white rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden lg:inline'>Sign In</button>
        </div>
    )
}
