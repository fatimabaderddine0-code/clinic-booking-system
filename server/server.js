const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
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
app.use("/api/services",require("./routes/serviceRoutes"));
app.use("/api/bookings",require("./routes/bookingRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.listen(5000,()=>{
    console.log("Server runnig on port 5000");
});
