import React from 'react';
import { useAppState } from '../AppState';
const Posts = (props:any) => {
    const {state} = useAppState()
    
    return <div>
        {props.posts.map((post:any)=> {
            return <div key={post.id}>
                <h2>{post.title} </h2>
                <p>Category: {post.category}   Created by: {post.username}</p>
                <p>{post.body}</p>
                {state.user_id === post.user_id
                    ? <>
                    <button>edit</button>
                    <button>delete</button>
                    </>
                    : ""}
                </div>
            })
        }
    </div>
}
export default Posts;