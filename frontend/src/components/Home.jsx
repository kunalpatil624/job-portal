import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategouryCarousle from './CategouryCarousle'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import store from './redux/store'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  
  useGetAllJobs();
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.role === 'recruiter'){
      navigate("/admin/companies");
    }
  },[])
  return (
    <div>
        <HeroSection/>
        <CategouryCarousle/>
        <LatestJobs/>
    </div>
  )
}

export default Home