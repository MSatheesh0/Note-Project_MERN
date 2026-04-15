const express= require("express");
const Note=require("../model/Note")

const  getAllNotes=async(req,res)=>{
    try{
        const notes=await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);
    }
    catch(error){
        console.log("Error in the getAllnotes "+error);
        res.status(500).send("Internet Error");
    }
}


const CreateNotes=async(req,res)=>{
    try{
        const {title,content}=req.body;
        const newNote=new Note({title,content});
        await newNote.save()
        res.status(201).json({message:"Created successfully"});
    }
    catch(error){
         console.log("Error in the getAllnotes "+error);
        res.status(500).send("Internet Error");
    }
} 

const GetnoteBytId=async(req,res)=>{
    try{
        const note=await Note.findById(req.params.id)
        if(!note){
            res.status(409).json({message:"User will not match"});
        }
        res.json(note);
    }
      catch(error){
         console.log("Error in the getAllnotes "+error);
        res.status(500).send("Internet Error");
    }
}

const UpdatedNotes=async(req,res)=>{
    try{
        const {title ,content}=req.body;
    const updatednote=  await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});
    if(!updatednote)
        return res.status(404).json({message:"note not found"});
    
        res.status(200).json({message:"Updated Successfully"});
    }
    catch(error){
         console.log("Error in the getAllnotes "+error);
        res.status(500).send("Internet Error");
    }
}


const deleteNotes=async(req,res)=>{
    try{
const {title,content}=req.body;
const deletenote=await Note.findByIdAndRemove(req.params.id,{title,content});
if(!deletenote){
    return res.status(500).json({message:"Not not not found"});
}
res.status(200).json({message:"Deleted successfully"});
    }
     catch(error){
         console.log("Error in the getAllnotes "+error);
        res.status(500).send("Internet Error");
    }
}
module.exports={
    getAllNotes,
    CreateNotes,
    GetnoteBytId,
    UpdatedNotes,
    deleteNotes,
};


