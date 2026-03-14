import React, { useState } from 'react'
import "../styles/login.scss"
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
const Login = () => {
  const {loading,handleLogin}=useAuth()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate=useNavigate();
  async function handleSubmit(e)
  {
    e.preventDefault();
    await handleLogin({email,password});
    setemail("");
    setpassword("");
    navigate("/");
  }
  if(loading)
  {
    return <>
    <main>
      <h1>Login... by shri ji</h1>
    </main>
    </>
  }
  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <FormGroup label="email" placeholder="Enter your email" value={email} onChange={(e)=>setemail(e.target.value)}/>
          <FormGroup label="password" placeholder="Enter your password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
          {/* humne isko components mein tod diya hai why because wo poora ek div banana and har ek mein lable and input and aisa 2 baar login mein and 3 baar regsietr therefore create the common componnets and usmein kya karo ki aap har baar buss label and placeholder usko dedo baaki toh same hi rahega */}
          <button className='button' type="submit">Login</button>
        </form>
        <p>Not Account by shri ji<Link to={"/register"}> Register</Link></p>
      </div>
    </main>
  )
}

export default Login