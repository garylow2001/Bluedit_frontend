import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAppState } from "../AppState";

const SIGN_IN_URL = "http://localhost:3000/login"
const SIGN_UP_URL = "http://localhost:3000/users"


const Auth = () => {
    // const type = props.match.params.form;
    const navigate = useNavigate()
    const goThreads = () => {
        return navigate('/threads')
    }
    const [AuthType,setAuthType] = useState("login")
    const [formData,setFormData] = useState({
        username: "",
        password: ""
    })
    const [Success,setSuccess] = useState(false);

    const actions = (type:string) => {
        if (type === "login") {
            return axios.post(SIGN_IN_URL, {"username":formData.username,"password":formData.password}).then(
                (resp) => {
                    dispatch({type: "login", payload: {
                        token: resp.data.token, 
                        username: resp.data.user.username, 
                        user_id: resp.data.user.id
                    }})
                    goThreads()
                }
            ).catch(
                (err) => {
                    alert("wrong username/password")
                    setFormData({username:"",password:""})
                }
            )
        }
        else if (type === "signup") {
            return axios.post(SIGN_UP_URL, {"username":formData.username,"password":formData.password}).then(
                (resp) => {
                    alert("Welcome to Bluedit "+resp.data.user.username+ " you may login now!")
                    setAuthType("login")
                    setFormData({username:"",password:""})
                }
            ).catch(
                (err) => {
                    alert("wrong username/password")
                    setFormData({username:"",password:""})
                }
            )
        }
        else {
            alert("unidentified action")
        }
    }

    const {dispatch} = useAppState()

    const changeAuthType = () => {
        if (AuthType==="login") {
            setAuthType("signup")
        }
        else {
            setAuthType("login")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        actions(AuthType)
    }
    return (
        <>
        <section>
            <h1> Welcome to BlueDit</h1>
            <h1>{(AuthType==="login")?"Sign In":"Sign Up"}</h1>
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
                <button>{(AuthType==="login")?"Sign In":"Sign Up"}</button>
            </form>
            <button onClick={changeAuthType}>Click Here To {(AuthType==="login")?"Sign Up":"Sign In"}</button>
        </section>
        </>
    )
}

export default Auth