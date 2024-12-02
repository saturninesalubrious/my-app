"use client";

import Link from "next/link";
import React, { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from 'react-hot-toast';

type SignUser = {
 username: string,
 email: string,
 password: string
}

export default function SignupPage(){
const router = useRouter();


 const [user, setUser] = useState<SignUser>({
  username: "",
  email: "",
  password: ""
 })

 const [buttonDisabled, setButtonDisabled] = useState(false);

 const [loading, setLoading] = useState<boolean>(false);


 const onSignup = async () => {
  try{
   setLoading(true);
   const response =  await axios.post("/singup", {user});
   console.log("Sign up success", response.data);
   router.push("/login");

  } catch (error) {
   if (error instanceof AxiosError) {
    // Handle Axios errors
    console.error('Axios error:', error.response?.data);
} else {
    // Handle other errors
    console.error('Unknown error:', error);
}

  } finally {
   setLoading(false)

  }

 }

 useEffect(()=> {
  if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
   setButtonDisabled(false);
  } else {
   setButtonDisabled(true);
  }

 }, [user])

return (<div className="flex flex-col items-center justify-center min-h-screen py-2">
 <h1>{loading ? "Processig" : "Signup"}</h1>
 <hr />
 <label htmlFor="username">Username</label>
 <input 
 className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
 id="username"
 type="text"
 value={user.username}
 onChange={(e) => {
  setUser({...user, username: e.target.value})
 }}
 placeholder="username"
 />

<input 
 className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
 id="email"
 type="text"
 value={user.email}
 onChange={(e) => {
  setUser({...user, email: e.target.value})
 }}
 placeholder="email"
 />

<input 
 className="text-black p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
 id="password"
 type="text"
 value={user.password}
 onChange={(e) => {
  setUser({...user, password: e.target.value})
 }}
 placeholder="password"
 />
 <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
 <Link href="/login">Visit login</Link>
</div>)
}