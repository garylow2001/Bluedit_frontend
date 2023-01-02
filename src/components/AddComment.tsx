import React, { useState } from 'react';
import axios from 'axios';
import { useAppState } from '../AppState';
const Add_Comment = () => {
    const {state} = useAppState()
    const headers = {"authorization": "bearer " + state.token}
    const API_URL = state.url + "/post/" + state.selected_post_id
    const [formData,setFormData] = useState({
        body: "",
        post_id: state.selected_post_id,
        user_id: state.user_id
    });
    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }
    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axios.post(API_URL, formData,{headers})
            .then((resp)=> console.log(resp))
            .catch((err)=> console.log(err))
        //refresh post page?
    }
    return <form onSubmit={handleSubmit}>
        <p>
            <input 
                    type="text"
                    id="body"
                    onChange={handleChange}
                    value={formData.body}
                    required
                />
        </p>
    </form>
}
export default Add_Comment;