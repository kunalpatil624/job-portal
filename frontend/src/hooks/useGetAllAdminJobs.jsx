import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '../components/redux/jobSlice'
import { JOB_API_AND_POINT } from '../components/utills/constand'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.post(`${JOB_API_AND_POINT}/getadminjobs`, {}, {withCredentials: true,});
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs));
                    
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs