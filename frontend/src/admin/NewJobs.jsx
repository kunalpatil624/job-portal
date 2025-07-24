import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from '../components/ui/input'
import Navbar from '../components/shared/Navbar'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_AND_POINT } from '../components/utills/constand'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companiesArray = [];

const NewJobs = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {companies} = useSelector(store => store.company)
    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name] : e.target.value});
    }

    const selectChangeHandler = (value) =>{
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    }

    const submitHandler = async(e)=>{
        e.preventDefault(); 
        try {
             setLoading(true);
             const res = await axios.post(`${JOB_API_AND_POINT}/post`, input, {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });
            if(res?.data?.success){
                toast.success(res?.data?.message);
                navigate("/admin/jobs")
            }
            
        } catch (error) {
            console.log(error);

        }finally{
            setLoading(false);
        }
    }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl broder border-gray-200 shadow-lg rounded-md">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                onChange={changeEventHandler}
                value={input.title}
                type="text"
                name="title"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>Description</Label>
              <Input
                onChange={changeEventHandler}
                value={input.description}
                type="text"
                name="description"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                onChange={changeEventHandler}
                value={input.requirements}
                type="text"
                name="requirements"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                onChange={changeEventHandler}
                value={input.salary}
                type="text"
                name="salary"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>Location</Label>
              <Input
                onChange={changeEventHandler}
                value={input.location}
                type="text"
                name="location"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>JobType</Label>
              <Input
                onChange={changeEventHandler}
                value={input.jobType}
                type="text"
                name="jobType"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                onChange={changeEventHandler}
                value={input.experience}
                type="text"
                name="experience"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>Position</Label>
              <Input
                onChange={changeEventHandler}
                value={input.position}
                type="number"
                name="position"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              {companies.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                 <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a comapny" />
                 </SelectTrigger>
                    <SelectContent>
                       <SelectGroup>
                        {
                            companies.map((company) => {
                               return <SelectItem  key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                            })
                        }
                       </SelectGroup>
                    </SelectContent>
                </Select>
              )}
            </div>
          </div>
          {
            loading ? <Button type="submit" className="w-full mt-2"><Loader2 className='animate-spin w-4 h-4 MR-2'/>Please wait</Button> : <Button type="submit" className="w-full mt-2">Post New Job</Button>
          }
          { 
          companies.length === 0 && (
            <p className="text-xs text-center my-1 text-red-500">
              Please register a company first, before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default NewJobs