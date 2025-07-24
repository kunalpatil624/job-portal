import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { APPLICATION_API_AND_POINT } from '../components/utills/constand'
import { toast } from 'sonner'



const shortListingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);

    const statusHandler = async(status, id) => {
      try {
        const res = await axios.post(`${APPLICATION_API_AND_POINT}/status/${id}/update`, {status}, {withCredentials:true});
        if(res?.data?.success){
          toast.success(res?.data?.message)
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    }
  return (
    <div>
      <Table>
        <TableCaption>A list of your resent applied user.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>fullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          
            {
                applicants && applicants.map((item) => {
                    return(<tr key={item._id}>
            <TableCell>{item?.applicant?.fullname}</TableCell>
            <TableCell>{item?.applicant?.email}</TableCell>
            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
            <TableCell>{item?.applicant?.profile?.resume ? <a className='text-blue-500 hover:underline hover:cursor-pointer' href={item?.applicant?.profile?.resume}>{item?.applicant?.profile?.resumeOriginalName}</a> : <span>N/A</span>}</TableCell>
            <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
            <TableCell>
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  {shortListingStatus.map((status, index) => {
                    return (
                      <div onClick={()=>statusHandler(status, item._id)} key={index} className='hover:cursor-pointer'>
                        <span>{status}</span>
                      </div>
                    );
                  })}
                </PopoverContent>
              </Popover>
            </TableCell>
          </tr>)
                })
            }
            
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable