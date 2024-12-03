import { NextRequest } from "next/server";

import  jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

import { Types } from 'mongoose';

import type { TokenPayload } from "@/app/api/users/login/route";




export const getDataFromToken = (request: NextRequest) => {
 try {
  const token = request.cookies.get("token")?.value || '';
  const decodedToken: string | TokenPayload | JwtPayload = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  
  if (decodedToken){
   if (typeof decodedToken === 'string') {
    // Handle invalid or expired token
    console.error('Invalid or expired token');
  } if (typeof decodedToken === 'object' && decodedToken !== null) {
   //print the token
   const decodedTokenPayload = decodedToken as TokenPayload;
   return decodedTokenPayload.id
  }

 }
 } catch (error: any){

  throw new Error(error.message);
 }}