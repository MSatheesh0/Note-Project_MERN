const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors")
const { connect } = require("mongoose");


const newRoutes =require("../src/routes/newRoutes");
const connectDB = require("./config/db");
const rateLimiter = require("./middleware/rateLimiter");

dotenv.config();
const app=express();

app.use(
    cors({
        origin:"http://localhost:5173",
    })
);

app.use(express.json());
app.use(rateLimiter); 

const port=3000;


app.use("/api/node",newRoutes);


connectDB().then(()=>{
    app.listen(port,()=>{
        console.log("server stated successfully "+port);
    });
})
.catch((error)=>{
   console.log("Fail to connect the db " ,+error); 
});