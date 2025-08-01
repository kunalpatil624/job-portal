import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import CategouryCarousle from './CategouryCarousle';
import LatestJobs from './LatestJobs';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const { allJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className='w-full'>
      <div className="text-white bg-blue-700 text-xs p-1 px-3 fixed top-0 left-0 z-50 rounded-br-xl shadow-md">
        {allJobs?.length || 0} jobs fetched
      </div>
      
      <HeroSection />
      <CategouryCarousle />
      <LatestJobs />
    </div>
  );
};

export default Home;
