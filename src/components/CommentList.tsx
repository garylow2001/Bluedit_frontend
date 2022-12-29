import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../AppState';
import axios from 'axios';

const CommentList= (props: {post_id : number}) => {
    const {state, dispatch} = useAppState()
    const headers = {"authorization": "bearer " + state.token}
    const API_URL = state.url + "/posts/"+ props.post_id +"/comments"
    const [comments,setComments] = useState([])
    const getComments = async () => {
        await axios.get(API_URL,{headers})
        .then((resp)=> {
            setComments(resp.data)
            console.log(resp.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(()=> {
        let mounted = true;
        getComments()
    }, []);
    return <div>
        {
            comments.map((comment:any) => {
                return <div key={comment.id}>
                    <p>{comment.body}</p>
                </div>
            })
        }
    </div>
    }
export default CommentList;