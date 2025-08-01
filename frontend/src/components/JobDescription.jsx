import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import Navbar from "./shared/Navbar";
import { Button } from "@/components/ui/button";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from './redux/jobSlice';
import store from './redux/store';
import { APPLICATION_API_AND_POINT, JOB_API_AND_POINT } from './utills/constand';
import { toast } from 'sonner';


const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant?._id === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_AND_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); 
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); 
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
      if (!user?._id) return;
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_AND_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant?._id === user?._id)) 
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);
    

  return (
        <div>
          <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
              <div>
                  <h1 className='text-lg font-bold '>{singleJob?.title}</h1>
                 <div className='flex items-center gap-2 mt-4'>
                      <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.position} position</Badge>
                      <Badge className='text-red-500 font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                      <Badge className='text-[#6A38C2] font-bold' variant="ghost">{singleJob?.salary}LPA</Badge>
                  </div>
                </div>
            <div>
              <Button   disabled={isApplied} onClick={isApplied ? null : applyJobHandler} className={`${isApplied ? "bg-blue-600 cursor-not-allowed" : "bg-[#6A38C2]" }`}>{isApplied ? "Already Applied" : "Apply now"} </Button>
            </div>
            </div>
            <h1 className='border-b-2 border-b-gray-200 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
              <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
              <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
              <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
              <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLavel} yers</span></h1>
              <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}/LPA</span></h1>
              <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications.length}</span></h1>
              <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
          </div>    
        </div>
  )
}

export default JobDescription