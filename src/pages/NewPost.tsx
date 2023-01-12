import axios from "axios"
import React, { useState } from "react"
import { useAppState } from "../AppState"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import DropDown from "../components/DropDown"

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
    ////////////////////////// For Category Dropdown///////////////////////////
    const chooseCategory = (cat:string) => {
        setFormData({...formData,["category"]: cat})
    }
    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////// Handle Posts //////////////////////////////////
    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }
    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axios.post(API_URL, formData,{headers})
            .then((resp)=> console.log(resp))
            .catch((err)=> console.log(err))
        goThreads()
    }
    /////////////////////////////////////////////////////////////////////////////
    return (
        <form onSubmit={handleSubmit} className="h-full w-1/2 space-y-2 border-2 rounded-md px-5 py-5 bg-golden-yellow">
            <h1 className="mb-5 text-3xl font-medium"> Add a new post</h1>
            <h2 className="text-2xl font-medium">Title: <input 
                    type="text"
                    id="title"
                    onChange={handleChange}
                    value={formData.title}
                    required
                    className="block w-1/2 m-auto h-full appearance-none rounded-md border border-gray-300 
                            px-3 py-2 text-black placeholder:text-black focus:z-10 focus:border-black
                            focus:outline-none focus:ring-white sm:text-sm bg-slate-200"
                />
            </h2>
            <h2 className="text-2xl font-medium"> Category:</h2>
            <DropDown placeHolder="Select..." chooseCategory={chooseCategory}/>
            <h2 className="text-2xl font-medium"> Body: 
            <input 
                    type="text"
                    id="body"
                    onChange={handleChange}
                    value={formData.body}
                    required
                    className="block w-1/2 m-auto h-full appearance-none rounded-md border border-gray-300 
                            px-3 py-2 text-black placeholder:text-black focus:z-10 focus:border-black
                            focus:outline-none focus:ring-white sm:text-sm bg-slate-200"
                />
            </h2>
            <button className='my-2 px-1 py-2 font-medium border-2 rounded-md bg-darkgrey text-white
                    hover:bg-grey hover:shadow-lg hover:shadow-white w-64'>Add post</button>
            <div className="my-2 w-full">
                <Link to="/threads" className='my-auto px-1 py-2 font-medium  text-3xl underline'>Back to Threads</Link>
            </div>
        </form>
    )
}

export default NewPost