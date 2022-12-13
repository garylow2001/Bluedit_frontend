import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
import './Login.css';
import AuthContext from "./context/AuthProvider";
import axios from "./api/axios";
const LOGIN_URL = "/auth";

const Login: React.FC = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [User,setUser] = useState('');
    const [Pwd,setPwd] = useState('');
    const [ErrMSG,setErrMSG] = useState('');
    const [Success,setSuccess] = useState(false);

    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({User,Pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({User,Pwd,roles,accessToken})
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
        }        
    }

    useEffect(() => {
        if (userRef.current !=null) {
            userRef.current.focus();
        }
    }, [])
    useEffect(() => {
        setErrMSG('');
    }, [User,Pwd])
    return (
        <>
            {Success? (
                <section>
                    <h1> You are logged in!</h1>
                    <br/>
                    <p>
                        <a href=".">Logout</a>
                    </p>
                </section>)
        :(
        <section>
            <p ref={errRef} className= {ErrMSG?"errmsg" : "offscreen"}
            aria-live="assertive">{ErrMSG}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div className="Username">
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    id = "username"
                    ref = {userRef}
                    autoComplete = "off"
                    onChange={(e) => setUser(e.target.value)}
                    value = {User}
                    required
                />
                </div>
                <div className="Password">
                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id = "password"
                    onChange={(e) => setPwd(e.target.value)}
                    value = {Pwd}
                    required
                />
                </div>
                <button>Sign In</button>
            </form>
        </section>)}
        </>
    )
}

export default Login