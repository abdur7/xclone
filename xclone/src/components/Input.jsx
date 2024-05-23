"use client"

import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { HiOutlinePhotograph } from "react-icons/hi"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { app } from '../firebase'

export default function Input() {
    const { data: session } = useSession()

    const [imageFileURL, setImageFileURL] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [imageFileUploading, setImageFileUploading] = useState(false)

    console.log(selectedFile)
    const imagePickRef = useRef()

    const addImageToPost = (e) => {
        const file = e.target.files[0]

        if (file) {
            setSelectedFile(file)
            setImageFileURL(URL.createObjectURL(file))
        }
    }

    const uploadImageToStorage = () => {
        setImageFileUploading(true)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + "-" + selectedFile.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('upload is ' + progress + "% done")
        },
            (error) => {
                console.log('upload error: ' + error)
                setImageFileUploading(false)
                setImageFileURL(null)
                setSelectedFile(null)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileURL(downloadURL)
                    setImageFileUploading(false)
                })
            }
        )
    }

    useEffect(() => {
        if (selectedFile) {
            uploadImageToStorage()
        }
    }, [selectedFile])
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
                {
                    selectedFile && (
                        <img src={imageFileURL} alt="post-image"
                            className="w-full max-h-[250px] object-cover cursor-pointer"
                        />
                    )
                }
                <div className="flex items-center justify-between py-2">
                    <HiOutlinePhotograph
                        className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
                        onClick={() => imagePickRef.current.click()}
                    />
                    <input type="file" hidden onChange={addImageToPost} ref={imagePickRef} accept="image/*" />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:brightness-90 shadow-md disabled:opacity-50">
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}




