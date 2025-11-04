// import React, { useEffect } from 'react';
// import HeroSection from './HeroSection';
// import CategouryCarousle from './CategouryCarousle';
// import LatestJobs from './LatestJobs';
// import useGetAllJobs from '../hooks/useGetAllJobs';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Loading from './shared/Loading';

// const Home = () => {
//   useGetAllJobs();
//   const { user } = useSelector((store) => store.auth);
//   const { allJobs } = useSelector((store) => store.job);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user?.role === 'recruiter') {
//       navigate("/admin/companies");
//     }
//   }, [user, navigate]);

//   return (
//     <div className='w-full'>
//       <HeroSection />
//       <CategouryCarousle />
//       <LatestJobs />
//     </div>
    
//   );
// };

// export default Home;


import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import CategouryCarousle from './CategouryCarousle';
import LatestJobs from './LatestJobs';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from './shared/Loading';

const Home = () => {
  const { loading } = useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const { allJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  // 👉 Jab tak data fetch ho raha hai, loader show karo
  if (loading) {
    return <Loading />;
  }

  return (
    <div className='w-full'>
      <HeroSection />
      <CategouryCarousle />
      <LatestJobs />
    </div>
  );
};

export default Home;
