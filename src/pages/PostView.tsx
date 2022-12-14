import React from 'react';
import { Link } from 'react-router-dom';
const Posts = () => {
    return (
        <>
        <h1>Posts</h1>
        <h2>Comment1</h2>
        <h2>Comment2</h2>
        <Link to="/">Logout</Link>
        </>
    )
}
export default Posts;
