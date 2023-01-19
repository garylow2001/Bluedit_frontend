import React, { useEffect, useState } from 'react';
import { useAppState } from '../AppState';
import axios from 'axios';

const CommentList= () => {
    const {state, dispatch} = useAppState()
    const headers = {"authorization": "bearer " + state.token}
    const API_URL = state.url + "/posts/"+ state.selected_post_id +"/comments"
    const [comments,setComments] = useState([])
    const [SelectedCommentID, setSelectedCommentID] = useState(-1)
    const [CommentAction,setCommentAction] = useState("")
    const [isClickedAdd,setIsClickedAdd] = useState(false)
    const [formData,setFormData] = useState({
        body: "",
        post_id: state.selected_post_id,
        user_id: state.user_id
    });
    const getComments = async () => {
        await axios.get(API_URL,{headers})
        .then((resp)=> {
            setComments(resp.data)
            console.log(resp.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(()=> {
        let mounted = true;
        getComments()
    }, []);
    
    ////////////////////////// HANDLE COMMENT //////////////////////////////////
    const handleAddClick = async () => {
        if (isClickedAdd) {
            setFormData({...formData, ["body"]:""})
            setIsClickedAdd(false)
        }
        else {
            setIsClickedAdd(true)
            setSelectedCommentID(-1)
            setFormData({...formData, ["body"]:""})
            setCommentAction("AddComment")
            console.log(CommentAction)
        }
    }

    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleEdit = async (id:number,body:string) => {
        setCommentAction("EditComment")
        console.log(CommentAction)
        dispatch({type:"setcomment",payload:{selected_comment_id:id}})
        setIsClickedAdd(false)
        setSelectedCommentID(id)
        setFormData({...formData, ["body"]:body})
    }

    const Actions = (type:string) => {
        if (type === "AddComment") {
            return axios.post(API_URL, formData,{headers})
            .then((resp)=> {
                console.log(resp)
                setIsClickedAdd(false)
            })
            .catch((err)=> console.log(err))
        }
        if (type === "EditComment") {
            const PUT_API_URL = API_URL + "/" + SelectedCommentID 
            return axios.put(PUT_API_URL, formData, {headers})
            .then((resp) => {
                console.log(resp)
                setSelectedCommentID(-1)
            })
            .catch((err) => console.log(err))
        }
    }

    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        await Actions(CommentAction)
        setFormData({...formData, ["body"]:""})
        getComments()
    }
    
    const handleDelete = (id:number) => {
        dispatch({type:"setcomment",payload:{selected_comment_id:id}}) //not needed
        const DELETE_API_URL = API_URL + "/" + id
        axios.delete(DELETE_API_URL,{headers})
        .then((resp) => {
            console.log(resp)
            getComments()
        })
        .catch((err) => console.log(err))
    }
    /////////////////////////////////////////////////////////////////////////////////

    return <div className='space-y-5'>
        {(isClickedAdd)
            ?<div className='box w-1/2 my-5 mx-auto border-4
            border-black shadow-md shadow-black rounded-lg px-4 py-4 bg-orange'>
                <form onSubmit={handleSubmit}>
                    <p className='font-coolvetica text-2xl'> Add some spice: 
                        <input 
                                type="text"
                                id="body"
                                onChange={handleChange}
                                value={formData.body}
                                required
                                className="block w-1/2 m-auto appearance-none rounded-md border border-gray-300 
                            px-3 py-2 text-black placeholder:text-black focus:z-10 focus:border-black
                            focus:outline-none focus:ring-white sm:text-sm bg-slate-200"
                            />
                    </p>
                    <div className='relative space-x-5 justify-center'>
                        <button className='underline font-coolvetica text-xl'>Add comment</button>
                        <button onClick={handleAddClick} className='underline font-coolvetica text-xl'>Cancel</button>
                    </div>
                </form>
            </div>
            :<button onClick={handleAddClick} className='my-auto px-1 py-2 font-coolvetica border-2 border-black rounded-md bg-red-600 text-black
            hover:bg-red-400'>Add comment</button>
        }
        {comments
        .sort((a:any,b:any) => (a.id > b.id) ? 1 : -1)
        .map((comment:any) =>
                <div key={comment.id} className='box w-1/2 my-5 mx-auto border-4
                border-black shadow-md shadow-black rounded-lg px-4 py-4 bg-orange'>
                    {(SelectedCommentID === comment.id)?
                    <form onSubmit={handleSubmit}>
                        <p className='font-coolvetica text-2xl'>  Edit your comment:</p>
                        <input 
                                type="text"
                                id="body"
                                onChange={handleChange}
                                value={formData.body}
                                required
                                className="block w-1/2 m-auto appearance-none rounded-md border border-gray-300 
                                px-3 py-2 text-black placeholder:text-black focus:z-10 focus:border-black
                                focus:outline-none focus:ring-white sm:text-sm bg-slate-200"
                            />
                    <div className='relative space-x-5 justify-center'>
                        <button className='underline font-coolvetica text-xl'>Edit comment</button>
                        <button onClick={()=>setSelectedCommentID(-1)} className='underline font-coolvetica text-xl'>Cancel</button>
                    </div>
                </form>
                :
                <div>
                    <p className='font-coolvetica text-2xl'>{comment.body}</p>
                    <p className='font-coolvetica text-xl'>comment by: {comment.username}</p>
                    {comment.user_id===state.user_id
                        ?<div className=' flex space-x-5 justify-center'>
                            <button className='mx-4 underline font-coolvetica text-xl' onClick={() => handleEdit(comment.id,comment.body)}>Edit Comment</button>
                            <button className='mx-4 underline font-coolvetica text-xl' onClick={() => handleDelete(comment.id)}>Delete Comment</button>
                        </div>
                        :""
                        }
                </div>}
                </div>)
            }
    </div>
    }
export default CommentList;