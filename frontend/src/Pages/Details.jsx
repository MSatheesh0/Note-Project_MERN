import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const Details = () => {
  const [note,setnote]=useState(null);
  const [loading,setloading]=useState(true);
  const[saving,setsaving]=useState(false);

  const navigate=useNavigate();
  const {id}=useParams();

  useEffect(()=>{
    const fetchNote=async()=>{
      try{
        const res =await axios.get(`http://localhost:3000/api/node/${id}`);
        setnote(res.data);
      }
      catch(error){
        console.log("Error to fetching note "+error);
        toast.error("Failed to fetching Note. try again later")
      }
      finally{
        setloading(false);
      }
    };
    fetchNote();
  },[id]);

  const handleDelete=async()=>{
    if(!window.confirm("Sure want to delete the Note?")) return;

    try{
      await axios.delete(`http://localhost:3000/api/node/${id}`);
      toast.success("Note Deleted Successfully");
      navigate("/");
    }
    catch(error){
      console.log("Error to delete "+error);
      toast.error("Failed to Delete Note");
    } 
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setsaving(true);

    try {
      await axios.put(`http://localhost:3000/api/node/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/"); 
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setsaving(false);
    }
  };

  if(loading){
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className='animate-spin size-10 '/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl p-4">

          <div className="flex items-center justify-between mb-6">
            
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className='card-body'>

              {/* Title */}
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>

                <input
                  type='text'
                  className='input input-bordered'
                  value={note.title}
                  onChange={(e)=> setnote({...note, title: e.target.value})}
                />
              </div>

              {/* Content */}
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>

                <textarea
                  className='textarea textarea-bordered h-32'
                  value={note.content}
                  onChange={(e)=> setnote({...note, content: e.target.value})}
                />
              </div>
              
              <div className='card-actions justify-end'>
                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Note"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}