import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import './Auth.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useAppState } from "../AppState";

const API_URL = "http://localhost:3000/login"


const Auth = (props: any) => {
    // const type = props.match.params.form;
    const [userData,setUserData] = useState<any>()
    const [formData,setFormData] = useState({
        username: "",
        password: ""
    })
    const [Success,setSuccess] = useState(false);

    const actions = {
        signup: {
            type: "sign up",
            payload: formData
        },
        login: {
            type: "login",
            payload: formData
        }
    }

    const {dispatch} = useAppState()

    useEffect( () => {
        if (userData) {
            if (userData.user){
                const {user,token} = userData
                dispatch({type: "login", payload: {token, username: user.username}})
                setSuccess(true)
            }
            else {
                alert("Wrong username/password")
                setFormData({username:"",password:""})
            }
        }
    },[userData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(API_URL, {"username":formData.username,"password":formData.password}).then(
            (resp) => setUserData(resp.data)
        )
    }
    return (
        <>
            {Success? (
                <section>
                    <h1> Hello, {formData.username}!</h1>
                    <h1> You are logged in!</h1>
                    <br/>
                    <p>
                        <Link to="/threads">Proceed to threads</Link>
                    </p>
                    <p>
                        <a href=".">Logout</a>
                    </p>
                </section>)
        :(
        <section>
            <h1> Welcome to BlueDit</h1>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="Username">
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    id = "username"
                    autoComplete = "off"
                    onChange= {handleChange}
                    value = {formData.username}
                    required
                />
                </div>
                <div className="Password">
                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id = "password"
                    onChange={handleChange}
                    value = {formData.password}
                    required
                />
                </div>
                <button>Sign In</button>
            </form>
        </section>)}
        </>
    )
}

export default Auth