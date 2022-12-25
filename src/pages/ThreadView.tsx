import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Posts from '../components/ThreadList';
import { useAppState } from '../AppState';



const API_URL = "http://localhost:3000/posts"

const Threads = () => {
    const {state,dispatch} = useAppState()
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
}
export default Threads;