import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast"
import axios from "axios"


export const Create = () => {
  const [title,settitle]=useState("");
  const [content,setcontent]=useState("");
  const[loading,setloading]=useState(false);
  
  const navigation=useNavigate("/");

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(!title.trim()||!content.trim()){
      toast.error("Fill the all Fields");
      return;
    }

    setloading(false);
    try{
      await axios.post("http://localhost:3000/api/node",{
        title,content,
      });
      toast.success("Note Created Scuccessfully");
      navigation("/");
    }
    catch(error){
      console.log("Error to create "+error);
      if(error.response.status===429){
        toast.error("Slow Down! You are creating many request",{
          duration:"4000",
          icon:"💀"
        })
      }
      else{
        toast.error("Failed to create Note. try again later")
      }
    }
    finally{

    }
 };
  return (
    <div className="min-h-screen bg-base-200">
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className="btn btn-ghost mb-6">
             <ArrowLeftIcon className="size-5"/>Back to Note
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>

                <div className='form-control mb-4'>
                  <lable className='lable'>
                    <span className='lable-text'>Title</span>
                  </lable>
                  <input type='text' placeholder='Note Title' className='input input-bordered' value={title}
                   onChange={(e)=>settitle(e.target.value)}></input>
                </div>

                 <div className='form-control mb-4'>
                  <lable className='lable'>
                    <span className='lable-text'>Content</span>
                  </lable>
                  <textarea type='text' placeholder='Write your Notes... ' className='textarea textarea-bordered h-32' value={content} 
                  onChange={(e)=>setcontent(e.target.value)}></textarea>
                 </div>
                 
                 <div className='card-actions justify-end'>
                 <button type="submit" className="btn btn-primary" disabled={loading}>{loading? "Creating...":"Create Note"}</button>
                 </div>
              </form>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
