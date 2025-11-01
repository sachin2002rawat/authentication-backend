import jwt from 'jsonwebtoken'
export const checkAuth=(req,res,next)=>{
  try {
    // step1:-extract token from cookies
    let token=req.cookies.token
    if(!token){
return res.status(401).json({message:"user is not authenticated"})
    }
    //step2:- verify the token
   let decoded=jwt.verify(token,process.env.JWT_SECRET)
   //step:-3 store decoded id  userId containe that user id which is authenticated
     req.userId=decoded.id;
     next()
  } 
  catch (error) {
    return res.status(500).json({message:"internal server error"})
  }
    
}