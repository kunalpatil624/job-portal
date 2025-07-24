import axios from 'axios'
import React, {useEffect} from 'react'
import { COMPANY_API_END_POINT, JOB_API_AND_POINT } from '../components/utills/constand'
import { useDispatch } from 'react-redux'
import { setCompanies} from '../components/redux/companySlice'

const useGetAllCompany = (companyId) => {
    const dispatch = useDispatch()
     useEffect(()=>{
        const fetchAllCompany = async() =>{
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {withCredentials:true});
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCompany();
    }, [ ])
}

export default useGetAllCompany