import { Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppState } from '../AppState';
import axios from 'axios';
import CommentList from '../components/CommentList';
import DropDown from '../components/DropDown';
import { Navbar } from '../components/Navbar';


const PostView = () => {
    const {state,dispatch} = useAppState()
    const navigate = useNavigate()
    const goThreads = () => {
        return navigate('/threads')
    }
    const API_URL = "http://localhost:3000/posts/" + state.selected_post_id
    const headers = {"authorization": "bearer " + state.token}

    const [post,setpost] = useState({
        username: null,
        title:null,
        category:null,
        body:null,
        user_id:null
    });
    
    const [EditPost,setEditPost] = useState(false)
    let EmptyFormData = {
        title: '',
        category: '', 
        body: ''
    }
    const [initialFormData,setInitialFormData] = useState(EmptyFormData) // used to reset text field to original without another axios resp
    const [formData,setFormData] = useState(EmptyFormData)

    const capitalizeName = (name:string) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    

    const getPost = async () => await axios.get(API_URL, {
        headers: {
            "authorization": "bearer " + state.token
        }
    }).then(
        (resp) => { if (resp.data) {
                setpost(resp.data)
                setFormData({
                    title:resp.data.title,
                    category:resp.data.category,
                    body:resp.data.body
                })
                setInitialFormData({
                    title:resp.data.title,
                    category:resp.data.category,
                    body:resp.data.body
                })
            }
        }
    ).catch(
        (err) => {
            if (err.response.data.message === "Please log in") {
                console.log( "redirect to log in") //make a redirect to login page
            }
            else {
                console.log(err)
        }
    })
    //////////////////////////////// Handle Post //////////////////////////////////
    const handleEdit = () => {
        setEditPost(true)
    }
    const handleCancel = () => {
        setFormData(initialFormData)
        setEditPost(false)
    }
    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }
    const chooseCategory = (cat:string) => {
        setFormData({...formData,["category"]: cat})
    }
    const handleDelete = () => {
        axios.delete(API_URL,{headers}
            ).then(
                (resp) => console.log(resp)
            ).catch(
                (err) => console.log(err)
            )
        goThreads()
    }
    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axios.put(API_URL, {
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
        getPost()
    }
    //////////////////////////////////////////////////////////////////////////

    useEffect(()=> {
        // let mounted = true;
        // dispatch({type:"setpost", payload:{selected_post_id: post_id}})
        console.log(state)
        getPost()
    }, []);
    
    return (
        <div className='space-y-4 mb-5 w-full my-5'> 
        <Navbar page="post"/>
        {/* <h1>Post {state.selected_post_id}</h1> */}
        {EditPost
            ?<form onSubmit={handleSubmit} className="w-1/2 h-full m-auto border-2 rounded-md px-5 py-5 bg-golden-yellow">
                <h2 className='px-4 py-2 font-coolvetica'>Title: <input 
                    type="text"
                    id="title"
                    onChange={handleChange}
                    value={formData.title}
                    required
                    className="relative block w-1/2 m-auto appearance-none rounded-md border border-gray-300 
                    px-3 py-2 text-black placeholder:text-black focus:z-10 focus:border-indigo-500 
                    focus:outline-none focus:ring-white sm:text-sm bg-slate-200"
                /></h2>
                <p className='px-4 py-2 font-coolvetica relative'>Category: <DropDown placeHolder={capitalizeName(formData.category)} chooseCategory={chooseCategory}/>
                {/* <input 
                    type="text" //change to dropdown
                    id="category"
                    onChange={handleChange}
                    value={formData.category}
                    required
                />  */}
                </p>
                <p className='px-4 py-2 font-coolvetica'>Body: <input 
                    type="text"
                    id="body"
                    onChange={handleChange}
                    value={formData.body}
                    required
                    className="relative block w-1/2 m-auto appearance-none rounded-md border border-gray-300 
                    px-3 py-2 text-black placeholder:text-black focus:z-10 focus:border-indigo-500 
                    focus:outline-none focus:ring-white sm:text-sm bg-slate-200"
                /></p>
                <div className='justify-center'>
                    <button className='my-auto mx-5 px-1 py-2 font-coolvetica  text-2xl underline'>Change</button>
                    <button onClick={handleCancel} className='my-auto mx-5 px-1 py-2 font-coolvetica  text-2xl underline'>Cancel</button>
                </div>
            </form>
            :<div className=''>
                <div className='box w-1/2 my-5 mx-auto border-4 border-brown shadow-md shadow-black rounded-lg px-4 py-4 bg-golden-yellow'>
                    <h2 className='font-coolvetica text-3xl'>{post.title} </h2>
                    <div className='flex justify-between px-5 py-2'>
                        <p className='text-2xl font-coolvetica'> Category: {post.category? capitalizeName(post.category): post.category}</p>
                        <p className='text-2xl font-coolvetica'> Created by: {post.username}</p>
                    </div>
                    <p className='px-4 py-2 font-coolvetica'>{post.body}</p>
                    {state.user_id === post.user_id
                        ? <>
                        <button onClick={handleEdit} className='my-auto mx-4 px-1 py-2 font-coolvetica  text-2xl underline'>Edit Post</button>
                        <button onClick={handleDelete} className='my-auto mx-4 px-1 py-2 font-coolvetica  text-2xl underline'>Delete Post</button>
                        </>
                        : ""}
                </div>
                <div>
                    <CommentList />
                </div>
            </div>}
            <div className='py-5'>
                <Link to="/threads" className='my-auto px-1 py-2 font-coolvetica  text-3xl underline'>Back to threads</Link>
            </div>
            <Link to="/" className='px-1 py-2 font-coolvetica border-2 rounded-md bg-darkgrey text-white
                    hover:bg-grey hover:shadow-lg hover:shadow-white'>Logout</Link>
            </div>
    )
}
export default PostView;
