import axios, { Axios } from "axios";
import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { APPLICATION_API_AND_POINT } from "../components/utills/constand";
import { toast } from "sonner";
import {setAllAppliedJobs } from "../components/redux/jobSlice";

 const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async() => {
        try {
            const res = await axios.get(`${APPLICATION_API_AND_POINT}/get`, {withCredentials:true});
            console.log(res);
            if (res.data.success) {
                dispatch(setAllAppliedJobs(res.data.application));
            }
        } catch (error) {
            toast.error(error?.response?.data)
        }
    }
    fetchAppliedJobs();
  },[])
}

export default useGetAppliedJobs;