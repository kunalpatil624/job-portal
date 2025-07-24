import axios from 'axios'
import React, {useEffect} from 'react'
import { JOB_API_AND_POINT } from '../components/utills/constand'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../components/redux/jobSlice'
import store from '../components/redux/store'

const useGetAllJobs = () => {
    const dispatch = useDispatch()
    const searchedQuery = useSelector(store => store.job.searchQuery);
     useEffect(()=>{
        const fetchAllJobs = async() =>{
            try {
                const res = await axios.get(`${JOB_API_AND_POINT}/get?keyword=${searchedQuery}`, {withCredentials:true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    }, [])
}

export default useGetAllJobs