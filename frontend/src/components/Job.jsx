import React from 'react'
import { Button } from "@/components/ui/button";
import { Bookmark } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';

const Job = ({job}) => {
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(60*60*60*1000));
    }
    const navigate = useNavigate()
  return (
    <div onClick={()=> navigate(`/jobs/description/${job?._id}`)} className='border border bg-white-b-gray-100 rounded-md shadow-lg p-5 hover:shadow-2xl transition duration-300 hover:cursor-pointer'>
        <div className='flex justify-between items-center'>
                            <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="overline" className="rounded-full" size="icon"><Bookmark/></Button>
        </div>
        
        <div className='flex items-center gap-2 my-2'>
            <Button variant="overline " size="icon" className="border">
                <Avatar>
                    <AvatarImage src={job?.company?.logo}/>
                </Avatar>
            </Button>
            <div>
                <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
                <p className='text-gray-500 text-sm'>India</p>
            </div>
        </div>
        <div>
            <h1 className='font-bold font-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600 truncate'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
                    <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} position</Badge>
                    <Badge className='text-red-500 font-bold' variant="ghost">{job?.jobType}</Badge>
                    <Badge className='text-[#6A38C2] font-bold' variant="ghost">{job?.salary}4LPA</Badge>
          </div>
          <div className='flex items-center mt-4 gap-4'>
            <Button className="hover:bg-black hover:text-white" variant="overline" onClick={() => navigate(`/jobs/description/${job?._id}`)}>Details</Button>
            <Button className="bg-[#6A38C2]">Save For later</Button>

          </div>
    </div>
  )
}

export default Job