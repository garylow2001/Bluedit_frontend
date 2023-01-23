import { useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppState } from '../AppState';
import axios from 'axios';
import CommentList from '../components/CommentList';
import DropDown from '../components/DropDown';
import { Navbar } from '../components/Navbar';


const PostView = () => {
    const {state} = useAppState()
    const navigate = useNavigate()
    const goThreads = () => {
        return navigate('/threads')
    }
    const goHome = () => {
        return navigate('/')
    }
    const API_URL = "https://retrohub-backend.herokuapp.com/posts/" + state.selected_post_id
    const headers = {"authorization": "bearer " + state.token}

    const [post,setpost] = useState({
        username: null,
        title:null,
        category:null,
        body:null,
        user_id: -1
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
        (resp) => { 
            if (resp.data) {
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
            if (state.token) {
                console.log(err)
            }
            else {
                goHome() //no token, means not logged in
                alert("you need to login first!")
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
    const handleChange= (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value})
        e.target.style.height = '36px'
        e.target.style.height = `${e.target.scrollHeight}px`
    }
    const chooseCategory = (cat:string) => {
        setFormData({...formData,["category"]: cat})
    }
    const handleDelete = async () => {
        await axios.delete(API_URL,{headers}
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
        console.log(state)
        getPost()
    }, []);
    
    return (
        <div className='justify-center w-full align-top min-h-screen max-h-full'> 
        <Navbar page="post"/>
        {EditPost
            ?<form onSubmit={handleSubmit} className="w-1/2 h-full mt-24 mx-auto border-4 border-black rounded-md px-5 py-5 bg-orange">
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
                <p className='px-4 py-2 font-coolvetica relative'>Category: 
                    <DropDown placeHolder={capitalizeName(formData.category)} chooseCategory={chooseCategory}/>
                </p>
                <p className='px-4 py-2 font-coolvetica'>Body: <textarea
                    id="body"
                    onChange={handleChange}
                    value={formData.body}
                    required
                    className="relative block w-1/2 m-auto appearance-none rounded-md border border-gray-300 
                    px-3 py-2 text-black placeholder:text-black focus:z-10 focus:border-indigo-500 
                    focus:outline-none focus:ring-white sm:text-sm bg-slate-200 resize-none overflow-hidden"
                /></p>
                <div className='justify-center'>
                    <button className='my-auto mx-5 px-1 py-2 font-coolvetica  text-2xl underline'>Change</button>
                    <button onClick={handleCancel} className='my-auto mx-5 px-1 py-2 font-coolvetica  text-2xl underline'>Cancel</button>
                </div>
            </form>
            :<div className='mt-24 justify-self-center align-top mb-5'>
                <div className='box w-1/2 my-5 mx-auto border-4 border-black rounded-lg px-4 py-4 bg-orange'>
                    <h2 className='font-coolvetica text-3xl'>{post.title} </h2>
                    <div className='flex justify-between px-5 py-2'>
                        <p className='text-2xl font-coolvetica'> Category: {post.category? capitalizeName(post.category): post.category}</p>
                        <p className='text-2xl font-coolvetica'> Created by: {post.username}</p>
                    </div>
                    <p className='px-4 py-2 font-coolvetica'>{post.body}</p>
                    {parseInt(state.user_id) === post.user_id
                        ? <>
                        <button onClick={handleEdit} className='my-auto mx-4 px-1 py-2 font-coolvetica  text-2xl underline'>Edit Post</button>
                        <button onClick={handleDelete} className='my-auto mx-4 px-1 py-2 font-coolvetica  text-2xl underline'>Delete Post</button>
                        </>
                        :""}
                </div>
                <div>
                    <CommentList />
                </div>
            </div>}
        </div>
    )
}
export default PostView;
