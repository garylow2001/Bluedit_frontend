import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Posts from '../components/ThreadList';

const API_URL = "http://localhost:3000/api/v1/posts"
function getAPIData() {
    console.log(axios.get(API_URL));
    return axios.get(API_URL).then((response)=> response.data);
}
const Threads = () => {
    const [posts,setposts] = useState([]);
    useEffect(()=> {
        let mounted = true;
        getAPIData().then((items) => {
            if (mounted) {
                setposts(items);
            }
        });
        return () => {mounted = false}; 
    }, []);
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