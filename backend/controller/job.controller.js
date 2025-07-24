import {Job} from "../models/job.model.js";
// admin post krega
export const postJob = async(req, res) =>{
  try {
    const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;
    const userId = req.id
    if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
        res.status(400).json({
            message:"Sumthing is missing.",
            success:false
        });
    };

    const job = await Job.create({
        title,
        description,
        requirements:requirements.split(","),
        salary:Number(salary),
        location,
        jobType,
        experienceLavel:experience,
        position,
        company:companyId,
        created_by:userId
    });

    return res.status(201).json({
        message:"New job created successfully.",
        job,
        success:true
    });
  } catch (error) {
    console.log(error);
  }

};

//students
export const getAllJobs = async(req, res) =>{
    try {
        const keyword = req.query.keyword || "";    
    const query = {
        $or:[
            {title:{$regex:keyword, $options:"i"}},
            {description:{$regex:keyword, $options:"i"}}
        ]
    };
    const jobs = await Job.find(query).populate({path:"company"}).sort({createdAt: -1});
    if(!jobs){
        return res.status(400).json({
            message:"Jobs not found.",
            success:false
        });
    };

    return res.status(201).json({
        message:"Jobs found successfully.",
        jobs,
        success:true
    });
    } catch (error) {
        console.log(error);
    }
};


//students
export const getJobById = async(req, res) =>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({path: 'applications',populate: {path: 'applicant', select: 'fullname email'}});
        if(!job){
            return res.status(400).json({
            message:"Jobs not found.",
            success:false
        });
        };
        return res.status(201).json({
            message:"Job found successfully.",
            job,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
};

//admin ne kitne job create kia abhi tk
import mongoose from "mongoose";

export const getAdminJob = async (req, res) => {
  try {
    const adminId = new mongoose.Types.ObjectId(req.id); 
    console.log("Admin ID:", adminId);

    const jobs = await Job.find({ created_by: adminId }).populate({
      path: 'company',
      options: { sort: { createdAt: -1 } },
    });

    console.log("Jobs:", jobs);

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false
      });
    }

    return res.status(200).json({
      jobs,
      success: true
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};
