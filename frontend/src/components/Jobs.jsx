import React, { useEffect, useState } from "react";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import JobFilter from "./JobFilter";
import Footer from "./shared/Footer";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [searchQuery, allJobs]);

  return (
    <div>

      <div className="max-w-xl mx-auto mt-5">
        <div className="block md:hidden">
          <Dialog> 
            <div>
              
            </div>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%] max-w-sm max-h-[80vh] overflow-hidden rounded-xl p-0 flex flex-col">
  <DialogHeader className="p-4 border-b">
    <DialogTitle className="text-xl">Filter Options</DialogTitle>
    <DialogDescription>
      Choose filters to narrow down your job search.
    </DialogDescription>
  </DialogHeader>

  <div className="overflow-y-auto px-4 py-2 flex-1">
    <JobFilter />
  </div>

  <DialogClose asChild>
    <div className="border-t p-4 bg-white sticky bottom-0">
      <Button variant="outline" className="w-full">
        Search
      </Button>
    </div>
  </DialogClose>
</DialogContent>

          </Dialog>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="w-[20%] hidden md:flex">
          <JobFilter />
        </div>

        <div className="flex-1 h-[88vh] overflow-y-auto p-5">
          {filterJobs.length === 0 ? (
            <div className="w-full flex justify-center">
              <p className="text-center w-full">Job Not Found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filterJobs.map((job) => (
                <motion.div
                  key={job?._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Jobs;
