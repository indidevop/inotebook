import { useState } from "react"
import React from 'react'
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react'
import noteContext from '../contexts/notes/noteContext';


const Signup = () => {

    const navigate=useNavigate();
    const [creds, setcreds] = useState({ name: "", email: "", password: "", cpassword: "" })
    const {showAlert}=useContext(noteContext);


    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createUser`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password })
            })

        const json = await response.json();
           
        if(json.success)
        {
            localStorage.setItem("authtoken", json.authToken)
            showAlert("Registration successfull","success");
            navigate('/');
            
        }
        else{
            console.log(json);
            showAlert("Invalid details","danger");
        }
        
       
    }

    const changeHandler = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" onChange={changeHandler} id="name" aria-describedby="emailHelp" name='name' />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" onChange={changeHandler} id="exampleInputEmail1" aria-describedby="emailHelp" name='email' />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" onChange={changeHandler} id="exampleInputPassword1" name='password' />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" onChange={changeHandler} id="cpass" name='cpassword' />
                </div>
                <button type="submit" className="btn btn-primary my-3">SignUp</button>
            </form>
        </div>
    )
}

export default Signup