// import React, { useEffect, useState } from 'react'
// import { Badge } from "@/components/ui/badge"
// import Navbar from "./shared/Navbar";
// import { Button } from "@/components/ui/button";
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSingleJob } from './redux/jobSlice';
// import store from './redux/store';
// import { APPLICATION_API_AND_POINT, JOB_API_AND_POINT } from './utills/constand';
// import { toast } from 'sonner';


// const JobDescription = () => {
//   const [loading, setLoading] = useState(false);
//     const {singleJob} = useSelector(store => store.job);
//     const {user} = useSelector(store=>store.auth);
//     const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant?._id === user?._id) || false;
//     const [isApplied, setIsApplied] = useState(isIntiallyApplied);
//     const params = useParams();
//     const jobId = params.id;
//     const dispatch = useDispatch();

//     const applyJobHandler = async () => {
//         try {
//           setLoading(true)
//             const res = await axios.get(`${APPLICATION_API_AND_POINT}/apply/${jobId}`, {withCredentials:true});
            
//             if(res.data.success){
//                 setIsApplied(true); 
//                 const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
//                 dispatch(setSingleJob(updatedSingleJob)); 
//                 toast.success(res.data.message);

//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally{
//           setLoading(false);
//         }
//     }

//     useEffect(()=>{
//       if (!user?._id) return;
//         const fetchSingleJob = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_AND_POINT}/get/${jobId}`,{withCredentials:true});
//                 if(res.data.success){
//                     dispatch(setSingleJob(res.data.job));
//                     setIsApplied(res.data.job.applications.some(application=>application.applicant?._id === user?._id)) 
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchSingleJob(); 
//     },[jobId,dispatch, user?._id]);
    

//   return (
//         <div>
//           <div className='max-w-7xl mx-auto my-10'>
//             <div className='flex items-center justify-between'>
//               <div>
//                   <h1 className='text-lg font-bold '>{singleJob?.title}</h1>
//                  <div className='flex items-center gap-2 mt-4'>
//                       <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.position} position</Badge>
//                       <Badge className='text-red-500 font-bold' variant="ghost">{singleJob?.jobType}</Badge>
//                       <Badge className='text-[#6A38C2] font-bold' variant="ghost">{singleJob?.salary}LPA</Badge>
//                   </div>
//                 </div>
//             <div>
//               <Button   disabled={isApplied} onClick={isApplied ? null : applyJobHandler} className={`${isApplied ? "bg-blue-600 cursor-not-allowed" : "bg-[#6A38C2]" }`}>{isApplied ? "Already Applied" : "Apply now"} </Button>
//             </div>
//             </div>
//             <h1 className='border-b-2 border-b-gray-200 font-medium py-4'>Job Description</h1>
//             <div className='my-4'>
//               <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
//               <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
//               <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
//               <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLavel} yers</span></h1>
//               <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}/LPA</span></h1>
//               <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications.length}</span></h1>
//               <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
//             </div>
//           </div>    
//         </div>
//   )
// }

// export default JobDescription

import React, { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from './redux/jobSlice';
import { APPLICATION_API_AND_POINT, JOB_API_AND_POINT } from './utills/constand';
import { toast } from 'sonner';

const JobDescription = () => {
  const [loading, setLoading] = useState(false);
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant?._id === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${APPLICATION_API_AND_POINT}/apply/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?._id) return;
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_AND_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant?._id === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-lg font-bold'>{singleJob?.title}</h1>
            <div className='flex items-center gap-2 mt-4'>
              <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.position} position</Badge>
              <Badge className='text-red-500 font-bold' variant="ghost">{singleJob?.jobType}</Badge>
              <Badge className='text-[#6A38C2] font-bold' variant="ghost">{singleJob?.salary} LPA</Badge>
            </div>
          </div>

          {/* ✅ Button with Loading Spinner */}
          <div>
            <Button
              disabled={isApplied || loading}
              onClick={isApplied ? null : applyJobHandler}
              className={`${isApplied ? "bg-blue-600 cursor-not-allowed" : "bg-[#6A38C2]"}`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-gray-200 animate-spin fill-white"
                    viewBox="0 0 100 101"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 
                      100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 
                      50 0.59082C77.6142 0.59082 100 22.9766 100 
                      50.5908ZM9.08197 50.5908C9.08197 73.1895 
                      27.4013 91.5089 50 91.5089C72.5987 91.5089 
                      90.918 73.1895 90.918 50.5908C90.918 
                      27.9921 72.5987 9.67273 50 9.67273C27.4013 
                      9.67273 9.08197 27.9921 9.08197 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 
                      97.8624 35.9116 97.0079 33.5539C95.2932 
                      28.8227 92.871 24.3692 89.8167 
                      20.348C85.8452 15.1192 80.8826 
                      10.7238 75.2124 7.41289C69.5422 
                      4.10194 63.2754 1.94025 56.7698 
                      1.05124C51.7666 0.367541 46.6976 
                      0.446843 41.7345 1.27873C39.2613 
                      1.69328 37.813 4.19778 38.4501 
                      6.62326C39.0873 9.04874 41.5694 
                      10.4717 44.0505 10.1071C47.8511 
                      9.54855 51.7191 9.52689 55.5402 
                      10.0491C60.8642 10.7766 65.9928 
                      12.5457 70.6331 15.2552C75.2735 
                      17.9648 79.3347 21.5619 82.5849 
                      25.841C84.9175 28.9121 86.7997 
                      32.2913 88.1811 35.8758C89.083 38.2158 
                      91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  Applying...
                </div>
              ) : isApplied ? (
                "Already Applied"
              ) : (
                "Apply now"
              )}
            </Button>
          </div>
        </div>

        <h1 className='border-b-2 border-b-gray-200 font-medium py-4'>Job Description</h1>
        <div className='my-4'>
          <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
          <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
          <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
          <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLavel} years</span></h1>
          <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}/LPA</span></h1>
          <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications.length}</span></h1>
          <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
        </div>
      </div>
    </div>
  )
}

export default JobDescription;
