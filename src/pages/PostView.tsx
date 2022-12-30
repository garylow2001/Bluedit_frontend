import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppState } from '../AppState';
import axios from 'axios';
import CommentList from '../components/CommentList';
// import CommentList from '../components/CommentList';


const PostView = () => {
    const location = useLocation()
    const {post_id} = location.state
    const {state,dispatch} = useAppState()
    const navigate = useNavigate()
    const goThreads = () => {
        return navigate('/threads')
    }
    const API_URL = "http://localhost:3000/posts/" + post_id
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
    }
)

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

    useEffect(()=> {
        // let mounted = true;
        dispatch({type:"setpost", payload:{selected_post_id: post_id}})
        getPost()
    }, []);
    
    return (
        <div> 
        <h1>Post {post_id}</h1>
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
                <CommentList post_id={post_id}/>
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
