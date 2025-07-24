import React from "react";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import JobFilter from "./JobFilter";
import Footer from "./shared/Footer";
import { useSelector } from "react-redux";
import store from "./redux/store";

// const job = [1, 2, 3, 4, 5, 6, 7, 8];
const Jobs = () => {
    const {allJobs} = useSelector(store=>store.job);
  return (
    <div>
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5 ">
          <div className="w-[20%] hidden md:flex">
            <JobFilter />
          </div>
          {
            allJobs.length <= 0 ? <span>Job Not Found</span> : (
                <div className="flex-1 h-[88vh] overflow-y-auto pd-5 ">
                  
                    <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {
                            allJobs.map((job) => (
                                <div key={job?._id}>
                                  <Job job={job}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Jobs;
