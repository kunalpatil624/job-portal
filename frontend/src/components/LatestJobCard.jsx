import React from 'react';
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';

const LatestJobCard = ({job}) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=> navigate(`/jobs/description/${job._id}`)} className='p-5 border border-gray-100 bg-white rounded-md shadow-xl cursor-pointer'>
        <div>
            <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
            <p className='text-sm text-gray-600'>india</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2 truncate'>{job?.title}</h1>
            <p className='truncate'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} position</Badge>
            <Badge className='text-red-500 font-bold' variant="ghost">{job?.jobType}</Badge>
            <Badge className='text-[#6A38C2] font-bold' variant="ghost">{job?.salary}LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobCard