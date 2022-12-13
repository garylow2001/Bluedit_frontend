import React from "react";
import { useRef, useState, useEffect } from "react";
import { ButtonHTMLAttributes } from "react";
import './Login.css';

const Login: React.FC = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [User,setUser] = useState('');
    const [Pwd,setPwd] = useState('');
    const [ErrMSG,setErrMSG] = useState('');
    const [Success,setSuccess] = useState(false);

    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(User,Pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
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