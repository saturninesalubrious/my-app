import mongoose from "mongoose";

export async function connect(){
 try {
  await mongoose.connect(process.env.MONGO_URI!);
  const connection = mongoose.connection;

  connection.on('connected', () => {
  console.log('MongoD connected success')

  })

  connection.on('error', (err) => {
   console.log('MongoD connection error make sure MongoDB is running' + err)
   process.exit()
 
   })
 } catch (error) {
  console.log('Something goes wrong!');
  console.log(error);
  
 }
}