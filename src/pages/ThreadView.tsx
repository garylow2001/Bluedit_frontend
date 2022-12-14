import React from 'react';
import { Link } from 'react-router-dom';
const Threads = () => {
    return (
        <>
        <h1>Threads</h1>
            <Link to="/posts">Go to posts</Link>
            <Link to="/">Logout</Link>
        </>
    )
}
export default Threads;