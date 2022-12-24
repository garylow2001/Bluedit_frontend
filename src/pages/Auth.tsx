import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import './Auth.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useAppState } from "../AppState";

const API_URL = "http://localhost:3000/login"

export let token = '';
const Auth = (props: any) => {
    // const type = props.match.params.form;
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

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(actions.login);
        // await axios.post(API_URL,{"username":User,"password":Pwd}).then(
        //     (resp) => {
        //         if (resp.data.token) {
        //             console.log(resp.data)
        //             token = (resp.data.token)
        //             setSuccess(true);
        //         } else {
        //             console.log("login failed")
        //             alert("Login failed")
        //             setUser('')
        //         }
        //     }
        // ).catch(
        //     (error) => console.log(error)
        // )
        // console.log(token)
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