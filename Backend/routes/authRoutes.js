import express from 'express'
import { getUserData, login, logout, signUp } from '../controller/authController.js'
import { upload } from '../Middleware/multer.js'
import { checkAuth } from '../Middleware/checkAuth.js'
//take router only in expresss
const authRouter=express.Router()
//signup route
authRouter.post("/signup",upload.single("profileImage"),signUp)
//login route
authRouter.post("/login",login)
//logout route
authRouter.post("/logout",logout)
//here check auth middleware check  user is authenticated or not then sen user data if user is authenticated
//getuserdata Route
authRouter.get('/getuserdata',checkAuth,getUserData)
export default authRouter

