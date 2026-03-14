import React, { useState } from 'react'
import "../styles/login.scss"
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
const Register = () => {
  const {user,loading,handleRegister}=useAuth()
  const [username, setusername] = useState("")
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("")
  const navigate=useNavigate()
  const handleSubmit=async (e)=>
  {
    e.preventDefault();
    await handleRegister({username,email,password});
    setemail("");
    setpassword("");
    setusername("");
    navigate("/")
  }
  if(loading)
  {
    return <>
    <main>
      <h1>Register... by shri ji</h1>
    </main>
    </>
  }
  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <FormGroup 
            label="username" 
            placeholder="Enter your username"
            value={username}
            onChange={(e)=>setusername(e.target.value)}
          />

          <FormGroup 
            label="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
          />

          <FormGroup 
            label="password" 
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
          />

          <button className="button" type="submit">
            Register
          </button>

        </form>
        <p>Already Have a Account by shri ji <Link to={"/login"}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register