import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import React from 'react'
import {login,register,getMe,logout} from "../services/auth.api"

export const useAuth = () => {
    const context=useContext(AuthContext);
    const {loading,setloading,user,setuser}=context;
    const handleLogin=async ({email,password})=>
    {
        setloading(true);
        const data=await login({email,password});
        setuser(data.shriji);
        setloading(false);
    }
    const handleRegister=async ({username,email,password})=>
    {
        setloading(true);
        const data=await register({username,email,password});
        setuser(data.shriji);
        setloading(false);
    }
    const handleGetMe=async ()=>
    {
        setloading(true);
        const data=await getMe();
        setuser(data.shriji);
        setloading(false);
    }
    const handleLogout=async ()=>
    {
        setloading(true);
        const data=await logout();
        setuser(null);
        setloading(false);
    }
    useEffect(()=>
    {
        handleGetMe()
    },[])
  return{
    user,loading,handleGetMe,handleLogin,handleRegister,handleLogout
  }
}


