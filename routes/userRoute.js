import express from 'express'
import {signUp , login , deleteUserById,getAllUsers} from "../controllers/userController.js"

const userRoute = express.Router()
userRoute.post('/signUp',signUp)
userRoute.post('/login',login)
userRoute.delete('/delete',deleteUserById)
userRoute.get('/getAllUsers',getAllUsers)


export default userRoute;