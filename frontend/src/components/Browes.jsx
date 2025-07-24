import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import Footer from './shared/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from './redux/jobSlice'
import useGetAllJobs from '../hooks/useGetAllJobs'

const job = [1,2,3,4,5,1,2,3,4]
const Browes = () => {
  useGetAllJobs()
  const {allJobs} = useSelector(store=>store.job);
  const dispatch = useDispatch()
  useEffect(() => {
    return()=>{
      dispatch(setSearchQuery(""))
    }
  }, [])
  return (
    <div>
        <div className='max-w-7xl mx-auto my-10 '>
            <h1 className='text-xl font-bold my-10'>Total jobs ({allJobs.length})</h1>
            <div className='grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-5 mt-3'>
                {
                allJobs.map((job) => (
                    <Job key={job._id} job={job}/>
                ))
            }
            </div>
        </div>
    </div>
  )
}

export default Browes