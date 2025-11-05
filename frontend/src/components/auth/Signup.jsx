import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_AND_POINT } from "../utills/constand";
import { toast } from "sonner";
import axios from "axios";
import { setLoading } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Store } from "lucide-react";
import store from "../redux/store";
import Footer from "../shared/Footer";

function Signup() {
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_AND_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="my-10">
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-[95%] sm:w-4/5 md:w-2/3 lg:w-1/2 border border-gray-200 rounded-md p-3 sm:p-4"
        >
          <h1 className="font-bold text-xl mb-5">Signup/<span onClick={() => navigate("/login")} className="hover:cursor-pointer hover:underline text-blue-600">Login</span></h1>
          <div className="my-2">
            <Label className="m-1">Full Name</Label>
            <Input
              type="text"
              placeholder="kunal patil"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
            ></Input>
          </div>

          <div className="my-2">
            <Label className="m-1">Email</Label>
            <Input
              type="email"
              placeholder="knlpvvtt@gmail.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            ></Input>
          </div>

          <div className="my-2">
            <Label className="m-1">Phone Number</Label>
            <Input
              type="text"
              placeholder="6265xxxxx1"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            ></Input>
          </div>

          <div className="my-2">
            <Label className="m-1">Password</Label>
            <Input
              type="password"
              placeholder="passwoed"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            ></Input>
          </div>

          <div className=" my-2 items-center justify-center ">
            <RadioGroup className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 my-5">
              <div className="flex items-center gap-2">
                <input
                  id="student"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer appearance-none w-4 h-4 rounded-full border-2 border-black bg-white checked:bg-blue-500 checked:border-black-500 transition-all duration-200"
                />
                <Label htmlFor="student" className="cursor-pointer">
                  student
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="recruiter"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer appearance-none w-4 h-4 rounded-full border-2 border-black bg-white checked:bg-blue-500 checked:border-black-500 transition-all duration-200"
                />
                <Label htmlFor="recruiter" className="cursor-pointer">
                  recruiter
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="profile">Profile</Label>
                <Input
                  id="profile"
                  accept="image/*"
                  type="file"
                  required
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button type="submit" className="w-full my-4">
              <Loader2 className=" mr-2 h-4 w-4 animate-spin" /> please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-blue-600">
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account? <Link to={"/login"}>login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
