import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_AND_POINT } from "../utills/constand";
import { toast } from 'sonner'
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import {Loader2} from 'lucide-react'
import Footer from "../shared/Footer";

function Login() {
  const {loading} = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    email:"",
    password:"",
    role:"",
  });

  const changeEventHandler = (e) =>{
  setInput({...input, [e.target.name]:e.target.value})
}

const submitHandler = async(e) =>{
  e.preventDefault();

  try {
    dispatch(setLoading(true))
    const res = await axios.post(`${USER_API_AND_POINT}/login`, input, {
    headers:{
      "Content-Type":"application/json",
    },
    withCredentials:true,
  })

  if(res.data.success){
    dispatch(setUser(res.data.user))
    navigate("/home");
    toast.success(res.data.message);
  }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  finally{
    dispatch(setLoading(false));
  }
}
  return (
    <div className="mt-15">
      <div className="flex justify-center max-w-9xl mx-auto">
        <form onSubmit={submitHandler} className="w-[95%] sm:w-4/5 md:w-2/3 lg:w-1/2 border border-gray-200 rounded-md p-3 sm:p-4">
          <h1 className="font-bold text-xl mb-5">Login/<span onClick={() => navigate("/signup")} className="text-blue-600 hover:cursor-pointer hover:underline">signup</span></h1>
          <div className="my-2">
            <Label className="m-1" htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="knlpvvtt@gmail.com" name="email" value={input.email} onChange={changeEventHandler}></Input>
          </div>

          <div className="my-2">
            <Label className="m-1" htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="password" name="password" value={input.password} onChange={changeEventHandler}></Input>
            
          </div>

          <div className=" my-2 items-center justify-center ">
            <RadioGroup className="flex items-center gap-4 my-5">
  <div className="flex items-center gap-3">
    <input
      id="r1"
      type="radio"
      name="role"
      value="student"
      checked={input.role === "student"}
      onChange={changeEventHandler}
      className="cursor-pointer appearance-none w-4 h-4 rounded-full border-2 border-black bg-white checked:bg-blue-500 checked:border-black-500 transition-all duration-200"
    />
    <Label htmlFor="r1" className="">Student</Label>
  </div>

  <div className="flex items-center gap-3">
    <input
      id="r2"
      type="radio"
      name="role"
      value="recruiter"
      checked={input.role === "recruiter"}
      onChange={changeEventHandler}
      className="cursor-pointer appearance-none w-4 h-4 rounded-full border-2 border-black bg-white checked:bg-blue-500 checked:border-black-500 transition-all duration-200"
    />
    <Label htmlFor="r2" className="">Recruiter</Label>
  </div>
</RadioGroup>

          </div>
          {
            loading ? (
              <Button type="submit" className="w-full my-4" ><Loader2 className=" mr-2 h-4 w-4 animate-spin"/> please wait</Button>
            ) : (
          <Button type="submit" className="w-full my-4 bg-blue-600">Login</Button>    
            )
          }
          <span className="text-sm">Don't have an account? <Link to={"/signup"}>signup</Link></span>
        </form>
      </div>
    </div>
  );
}

export default Login;
