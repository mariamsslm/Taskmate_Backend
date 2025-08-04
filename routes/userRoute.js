import express from 'express'
import {signUp , login , deleteUserById} from "../controllers/userController.js"

const userRoute = express.Router()
userRoute.post('/signUp',signUp)
userRoute.post('/login',login)
userRoute.delete('/delete',deleteUserById)


export default userRoute;