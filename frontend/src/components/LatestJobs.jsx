import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'
import store from './redux/store'
const randomeJobs = [1,2,3,4,5,6,7,8]
const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job);

  return (
    <div className='max-w-7xl mt-15 gap-4 mx-auto'>
        <h1 className='font-bold text-4xl'><span className='text-[#6A38C2]'>Top & Latest</span> Job Openings</h1>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 my-5'>
            {
             allJobs.length <= 0 ? <span>No job available</span> : allJobs.slice(0,6).map((job) => (<LatestJobCard key={job._id} job={job}/>))
            }
        </div>
    </div>
  )
}

export default LatestJobs