"use cient"

import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { HiDotsHorizontal, HiHeart, HiOutlineHeart, HiOutlineTrash } from 'react-icons/hi';
import { app } from '../firebase';

export default function Comment({ comment, originalPostId, commentId }) {
    const { data: session } = useSession();
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]); // [1
    const db = getFirestore(app);

    const likeComment = async () => {
        if (session) {
            if (isLiked) {
                await deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session.user.uid));
            } else {
                await setDoc(doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session.user.uid), {
                    username: session.user.username,
                    timestamp: serverTimestamp(),
                });
            }
        } else {
            signIn();
        }
    };

    useEffect(() => {
        onSnapshot(collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'), (snapshot) => {
            setLikes(snapshot.docs);
        });
    }, [db]);

    useEffect(() => {
        setIsLiked(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        );
    }, [likes]);

    const deleteComment = async () => {
        if (window.confirm('Are you sure you want to delete')) {
            if (session?.user?.username === comment.username) {

                deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId))
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
    return (
        <div className='flex p-3 border-b border-gray-200 hover:bg-gray-50 pl-10'>
            <img
                src={comment?.userImg}
                alt='user-img'
                className='h-9 w-9 rounded-full mr-4'
            />
            <div className='flex-1'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-1 whitespace-nowrap'>
                        <h4 className='font-bold text-sm truncate'>{comment?.name}</h4>
                        <span className='text-xs truncate'>@{comment?.username}</span>
                    </div>
                    <HiDotsHorizontal className='text-sm' />
                </div>

                <p className='text-gray-800 text-xs my-3'>{comment?.comment}</p>
                <div className='flex items-center gap-3'>

                    <div className='flex items-center'>
                        {isLiked ? (
                            <HiHeart
                                onClick={likeComment}
                                className='h-8 w-8 cursor-pointer rounded-full  transition text-red-600 duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100'
                            />


                        )

                            : (
                                <HiOutlineHeart
                                    onClick={likeComment}
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
                        session?.user?.username === comment.username && (
                            <HiOutlineTrash onClick={deleteComment} className='h-8 w-8 cursor-pointer rounded-full  transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />

                        )
                    }
                </div>

            </div>
        </div>
    )
}
