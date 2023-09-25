const mongoose=require("mongoose")
const blackSchema= mongoose.Schema({
    token:{type:String,required:true}
 })
   const blackListModel=mongoose.model("blackList",blackSchema)
module.exports={blackListModel}