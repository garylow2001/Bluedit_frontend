import { Link, useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppState } from '../AppState';
import axios from 'axios';
import CommentList from '../components/CommentList';


const PostView = (props:any) => {
    const location = useLocation()
    const {post_id} = location.state
    const {state,dispatch} = useAppState()
    const API_URL = "http://localhost:3000/posts/" + post_id // NEEDS TO CHANGE to post_id
    const [post,setpost] = useState([]);
    useEffect(()=> {
        let mounted = true;
        dispatch({type:"setpost", payload:{selected_post_id: post_id}})
        axios.get(API_URL, {
            headers: {
                "authorization": "bearer " + state.token
            }
        }).then(
            (resp) => { if (resp.data) {
                    console.log(resp.data) // comment out once done
                    setpost(resp.data)
                } else {
                    alert("need to login") //maybe use a setSuccess page
                }
            }
        )
        return () => {mounted = false}; 
    }, []);
    
    return (
        <>
        <h1>Post {post_id}</h1>
            <CommentList post={post} />
            <Link to="/">Logout</Link>
        </>
    )
}
export default PostView;
