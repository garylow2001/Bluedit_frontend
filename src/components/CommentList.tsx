import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../AppState';
import axios from 'axios';

const CommentList= () => {
    const {state, dispatch} = useAppState()
    const headers = {"authorization": "bearer " + state.token}
    const API_URL = state.url + "/posts/"+ state.selected_post_id +"/comments"
    const [comments,setComments] = useState<any>()
    const getComments = () => {
        axios.get(API_URL,{headers})
        .then((resp)=> {
            console.log(resp)
            setComments(resp.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(()=> {
        let mounted = true;
        getComments()
    }, []);
    return (<div>
            <h2>{comments.map((body:any) => <h1>{body}</h1>)}</h2>
        <Link to="/threads">Back to threads</Link>
        </div>)
    }
export default CommentList;