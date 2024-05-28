"use client"

import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash, HiHeart } from 'react-icons/hi';
import { signIn, useSession } from 'next-auth/react';
import {
    collection,
    deleteDoc,
    doc,
    getFirestore,
    onSnapshot,
    serverTimestamp,
    setDoc,
} from 'firebase/firestore';
import { app } from '../firebase.js';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atom/modalAtom.js';


export default function Icons({ id, uid }) {
    const { data: session } = useSession();
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]); // [1
    const db = getFirestore(app);
    const [open, setOpen] = useRecoilState(modalState)
    const [postId, setPostId] = useRecoilState(postIdState)
    const [comments, setComments] = useState([])


    const likePost = async () => {
        if (session) {
            if (isLiked) {
                await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid));
            } else {
                await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                    username: session.user.username,
                    timestamp: serverTimestamp(),
                });
            }
        } else {
            signIn();
        }
    };

    useEffect(() => {
        onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
            setLikes(snapshot.docs);
        });
    }, [db]);

    useEffect(() => {
        setIsLiked(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        );
    }, [likes]);

    const deletePost = async () => {
        if (window.confirm('Are you sure you want to delete')) {
            if (session?.user?.uid === uid) {

                deleteDoc(doc(db, 'posts', id))
                    .then(() => {
                        console.log('Document successfully deleted!');
                        window.location.reload()
                    })
                    .catch(err => console.log(err));
            } else {
                alert('You are not authorized to delete this post')
            }
        } else {
            signIn()
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts', id, 'comments'), (snapshot) => {
            setComments(snapshot.docs);
        });

        return () => unsubscribe()
    }, [db, id])

    return (
        <div className='flex justify-start gap-5 p-2 text-gray-500'>
            <div className='flex items-center'>

                <HiOutlineChat
                    onClick={() => {
                        if (!session) {
                            signIn()
                        } else {
                            setOpen(true)
                            setPostId(id)
                        }
                    }
                    }
                    className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100' />
                {
                    comments.length > 0 && (
                        <span className='text-xs'>
                            {comments.length}
                        </span>
                    )
                }
            </div>

            <div className='flex items-center'>
                {isLiked ? (
                    <HiHeart
                        onClick={likePost}
                        className='h-8 w-8 cursor-pointer rounded-full  transition text-red-600 duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
                    />
                ) : (
                    <HiOutlineHeart
                        onClick={likePost}
                        className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
                    />
                )}
                {likes.length > 0 && (
                    <span className={`text-xs ${isLiked && 'text-red-600'}`}>
                        {likes.length}
                    </span>
                )}
            </div>

            {
                session?.user?.uid === uid && (
                    <HiOutlineTrash onClick={deletePost} className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />

                )
            }

        </div>
    )
}
