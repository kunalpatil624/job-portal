import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs = [], searchJobByText = "" } = useSelector(store => store.job);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilteredJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  if (allAdminJobs.length === 0) {
    return <div className='flex items-center justify-center'>Loading jobs...</div>;
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recently posted jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filteredJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className="w-34">
                      <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 cursor-pointer '>
                        <Edit2 className='w-4'/> <span>Edit</span>
                      </div>
                      <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 w-fit mt-2 cursor-pointer'>
                        <Eye className='w-4'/> <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
