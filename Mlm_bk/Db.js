const mongoose=require("mongoose");
var db_url="mongodb+srv://kuttypuli802:Muruga%40178@cluster0.9ozng5x.mongodb.net/mlm"
const connectDb=async()=>{
    try{
        await mongoose.connect(db_url);
        console.log("connected db")
    }
    catch(error){
        console.log(error)
        console.log("block")
    }
}
module.exports=connectDb;