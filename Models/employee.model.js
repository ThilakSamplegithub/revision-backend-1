const mongoose=require("mongoose")
const employeeSchema=mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    department:{type:String,required:true},
    salary:{type:Number,required:true},
    email:{type:String,required:true}
},{versionKey:false})
  const employeeModel=mongoose.model("employeeCollection",employeeSchema)
  module.exports={employeeModel}
