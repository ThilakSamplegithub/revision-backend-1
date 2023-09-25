const jwt=require("jsonwebtoken")
const { blackListModel } = require("../Models/logout.mode")
const authMiddleware=async(req,res,next)=>{
    try{
        const token=req.headers.authorization
        if(token){
            const onatherToken= await blackListModel.find({token})
            if(onatherToken){
              return  res.status(200).send({msg:"please login again"})
            }
        jwt.verify(token,"masai",(err,decoded)=>{
            if(err){
                return res.status(200).json({msg:"you are not authorized"})
            }else{
                console.log(decoded)
                next()
            }
        })
        }else{
            res.status(400).send({msg:"You are not authorized"})
        }
    }catch(err){
        res.status(400).send({err:err.message})
    }

}
module.exports={authMiddleware}