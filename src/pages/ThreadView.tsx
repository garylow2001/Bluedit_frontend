import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Posts from '../components/ThreadList';
import { useAppState } from '../AppState';
import { Navbar } from '../components/Navbar';


const API_URL = "http://localhost:3000/posts"
export interface postInterface {
    id: number,
    title: string,
    body: string,
    category: string
}
interface postsInterface extends Array<postInterface>{}

const Threads = () => {
    const {state} = useAppState()
    const [allPosts,setAllPosts] = useState<postsInterface>([]);
    const [posts,setposts] = useState<postsInterface>([]);
    const handleChangeCategory = (cat:string) => {
        if (cat === "all") {
            setposts(allPosts)
        }
        else {
            let filtered_posts = allPosts.filter(post=> post.category === cat)
            setposts(filtered_posts)
        }
    }
    useEffect(()=> {
        let mounted = true;
        axios.get(API_URL, {
            headers: {
                "authorization": "bearer " + state.token
            }
        }).then(
            (resp) => { 
                if (resp.data) {
                    console.log(resp.data) // comment out once done
                    setposts(resp.data)
                    setAllPosts(resp.data)
                }
            }
        ).catch(
            (err) => {
                if (err.response.data.message === "Please log in") {
                    console.log( "redirect to log in") //make a redirect to login page
                }
                else {
                    console.log(err)
                }
            }
        )
        return () => {mounted = false}; 
    }, []);
    
    return (
        <div className='justify-center w-full align-top min-h-screen max-h-full'>
            <Navbar handleChangeCategory={handleChangeCategory} />
            <div className='height-100% justify-self-center align-top'>
                <h1 className='relative mt-20 align-top font-medium text-4xl px-2 py-2 mb-5'>Let's see whats cooking today!</h1>
                <Link to= "/post/new" 
                    className='my-5 px-1 py-2 font-medium border-2 rounded-md bg-darkgrey text-white
                    hover:bg-grey hover:shadow-lg hover:shadow-white'>Click here to start a new thread!</Link>
                <Posts posts={posts} />
                {/* <Link to="/">Logout</Link> */}
            </div>
        </div>
    )
}
export default Threads;