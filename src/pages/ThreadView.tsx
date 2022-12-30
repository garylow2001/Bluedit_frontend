import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Posts from '../components/ThreadList';
import { useAppState } from '../AppState';



const API_URL = "http://localhost:3000/posts"

const Threads = () => {
    const {state} = useAppState()
    const [posts,setposts] = useState([]);
    useEffect(()=> {
        let mounted = true;
        axios.get(API_URL, {
            headers: {
                "authorization": "bearer " + state.token
            }
        }).then(
            (resp) => { 
                if (resp.data) {
                    console.log(resp.data) // comment out once done
                    setposts(resp.data)
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
        return () => {mounted = false}; 
    }, []);
    
    return (
        <>
        <h1>Threads</h1>
            <Link to= "/post/new">Add a new post!</Link>
            <Posts posts={posts} />
            <Link to="/">Logout</Link>
        </>
    )
}
export default Threads;