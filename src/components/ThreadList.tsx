import React from 'react';
const Posts = (props:any) => {
    return <div>
        <h1>Testing</h1>
        {props.posts.map((post:any)=> {
            return <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                </div>
        })
        }
    </div>
}
export default Posts;