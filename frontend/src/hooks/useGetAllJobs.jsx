// import axios from 'axios';
// import { useEffect } from 'react';
// import { JOB_API_AND_POINT } from '../components/utills/constand';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAllJobs } from '../components/redux/jobSlice';

// const useGetAllJobs = () => {
//   const dispatch = useDispatch();
//   const searchedQuery = useSelector((store) => store.job.searchQuery);

//   useEffect(() => {
//     const fetchAllJobs = async () => {
//       try {
//         const res = await axios.get(
//           `${JOB_API_AND_POINT}/get?keyword=${searchedQuery}`,
//           { withCredentials: true }
//         );
//         if (res.data.success) {
//           dispatch(setAllJobs(res.data.jobs));
//         }
//       } catch (error) {
//         console.error("Error fetching jobs:", error?.response?.data?.message || error.message);
//       }
//     };

//     fetchAllJobs();
//   }, [searchedQuery]); 
// };

// export default useGetAllJobs;
import axios from 'axios';
import { useEffect, useState } from 'react';
import { JOB_API_AND_POINT } from '../components/utills/constand';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../components/redux/jobSlice';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const searchedQuery = useSelector((store) => store.job.searchQuery);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${JOB_API_AND_POINT}/get?keyword=${searchedQuery}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]);

  return { loading };
};

export default useGetAllJobs;
