"use client"
import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { app } from '../firebase'
import Comment from './Comment'

export default function Comments({ id }) {
    const db = getFirestore(app)
    const [comments, setComments] = useState([])
    console.log(comments)

    useEffect(() => {
        onSnapshot(
            query(
                collection(db, 'posts', id, 'comments'),
                orderBy('timeStamp', 'desc')
            ),
            (snapshot) => {
                console.log(snapshot)
                setComments(snapshot.docs);
            }
        );
    }, [id, db]);
    return (
        <div>
            {
                comments.map((comment) => (
                    <Comment key={comment.id} comment={comment.data()} id={comment.id} />
                ))
            }
        </div>
    )
}
