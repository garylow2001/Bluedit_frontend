import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Posts from '../components/ThreadList';

const API_URL = "http://localhost:3000/posts"
function getAPIData() {
    console.log(axios.get(API_URL, {
        headers: {
            Authorization: "bearer "
        }
    }));
    return axios.get(API_URL).then((response)=> response.data);
}
const Threads = () => {
    const [posts,setposts] = useState([]);
    // useEffect(()=> {
    //     let mounted = true;
    //     getAPIData().then((items) => {
    //         if (mounted) {
    //             setposts(items);
    //         }
    //     });
    //     return () => {mounted = false}; 
    // }, []);
    useEffect(()=> {
        getAPIData()
    },[])
    return (
        <>
        <h1>Threads</h1>
            <Posts posts={posts} />
            <Link to="/posts">Go to posts</Link>
            <Link to="/">Logout</Link>
        </>
    )
}
export default Threads;