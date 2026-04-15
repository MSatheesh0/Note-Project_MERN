const express=require("express");
const router=express.Router();
const {getAllNotes, CreateNotes,GetnoteBytId ,UpdatedNotes,deleteNotes}=require("../controlles/nodeController");

router.get("/",getAllNotes);

router.post("/",CreateNotes);
router.get("/:id", GetnoteBytId);
router.put("/:id",UpdatedNotes);

router.delete("/:id",deleteNotes);

module.exports=router;
