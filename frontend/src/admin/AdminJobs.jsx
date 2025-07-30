import React, { useEffect, useState } from 'react';
import Navbar from '../components/shared/Navbar';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import AdminJobsTable from './AdminJobsTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs';
import { updateSearchJobText } from '../components/redux/jobSlice';

export const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateSearchJobText(input));
  }, [input]);

  return (
    <div>
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex justify-between items-center my-5'>
          <Input onChange={(e) => setInput(e.target.value)} className="w-fit" placeholder="Filter by name, role" />
          <Button onClick={() => navigate("/admin/jobs/new")}>New Job</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};
