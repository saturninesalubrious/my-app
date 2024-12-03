"use client"
import { AxiosError } from "axios"
import axios from "axios"
import Link from "next/link"
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
 const router = useRouter();

 const [data, setData] = useState("nothing")

 const logout = async () => {
  try{
    await axios.get("/api/uses/logout")
    toast.success("Logout successful")
    router.push("/login")
    

  }catch(error) {
   if (error instanceof AxiosError) {
    // Handle Axios errors
    console.error('Axios error:', error.response?.data);
} else {
    // Handle other errors
    console.error('Unknown error:', error);
}
  }

 }

 const getUserDetails = async () => {
  const res = await axios.get('/api/users/me')
  console.log(res.data);
  setData(res.data.data._id)
 }
 return(<div className="flex flex-col items-center justify-center min-h-screen py-2">
  <h1>Profile</h1>
  <hr />
  <p>Profile page</p>
  <h2 className="padding-3 rounded bg-green-500"> {data === "nothing" ? "Nothing found" : <Link href={`/profile/${data}`}>
  </Link>}</h2>
  <hr />
  <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
  <button onClick={getUserDetails} className="bg-green-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{data}</button>
 </div>)
}