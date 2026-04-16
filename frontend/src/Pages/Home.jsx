
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar"; 
import  RateLimiteUI  from "../Components/RateLimiteUI";
import NoteCard from "../Components/NoteCard";
import axios from "axios";
import toast from "react-hot-toast"
import NotesNotFound from "../Components/NoteNotFound";
import { Details } from "./Details";

export const Home = () => {

    const[isRateLimite   ,setisRateLimite]=useState(false);
    const[Note,setNote]=useState([]);
    const[loading,setloading]=useState(true);

    useEffect(()=>{
        const fetchNotes=async()=>{
            try{
                const res=await axios.get("/api/node");
                console.log(res.data);
                setNote(res.data);
               setisRateLimite(false);
            }
            catch(error){
                console.log("Error fecting notes");
                console.log(error.response);
                if(error.response?.status===429){
                    setisRateLimite(true);
                }
                else{
                    toast.error("Failed to load the Notes");
                }
            }
            finally{
                setloading(false);
            }
        };
        fetchNotes();
    },[]);

 useEffect(()=>{

  },[]);

  return (
  <div className="min-h-screen"> 
  <Navbar/>    

  {isRateLimite&&<RateLimiteUI/>}
  <div className="max-w-7xl mx-auto p-4 mt-6">
    {loading && <div className="text-center text-primary py-10">Loading Notes...</div>}

    {Note.length===0 && !isRateLimite &&<NotesNotFound/>}

    {Note.length>0 && !isRateLimite &&(
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Note.map((note)=>(
       <NoteCard key={note._id} note={note} setNote={setNote}/>
    ))}
 
</div>
    )}

  </div>
  </div>

);
};