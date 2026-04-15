const mongoose=require("mongoose");

const connectDB=async()=>{

    try{
        await mongoose.connect(process.env.Mongo_Url);
console.log("Connect successfully");
}
    catch(error){
        console.error("Connect to mongodb error"+error);
    }
}
module.exports=connectDB;