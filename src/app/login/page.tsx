"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

type LoginUser = {
 email: string,
 password: string
}

export default function LoginPage(){
 const router = useRouter();
 const [user, setUser] = useState<LoginUser>({
  email: "",
  password: ""
 })

 const [buttonDisabled, setButtonDisabled] = React.useState(false);

 const [loading,setLoading] = React.useState(false);


 const onLogin = async () => {
  try {
   setLoading(true);
   const response = await axios.post("/api/users/login", user);
   console.log("Login success", response.data);
   toast.success("Login in success")
   router.push("/profile")
   
  } catch (error: any) {
   console.log("Login failed", error.message);
   toast.error(error.message);
  } finally {
   setLoading(false);
  }
 }

 useEffect(()=> {
  if (user.email.length > 0 && user.password.length > 0){
   setButtonDisabled(false);
  } else {
   setButtonDisabled(true);
  }
 }, [user]);

return (<div className="flex flex-col items-center justify-center min-h-screen py-2">
 <h1>{loading ? "Processing": "Login"}</h1>
 <hr />
 <label htmlFor="username">Username</label>

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
 <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Login" : "Login"}</button>
 <Link href="/signup">Visit Signup page</Link>
</div>)
}