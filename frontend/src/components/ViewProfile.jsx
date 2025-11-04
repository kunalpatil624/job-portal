import React, { useState } from 'react'
import Navbar from './shared/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pen, Mail, Phone, } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import AppliedJobTable from './AppliedJobTable';
import { Button } from "@/components/ui/button";
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector, useStore } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';


const skills = ["Java", "Python", "html", "Css", "JavaScript"];

const isResume = true;

const ViewProfile = () => {
  useGetAppliedJobs()
  
  const [open, setOpen] = useState(false)
  const {user} = useSelector(store=>store.auth);
  return (
    <div>
        <div className='max-w-4xl border border-gray-600 rounded-2xl p-8 mx-auto my-5'>
          <div className='flex justify-between '>
            <div className='flex items-center gap-4 '>
            <div>
            <Avatar className="w-30 h-30">
                <AvatarImage src={user?.profile?.profilePhoto}/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
        <div>
          <h1>{user?.fullname}</h1>
        <p>{user?.profile?.bio}</p>
        </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline" className="text-right"><Pen/></Button>
          </div>
          <div>
            <div className='flex items-center gap-2 my-5'>
            <Mail/> <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-2 my-5'>
            <Phone/> <span>{user?.phoneNumber}</span>
          </div>
          </div>
          <div>
            <h1 className='text-lg font-bold my-3'>Skills</h1>
            <div className='flex items-center gap-4'>
            {
              user?.profile?.skills.length !==0 ? user?.profile?.skills.map((skl, index) => (<Badge key={index} variant="ghost" >{skl}</Badge>)) : <span>N/A</span>
            }
            </div>
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5 my-3'>
            <Label className="text-md font-bold " >Resume</Label> 
            {
              isResume ? <a href={user?.profile?.resume || "https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp2_11cfcec183.webp"} className='text-blue-500 w-full hover:underline'>{user?.profile?.resumeOriginalName}</a> 
              : N/A
            }
          </div>
        </div>
        <div className='max-w-4xl rounded-2xl mx-auto p-8'>
          <h1 className='text-lg font-bold text-gray-500'>Applied job</h1>
          <AppliedJobTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default ViewProfile
