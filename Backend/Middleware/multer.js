import multer from 'multer'
//multer is basically a middleware
//we use multer because file data from frontend cannot process by express but multer can express
//multer keep image from frontend to disk storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public')
    },
    filename:(req,file,cb)=>{
        console.log(file)
        cb(null,file.originalname)
    }
})
//put storage to multer
export const upload= multer({storage})