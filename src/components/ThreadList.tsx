import React from 'react';
import { useAppState } from '../AppState';
import { Link } from 'react-router-dom';
const Posts = (props:any) => {
    const {state, dispatch} = useAppState()
    
    return <div>
        {props.posts.map((post:any)=> {
            return <div key={post.id}>
                <h2>{post.title} </h2>
                <p>Category: {post.category}   Created by: {post.username}</p>
                <p>{post.body}</p>
                {/* {state.user_id === post.user_id
                    ? <>
                    <button>edit</button>
                    <button>delete</button>
                    </>
                    : ""} */}
                <Link to={"/post/"+post.id }>Go to post</Link>
                </div>
            })
        }
    </div>
}
export default Posts;