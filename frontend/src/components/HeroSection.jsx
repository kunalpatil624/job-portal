import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from './redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchHandler = () => {
    dispatch(setSearchQuery(query))
    navigate("/browes");
  }

  return (
    <div className="relative w-full">
      {/* 🌈 Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-purple-100 to-white z-[-1]" />

      {/* Main Content */}
      <div className="text-center grid ">
        <div className="flex flex-col gap-5 my-5">
          <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-red-500 font-medium">
            No.1 job hunt by google
          </span>
          <h1 className="text-5xl font-bold">
            Search, Apply & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-bold">
              Get You Dreame Job
            </span>
          </h1>
          <p className='font-[Poppins]'>
            "Find your dream job or the perfect candidate — all in one powerful,
            easy-to-use platform."
          </p>
          <div className="flex w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              placeholder="Find your dream jobs"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              className="outline-none border-none w-full"
            />
            <Button
              onClick={searchHandler}
              className="rounded-r-full bg-[#6A38C2]"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
