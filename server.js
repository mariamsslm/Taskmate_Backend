import connect from "./config/config.js";
import express from 'express'
import dotenv from 'dotenv'
import taskRoute from "./routes/taskRoute.js";
import userRoute from "./routes/userRoute.js";
import categorieRoute from "./routes/categorieRoute.js";
import cookieParser from "cookie-parser";

const app = express()
dotenv.config()



const PORT = process.env.PORT || 3000;




app.use(express.json());
app.use(cookieParser());

app.use('/task',taskRoute)
app.use('/user',userRoute)
app.use('/api',categorieRoute)



app.listen(PORT,()=>{
   connect();
   console.log(`running on port : ${PORT}`)
   if(PORT === 5100){
      console.log("ERROR")
   }
})





