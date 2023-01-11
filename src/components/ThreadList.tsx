import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../AppState';


const capitalizeName = (name:string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
const Posts = (props:any) => {
    const {dispatch} = useAppState()
    return <div className='space-y-4 mb-5 w-full my-5'>
        {props.posts.map((post:any)=> {
            return <div key={post.id} className='box w-1/2 m-auto border-4 border-brown shadow-md
                    shadow-black rounded-lg px-4 py-4 bg-golden-yellow
                    hover:shadow-white hover:shadow-lg hover:scale-105'>
                <h2 className='text-3xl font-medium'>{post.title} </h2>
                <div className='flex justify-between px-5 py-2'>
                    <p className='text-2xl font-medium'>Category: {capitalizeName(post.category)}</p>
                    <p className='text-2xl font-medium'>Created by: {post.username}</p>
                </div>
                <p className='px-4 py-2 font-medium'>{post.body}</p>
                <Link 
                    className='font-medium border-2 rounded-md px-2 pb-2 bg-black
                    hover:bg-grey text-white'
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