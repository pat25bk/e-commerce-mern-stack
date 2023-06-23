import React, { useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import {login} from "../../redux/apiCalls";

function Login() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const {error} = useSelector((state)=>state.root.user);
    const handleLogin = ()=>{
        login(dispatch,{username,password});
    }
    return (
    <div style={{
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
    }}>
        <input style={{
            marginBottom:"10px",
            padding:"10px"
        }} placeholder="Username" onChange={(e)=>setUsername(e.target.value)}></input>
        <input style={{
            marginBottom:"10px",
            padding:"10px"
        }} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}></input>
        <button style={{
            padding:"10px",
            backgroundColor:"teal",
            border:"1px solid gray",
            width:"170px"
        }}onClick={handleLogin}>LOGIN</button>
        {error&&<p>Wrong username or password</p>}
    </div>
    )
 }

export default Login