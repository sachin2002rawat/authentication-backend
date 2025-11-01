import jwt from 'jsonwebtoken'
const generateToken=(id)=>{
    //token generate
    let token=jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"15d"
    })
    return token
}
export default generateToken;