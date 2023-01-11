import { Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppState } from '../AppState';
import axios from 'axios';
import CommentList from '../components/CommentList';


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
        <h1>Post {state.selected_post_id}</h1>
        {EditPost
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
                <div className='box w-1/2 my-5 mx-auto border-4 border-cyan-200 shadow-md shadow-black rounded-lg px-4 py-4 bg-teal-500
                hover:shadow-white hover:shadow-lg'>
                    <h2 className='font-medium text-3xl'>{post.title} </h2>
                    <div className='flex justify-between px-5 py-2'>
                        <p className='text-2xl font-medium'> Category: {post.category}</p>
                        <p className='text-2xl font-medium'> Created by: {post.username}</p>
                    </div>
                    <p className='px-4 py-2 font-medium'>{post.body}</p>
                </div>
                <div>
                    {state.user_id === post.user_id
                        ? <>
                        <button onClick={handleEdit}>Edit Post</button>
                        <button onClick={handleDelete}>Delete Post</button>
                        </>
                        : ""}
                    <CommentList />
                </div>
            </div>}
            <div>
                <Link to="/threads">Back to threads</Link>
            </div>
            <Link to="/">Logout</Link>
            </div>
    )
}
export default PostView;
