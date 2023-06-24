import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [userInfo, setuserInfo] = useState({ id: "", password: "" })

    let navigate = useNavigate()

    const onChange = (e) => {
        setuserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `http://localhost:5000/api/auth/login`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ loginId: userInfo.id, password: userInfo.password })
        });
        const json = await response.json();
        if (!json.success) { props.showAlert("Invalid Id/Password") }
        else {
            localStorage.setItem('token', json.authToken)
            console.log(json.authToken)
            navigate("/home")
            props.showAlert("Logged in Successfully")
        }
    }
    return (
        <div className="container" >
            <form onSubmit={handleSubmit} style={{ marginTop: '8rem' }}>
                <div className="form-group">
                    <label htmlFor="id">Email/UserName</label>
                    <input type="id" className="form-control" id="id" name='id' value={userInfo.id} aria-describedby="emailHelp" placeholder="Enter email/username" onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={userInfo.password} placeholder="Password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Login
