import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../AppState';
import axios from 'axios';

const CommentList= (props:any) => {
    const {state, dispatch} = useAppState()
    const headers = {"authorization": "bearer " + state.token}
    const API_URL = state.url + "/posts/"+ state.selected_post_id
    const post = props.post
    const [EditPost,setEditPost] = useState(false)

    const initialFormData = {
        title: post.title,
        category: post.category, 
        body: post.body
    }

    const [formData,setFormData] = useState(initialFormData)
    // if bug in handledit, try useeffect initialformdata
    useEffect(()=> {
        setFormData(formData)
    }, [EditPost])

    const handleEdit = () => {
        setFormData(initialFormData) // need this to pre-fill text field as somehow placeholder doesn't work
        setEditPost(true)
    }
    const handleCancel = () => {
        setFormData(initialFormData)
        setEditPost(false)
    }
    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }
    const handleDelete = () => {
        console.log(props)
    }
    const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.put(API_URL, {
            "title":formData.title, 
            "category":formData.category,
            "body":formData.body,
        },{headers}
        ).then(
            (resp) => {
                console.log(resp.data)
                setEditPost(false)
            }
        ).catch(
            (err) => console.log(err)
        )
    }
    
    return <div> {EditPost
        ?<form onSubmit={handleSubmit}>
            <h2><input 
                type="text"
                id="title"
                onChange={handleChange}
                value={formData.title}
                required
            /></h2>
            <p>Category: <input 
                type="text" //change to dropdown
                id="category"
                onChange={handleChange}
                value={formData.category}
                required
            /> Created by: {post.username} </p>
            <p><input 
                type="text"
                id="body"
                onChange={handleChange}
                value={formData.body}
                required
            /></p>
            <>
            <button>Change</button>
            <button onClick={handleCancel}>Cancel</button>
            </>
        </form>
        :<div>
            <h2>{post.title} </h2>
            <p>Category: {post.category}   Created by: {post.username}</p>
            <p>{post.body}</p>
            <div>
            {state.user_id === post.user_id
                ? <>
                <button onClick={handleEdit}>edit</button>
                <button onClick={handleDelete}>delete</button>
                </>
                : ""}
            </div>
        </div>}
        <Link to="/threads">Back to threads</Link>
        </div>
    }
export default CommentList;