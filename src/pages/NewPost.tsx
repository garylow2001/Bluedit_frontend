import axios from "axios"
import React, { useEffect, useState } from "react"
import { useAppState } from "../AppState"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import DropDown from "../components/DropDown"

const NewPost = () => {
    const {state} = useAppState()
    const API_URL = "https://retrohub-backend.herokuapp.com/posts"
    const headers = {"authorization": "bearer " + state.token}
    const navigate = useNavigate()
    const goThreads = () => {
        return navigate('/threads')
    }
    const goHome = () => {
        return navigate('/')
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
    const handleChange= (e: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value})
        e.target.style.height = '36px'
        e.target.style.height = `${e.target.scrollHeight}px`
    }
    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formData.category === "") {
            alert("Please select a category")
        }
        else {
            await axios.post(API_URL, formData,{headers})
                .then((resp)=> console.log(resp))
                .catch((err)=> console.log(err))
            goThreads()
        }
    }
    /////////////////////////////////////////////////////////////////////////////

    useEffect(()=>{
        if (!state.token) {
            goHome()
            alert("you need to login first!")
        }
    },[])

    return (
        <form onSubmit={handleSubmit} className="h-full w-1/2 space-y-2 border-4 border-black rounded-md px-5 py-5 bg-orange">
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
            <textarea
                    id="body"
                    onChange={handleChange}
                    value={formData.body}
                    required
                    className="block w-1/2 h-9 mx-auto appearance-none rounded-md border border-gray-300 
                            px-3 py-2 text-black placeholder:text-black focus:z-10 focus:border-black
                            focus:outline-none focus:ring-white sm:text-sm bg-slate-200 resize-none overflow-hidden"
                />
            </h2>
            <button className='my-2 py-2 font-medium border-2 border-black rounded-md bg-red-600 text-black
                    hover:bg-red-400  w-64'>Add post</button>
            <div className="my-2 w-full">
                <Link to="/threads" className='my-auto px-1 py-2 font-medium  text-3xl underline'>Back to Threads</Link>
            </div>
        </form>
    )
}

export default NewPost