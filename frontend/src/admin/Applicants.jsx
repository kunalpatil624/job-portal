import React from 'react'
import Navbar from '../components/shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useEffect } from 'react'
import axios from 'axios'
import { APPLICATION_API_AND_POINT } from '../components/utills/constand'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplications } from '../components/redux/ApplicationSlice'
import store from '../components/redux/store'
import { toast } from 'sonner'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store) => store.application);

    useEffect(()=>{
        const fetchAllApplicants = async() => {
            try {
                const res = await axios.get(`${APPLICATION_API_AND_POINT}/${params.id}/applicants`, {withCredentials:true});
                console.log(res);
                    dispatch(setAllApplications(res.data.job.applications));               
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }
        }
        fetchAllApplicants();
    }, [])
  return (
    <div>
        <div className='max-w-7xl mx-auto my-10'>
            <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.length})</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants