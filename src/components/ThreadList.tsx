import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../AppState';


const capitalizeName = (name:string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
const Posts = (props:any) => {
    const {dispatch} = useAppState()
    return <div className='space-y-4 mb-4 w-full'>
        {props.posts.map((post:any)=> {
            return <div key={post.id} className='box w-1/2 m-auto border-4 shadow-md shadow-black rounded-lg px-4 py-4 bg-teal-500'>
                <h2 className=''>{post.title} </h2>
                <p>Category: {capitalizeName(post.category)}   Created by: {post.username}</p>
                <p className=''>{post.body}</p>
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