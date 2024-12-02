import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 username: {
  type: String,
  required: [true, "Please provide a username"],
  unique: true,
 },
 email: {
  type: String,
  required: [true, "Please provide a email"]
 },
 isVerified: {
  type: Boolean,
  default: false,
 },
 isAdmin: {
  type: Boolean,
  default: false
 },
 forgotPasswordToken: String,
 forgotPasswordTokenExpiry: Date,
 verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("User", userSchema)

export default User;