const { default: mongoose } = require("mongoose");
const mongodb=require("mongoose");

const Fieldschema=new mongoose.Schema(

    {
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
    },
    {timestamps:true},
);
const callSchema=mongoose.model("Note",Fieldschema);
module.exports=callSchema;
