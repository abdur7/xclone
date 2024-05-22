"use client"

import { useSession } from "next-auth/react"
import { HiOutlinePhotograph } from "react-icons/hi"

export default function Input() {
    const { data: session } = useSession()
    if (!session) return null
    return (
        <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
            <img
                src={session.user.image}
                className="rounded-full cursor-pointer h-11 w-11 hover:brightness-95 "
            />
            <div className="w-full divide-y divide-gray-200">
                <textarea rows="2" placeholder="Whats happening"
                    className="outline-none w-full border-none tracking-wide min-h-[50px] text-gray-700" />
                <div className="flex items-center justify-between py-2">
                    <HiOutlinePhotograph className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer" />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:brightness-90 shadow-md disabled:opacity-50">
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}
