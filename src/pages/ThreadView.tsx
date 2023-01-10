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
        <div>
            <Navbar handleChangeCategory={handleChangeCategory}/>
            <div className='ThreadList'>
                <h1>Let's see whats cooking today!</h1>
                <Link to= "/post/new">Click here to start a new thread!</Link>
                <Posts posts={posts} />
                <Link to="/">Logout</Link>
            </div>
        </div>
    )
}
export default Threads;