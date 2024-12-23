import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect();

export async function POST(request: NextRequest){
try {
 console.log("I am the issue");
 const reqBody = await request.json()
 const { username, email, password} = reqBody;
 console.log(reqBody);

 //check if user already exists

 const user = await User.findOne({email})
 if (user) {
  return NextResponse.json({error: "User already exists"}, {status: 400})
 }

 //hash password

 const salt = await bcryptjs.genSalt(10)
 const hashedPassword = await bcryptjs.hash(password,salt)

 const newuser = new User({
  username,
  email,
  password: hashedPassword
 })
//saving the user
 const savedUser =  await newuser.save()
 console.log(savedUser);

 //send verification email 

 await sendEmail({email, emailType: "Verify", userId: savedUser._id})

 return NextResponse.json({
  message: "User created successfully",
  success: true,
  savedUser
 })

} catch (error: any) {
 return NextResponse.json({error: error.message}, {status: 500})
}

}