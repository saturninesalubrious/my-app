"use client"

import axios from "axios"
import Link from "next/link";
import React, {useEffect, useState} from "react";

export default function VerifyEamilPage() {
 const [token, setToken] = useState("")
 const [verified,setVerified] = useState(false);
 const [error, setError] = useState(false);

 const verifyUserEmail = async () => {
  try {
   await axios.post('/api/users/verifyemail', {token})
   setVerified(true);


  } catch (error: any) {
   setError(true);
   console.log(error.response.data)
  }
 }

 useEffect(() => {

  const urlToken = window.location.search.split("=")[1]
  setToken(urlToken);


 })

 useEffect(() => {
  if(token.length > 0) {
   verifyUserEmail();
  }
 }, [token])

 return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">

   <h1 className="text-4xl">Verify</h1>
   <h2 className="p-2 bg-orange-500 text-black">
{token ? `${token}` : "no token"}</h2>
<link href="/login">Login</link>

{error && (<div><h1></h1></div>)}
   

  </div>
 )
}