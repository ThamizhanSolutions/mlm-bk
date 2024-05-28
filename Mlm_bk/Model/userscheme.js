const mongoose=require("mongoose")

const RegistrationSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
         unique:true
     },
     email:{
        type:String,
        required:true,
         unique:true
     },
     contact:{
        type:Number,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required:true
    }

})
const Registration=mongoose.model("registerdata", RegistrationSchema);
module.exports=Registration