const {userModel}=require("../Models/user")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {Router}=require("express")
const { blackListModel } = require("../Models/logout.mode")
const userRouter=Router()
// console.log(userModel)
userRouter.post("/signup",async(req,res)=>{
    try{
   const{email,password,confirmPassword}=req.body
   console.log(email,password,confirmPassword)
   if(password===confirmPassword){
    bcrypt.hash(password,5,async(err,hashed)=>{
        try{
            if(err){
                res.send("not hashed properly")
            }else{
                console.log(hashed,'is hashed')
                console.log(userModel)
               const user= await userModel.create({email,password:hashed,confirmPassword:hashed})
               console.log(user,"this is after await")
              return res.status(200).json({msg:user})
            }
        }catch(err){
           return res.status(200).json({msg:`please register again`})
        }
        
    })
   }else{
    return res.status(200).json({msg:`please enter same password`})
   }
    }catch(err){
return res.status(400).json({msg:`please register again`})
    }
})
userRouter.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body
        const user=await userModel.findOne({email})
        if(user.email){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    res.status(200).send({msg:`wrong password`})
                }else{
                    const token=jwt.sign({course:"masai"},"masai")
                    return res.status(200).json({msg:"login successful",token})
                }
            })
        }else{
            res.status(400).send({msg:`check your email`})
        }
    }catch(err){

    }
})
userRouter.get("/logout",async(req,res)=>{
    try{
        const token=req.headers.authorization
        if(token){
        const blackListArr=  await blackListModel.create({token})
        return res.status(200).json({blackListArr})
        }else{
            res.status(400).send({msg:"You are not logged in"})
        }

    }catch(err){
        res.status(400).send({err:err.message})
    }

})
module.exports={userRouter}