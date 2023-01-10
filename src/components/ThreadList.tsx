import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../AppState';


const capitalizeName = (name:string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
const Posts = (props:any) => {
    const {dispatch} = useAppState()
    return <div className=''>
        {props.posts.map((post:any)=> {
            return <div key={post.id} className='border rounded-md px-4 py-4 w-1/2 center'>
                <h2>{post.title} </h2>
                <p>Category: {capitalizeName(post.category)}   Created by: {post.username}</p>
                <p>{post.body}</p>
                <Link 
                    to={"/post/"+post.id} 
                    onClick={
                        () => dispatch({type:"setpost",payload:{selected_post_id:post.id}})
                        }>
                        Go to post
                </Link>
                </div>
            })
        }
    </div>
}
export default Posts;