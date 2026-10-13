const express = require("express");
const cors = require("cors");
const app = express();
const db= require("./config/db");
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Clinic server is running!");
});
db.connect((err)=>{
    if(err){
        console.error("Database connection failed:",err.message);
    }else{
        console.log("Database connection successfully!");
    }
});
app.listen(5000,()=>{
    console.log("Server runnig on port 5000");
});