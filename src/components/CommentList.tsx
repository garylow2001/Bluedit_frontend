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

    return <div>
        {comments.map((comment:any) =>
                <div key={comment.id}>
                    {(SelectedCommentID === comment.id)?
                    <form onSubmit={handleSubmit}>
                        <p> Edit your comment:
                        <input 
                                type="text"
                                id="body"
                                onChange={handleChange}
                                value={formData.body}
                                required
                            />
                    </p>
                    <button>Edit comment</button>
                    <button onClick={()=>setSelectedCommentID(-1)}>Cancel</button>
                </form>
                :
                <div>
                     <p>{comment.body}</p>
                    <p>comment by: {comment.username}</p>
                    {comment.user_id===state.user_id
                        ?<div>
                            <button onClick={() => handleEdit(comment.id,comment.body)}>Edit Comment</button>
                            <button onClick={() => handleDelete(comment.id)}>Delete Comment</button>
                        </div>
                        :""
                        }
                </div>}
                </div>)
            }
        {(isClickedAdd)
            ?<div>
                <form onSubmit={handleSubmit}>
                    <p> Add some spice: 
                        <input 
                                type="text"
                                id="body"
                                onChange={handleChange}
                                value={formData.body}
                                required
                            />
                    </p>
                    <button>Add comment</button>
                    <button onClick={handleAddClick}>Cancel</button>
                </form>
            </div>
            :<button onClick={handleAddClick}>Add comment</button>
        }
    </div>
    }
export default CommentList;