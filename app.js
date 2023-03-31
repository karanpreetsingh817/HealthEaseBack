const express=require("express");
const mongoose=require("mongoose");
const doctorsRoute=require("./routers/doctorsRoute");
const patientsRoute=require("./routers/patientsRoute");
const dotenv=require("dotenv");


const app=express();
app.use(express.json());
dotenv.config({path:'./config.env'});

const port=process.env.PORT||7000;
const db=process.env.DATABASE;

// here we connect our application to backend
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(data =>console.log("connection succsefully with atlas"))
.catch(err =>console.log("error error !!!"));

// All routes define here
app.use("/v1/doctor",doctorsRoute);
app.use("/v1/patient",patientsRoute);

// this gloal middleware is  handle unHandeled routes
app.all("*",(req,res,next )=>{
    res.status(400).json({
        status:"Bad Request",
        statusCode:400,
        result:`${req.originalUrl} is no longer to accessable`
    });
});



app.use((err,req,res,next)=>{
    res.status(err.statusCode).json({
        statusCode:err.statusCode,
        status:err.status,
        message: err.message,
        err
    });
});

// creating server at local host port 8080
app.listen(port,(req,res)=>{
    console.log(`server is listening on port ${port}`);
});