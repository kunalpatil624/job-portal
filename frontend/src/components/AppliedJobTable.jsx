import React from 'react'
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux'
import store from './redux/store'


const job = [1,2,3,4,5]
const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    console.log(allAppliedJobs)
  return (
    <div> 
        
        <Table>
            <TableCaption> {allAppliedJobs.length <= 0 ? <h1 className='text-red-500 text-center '>NOTE:- You haven't applied any job yet.</h1> : <p>A list of your applied jobs</p>}</TableCaption>
            <TableHeader>
                <TableHead>Company</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableHeader>
            <TableBody>
                {
                    allAppliedJobs?.map((appliedJob, index) => (
                        <TableRow key={index}>
                            <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                            <TableCell>{appliedJob?.job?.title}</TableCell>
                            <TableCell>{appliedJob?.job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right"><Badge className={`${appliedJob.status === "rejected" ? "bg-red-400" : appliedJob?.status === "pending" ? "bg-gray-400" :  "bg-green-400" }`} >{appliedJob?.status.toLowerCase()}</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable