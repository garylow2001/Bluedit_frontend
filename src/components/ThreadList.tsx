import React from 'react';
import { Link } from 'react-router-dom';
const Posts = (props:any) => {
    return <div>
        {props.posts.map((post:any)=> {
            return <div key={post.id}>
                <h2>{post.title} </h2>
                <p>Category: {post.category}   Created by: {post.username}</p>
                <p>{post.body}</p>
                <Link to={"/post/"+post.id} state= {{post_id: post.id}}>Go to post</Link>
                </div>
            })
        }
    </div>
}
export default Posts;