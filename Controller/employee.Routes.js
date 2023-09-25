const {employeeModel}=require("../Models/employee.model")
const {Router}=require("express")
const employeeRouter=Router()
employeeRouter.post("/add",async(req,res)=>{
try{
const{firstName,lastName,department,email,salary}=req.body
 const emp=await employeeModel.create({firstName,lastName,department,email,salary})
 return res.status(200).json({employee:emp})
}catch(err){
    res.status(400).send({msg:err.message})
}
})
employeeRouter.get("/",async(req,res)=>{
try{
const allEmp=await employeeModel.find()
return res.status(201).json({data:allEmp})
}catch(err){
    res.status(200).send({msg:err.message})
}
})
employeeRouter.patch("/update/:id",async(req,res)=>{
try{
const {id}=req.params
console.log(id)
 const employee=await employeeModel.findOne({_id:id})
 if(employee){
    console.log(employee)
    const updatedData=await employeeModel.updateOne({_id:id},{$set:req.body})
   return res.status(200).json({msg:`updated successfully`,updatedData})
 }else{
    res.status(200).send({msg:"no such employee exists"})
 }
}catch(err){
    res.status(400).send({msg:err.message})
}
})
employeeRouter.delete("/delete/:id",async(req,res)=>{
try{
const {id}=req.params
console.log(id)
const employee=await employeeModel.findOne({_id:id})
if(employee){
   const deletedEmp=await employeeModel.deleteOne({_id:id})
   return res.status(200).json({msg:"deleted successfully",deletedEmp})
}else{
    res.status(200).send({msg:"no such employee exists"})
}
}catch(err){
    res.status(400).send({msg:err.message})
}
})
//lets filter
employeeRouter.get("/departments",async(req,res)=>{
try{
let {department}=req.query
console.log(department)
const query={}
if(department){
query.department=department
}
   const filteredData=await employeeModel.find(query)
   console.log(filteredData)
   return res.status(200).json({data:filteredData})
}catch(err){
    res.status(400).send({msg:err.message})
}
})
//searching by firstName
employeeRouter.get("/firstName",async(req,res)=>{
    try{
    let {firstName}=req.query
    console.log(firstName)
    const query={}
    if(firstName){
    query.firstName=firstName
    }
       const filteredData=await employeeModel.find(query)
       console.log(filteredData)
       return res.status(200).json({data:filteredData})
    }catch(err){
        res.status(400).send({msg:err.message})
    }
    })
    //sorting based on price
    employeeRouter.get("/sorting",async(req,res)=>{
        const {order,sort}=req.query
        console.log(sort)
        try{
           const employees= await employeeModel.find().sort({salary:order==="asc"?1:-1})
            return res.status(200).json({employees})
        }catch(err){
            res.status(400).send({msg:err.message})
        }
    })

module.exports={employeeRouter}