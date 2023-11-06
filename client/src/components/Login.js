import React, { useState } from 'react'
import {useContext} from 'react'
import noteContext from '../contexts/notes/noteContext';
import {useNavigate} from 'react-router-dom';
const Login = () => {

    const navigate=useNavigate();
    const [creds, setcreds] = useState({ email: "", password: "" })
    const {showAlert,getUser}=useContext(noteContext);
    const host = "https://notebook-backend-52l3.onrender.com";
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: creds.email,password: creds.password})
            })

        const json = await response.json();

        if(json.success)
        {
            localStorage.setItem("authtoken",json.authToken)
            getUser(json.authToken);
            showAlert(`In your service.....`,"success");
            navigate('/');
        }
        else{
            showAlert("Invalid Credentials","danger");
        }
        console.log(json);
    }

    const changeHandler=(e)=>{
        setcreds({...creds,[e.target.name]:e.target.value})
    }

    return (
        <div className='container'>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" onChange={changeHandler} id="exampleInputEmail1" aria-describedby="emailHelp" name='email'/>

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" onChange={changeHandler} id="exampleInputPassword1" name='password'/>
                </div>
                <button type="submit" className="btn btn-primary my-3">Login</button>
            </form>
        </div>
    )
}

export default Login