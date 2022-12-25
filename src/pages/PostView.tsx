import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppState } from '../AppState';
import axios from 'axios';


const Posts = (props:any) => {
    const {state,dispatch} = useAppState()
    const API_URL = "http://localhost:3000/posts/" + props.post.id // NEEDS TO CHANGE
    const [posts,setposts] = useState([]);
    useEffect(()=> {
        let mounted = true;
        axios.get(API_URL, {
            headers: {
                "authorization": "bearer " + state.token
            }
        }).then(
            (resp) => { if (resp.data) {
                    console.log(resp.data) // comment out once done
                    setposts(resp.data)
                } else {
                    alert("need to login") //maybe use a setSuccess page
                }
            }
        )
        return () => {mounted = false}; 
    }, []);
    
    return (
        <>
        <h1>Threads</h1>
            <Posts posts={posts} />
            <Link to="/">Logout</Link>
        </>
    )
    // return (
    //     <>
    //     <h1>Posts</h1>
    //     <h2>Comment1</h2>
    //     <h2>Comment2</h2>
    //     <Link to="/threads">Back to Threads</Link>
    //     <Link to="/">Logout</Link>
    //     </>
    // )
}
export default Posts;
