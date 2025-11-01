import uploadOnCloudinary from "../config/cloudinary.js";
import generateToken from "../config/token.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
export const signUp=async(req,res)=>{
    try {
        //input details take from req.body
        const {firstName,lastName,email,password,userName}=req.body;
       

//if all thing not send in req.body
  if(!firstName || !lastName || !email || !password || !userName){
    return res.status(400).json({message:"send all details"})
  }
//variable profile image
  let profileImage;
  //multer file acess
  console.log(req.file);
//send file path to cloudinary and give url and store to profile image then url store in database 
if(req.file){
 profileImage=await uploadOnCloudinary(req.file.path)
}

// checked  user input is already exist or not using email or username
let existUser=await User.findOne({email})
if(existUser){
    return res.status(400).json({message:"User already exist"});
}

//password hashed
const hashedPassword=await bcrypt.hash(password,10)

//create user
const user=await User.create({
    firstName,
    lastName,
    email,
    password:hashedPassword,
    userName,
    profileImage
})

//token generate when signup and parsed to cookie

let token;
try {
  token = generateToken(user._id)
} catch (error) {
    console.log(error)
}


//parse token in cookie
res.cookie("token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENVIRONMENT =="production",
    sameSite:'strict',
    maxAge:14*24*60*60*1000
})





  return res.status(201).json({user:{
firstName,
 lastName,
 email,
 userName,
 profileImage
  }})
    } 
    catch (error) {
return res.status(500).json({message:"internal server error"})
    }
}


//LOGIN FUNCTION
export const login=async(req,res)=>{

try {
  //take email password to verify
  const {email,password}=req.body;
  //check email exist 
  let existUser=await User.findOne({email})
  if(!existUser){
   return res.status(400).json({message:"user does not exist"})
  }

//compare password
let match=await bcrypt.compare(password,existUser.password)
//if password not match
if(!match){
  return res.status(400).json({message:"password incorrect"})
}

//token generate when signup and parsed to cookie

let token;
try {
  token = generateToken(existUser._id)
} catch (error) {
    console.log(error)
}


//parse token in cookie
res.cookie("token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENVIRONMENT=="production",
    sameSite:'strict',
    maxAge:14*24*60*60*1000
})

return res.status(200).json({user:{
firstName:existUser.firstName,
 lastName:existUser.lastName,
 email:existUser.email,
 userName:existUser.userName,
 profileImage:existUser.profileImage
}})

} catch (error) {
 return res.status(500).json({message:"internal server error"})
}

}

//logout making

export const  logout=async(req,res)=>{
  try {
    res.clearCookie("token")
 return  res.status(200).json({message:"logout sucessfully"})
  } catch (error) {
    return res.status(500).json(error)
  }
}


//get user controller

export const getUserData=async(req,res)=>{
try {
  //store userId in userid variable
  let userId=req.userId;
  if(!userId){
   return res.status(400).json({message:"user is is not found"})
  }
  //find user id in database
 let user=await User.findById(userId)
 //if user Id not found in database
 if(!user){
  return res.status(400).json({message:"user not found"})
 }
  return res.status(200).json(user)
} 
catch (error) {
  return res.status(500).json({message:error})
}

}