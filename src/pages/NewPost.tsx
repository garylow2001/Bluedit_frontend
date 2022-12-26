import axios from "axios"
import React, { useState } from "react"
import { useAppState } from "../AppState"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const NewPost = () => {
    const {state,dispatch} = useAppState()
    const API_URL = "http://localhost:3000/posts"
    const headers = {"authorization": "bearer " + state.token}
    const navigate = useNavigate()
    const goThreads = () => {
        return navigate('/threads')
    }
    const [formData,setFormData] = useState({
        title: "",
        category:"",
        body:"",
        user_id:state.user_id,
        username:state.username,
    })
    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }
    const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post(API_URL, formData,{headers})
            .then((resp)=> console.log(resp))
            .catch((err)=> console.log(err))
        goThreads()
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1> Add a new post</h1>
            <h2>Title: <input 
                    type="text"
                    id="title"
                    onChange={handleChange}
                    value={formData.title}
                    required
                />
            </h2>
            <h2>Category: <input 
                    type="text"
                    id="category"
                    onChange={handleChange}
                    value={formData.category}
                    required
                />
            </h2>
            <h2>Body: <input 
                    type="text"
                    id="body"
                    onChange={handleChange}
                    value={formData.body}
                    required
                />
            </h2>
            <button>Add post</button>
            <div>
                <Link to="/threads">Back to Threads</Link>
            </div>
        </form>
    )
}

export default NewPost