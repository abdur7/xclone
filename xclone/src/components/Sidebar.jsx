"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { BsTwitterX } from "react-icons/bs"
import { RiHome2Fill } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi"

export default function Sidebar() {
    const { data: session } = useSession()

    return (
        <div className='flex flex-col justify-between h-screen p-3 '>
            <div className='flex flex-col gap-4'>
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

                {session ? (
                    <button
                        onClick={() => signOut()}
                        className='bg-blue-500 text-white rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden lg:inline'>
                        Sign Out
                    </button>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className='bg-blue-500 text-white rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden lg:inline'>
                        Sign In
                    </button>
                )}

            </div>
            {
                session && (
                    <div className='flex gap-2 items-center text-gray-700 text-sm cursor-pointer p-3 rounded-full hover:bg-gray-100 transition-all duration-200'>
                        <img src={session.user.image} alt='profile-image' className='h-10 w-10 rounded-lg' />
                        <div className='hiddel md:inline '>
                            <h4 className='font-bold'>{session.user.name}</h4>
                            <p className='text-gray-500'>@{session.user.username}</p>
                        </div>
                        <HiDotsHorizontal className="h-5 xl:ml-8 hidden lg:inline" />
                    </div>
                )
            }
        </div>
    )
}
