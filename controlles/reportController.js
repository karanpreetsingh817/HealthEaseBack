const Report=require("./../models/reportsModel");
const catchAsync = require("../utli/catchAsync");
const AppError = require("../utli/appError");

/*  
    This Route handler Post new reports to Patients 
    data in our system by only restricted by Doctor.
*/
exports.postReport=catchAsync(async(req,res,next)=>{
    const newReport = await Report.create(req.body);
    res.status(201).json({
        result:newReport,
        status:"sucessfull"
    })
})

exports.restrictTo=(...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.User.role)) {
            return next(new AppError(403, "You are not Allow to do This action"));
        }
        next();
    };
};
/*  
    If Doctor want to retreive All reports of patient.
*/
exports.getAllReports=catchAsync(async(req,res,next)=>{
   const reports=await Report.find();
    if(!reports){
        return next(new AppError("reports are not availale",401))
    }
    res.status(200).json({
        status:"successfull",
        statusCode:200,
        message:"There is all reports of all patients",
        reports
    })
});

/*  
    If Doctor want to retreive Medical History  of patient to check
    All reports of patient.
*/
exports.getReportHistory=catchAsync(async(req,res,next)=>{
    const reports=await Report.find({patientId:req.body.Id});
    if(!reports){
        return next(new AppError(401,"reports are not availale"))
    }
    res.status(200).json({
        status:"successfull",
        statusCode:200,
        message:"there is all reports of This Patient",
        reports
    })

})