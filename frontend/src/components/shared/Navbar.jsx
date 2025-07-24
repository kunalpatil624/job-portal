import React from "react";
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaBeer } from "react-icons/fa"; // FontAwesome icon
import { Link, useNavigate} from "react-router-dom";
import { setUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, Menu, User2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_AND_POINT } from "../utills/constand";
import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger,} from "@/components/ui/sheet"

const Navbar = () => {
  const {user} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandler = async() =>{
    try {
      const res = await axios.get(`${USER_API_AND_POINT}/logout`, {withCredentials:true});
      if(res.data.success){
      }
      dispatch(setUser(null));
      navigate("/");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      
    }
  }
  return (
    <div className="bg-white w-full">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <Link to={"/home"}>
            <h1 className="text-2xl font-bold">
              job <span className="text-red-500">portal</span>
            </h1>
          </Link>
        </div>

        <div className="hidden md:flex flex gap-12 items-center">
          <ul className="flex font-medium item-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to={"/home"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/home"}>Home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/browes"}>Browes</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <Button variant="outline">Login</Button>
              </Link>
              <Link to={"/Signup"}>
                <Button className="bg-[#6A38C2]">Singup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="profile-photo"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex gap-4 ">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@profile-photo"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div>
                  {user && user.role === "student" ? (
                    <div>
                      <Button variant="link">
                        <User2 />
                        <Link to={"/profile"}>View profie</Link>
                      </Button>
                    </div>
                  ) : null}
                  <div>
                    <Button
                      className="hover:cursor-pointer"
                      onClick={logOutHandler}
                      variant="link"
                    >
                      <LogOut />
                      Log-out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="mt-8 flex flex-col gap-4 font-medium">
                {user && (
                  <div className="flex items-center gap-3 p-3 rounded-md border bg-muted">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-base">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                        {user?.profile?.bio || "No bio added"}
                      </p>
                    </div>
                  </div>
                )}

                {user?.role === "student" && (
                  <Link to="/profile">
                    <Button variant="ghost" className="w-full justify-start">
                      <User2 className="mr-2" />
                      View Profile
                    </Button>
                  </Link>
                )}

                <hr className="my-2" />

                {user?.role === "recruiter" ? (
                  <>
                    <Link to="/home">Companies</Link>
                    <Link to="/admin/jobs">Jobs</Link>
                  </>
                ) : (
                  <>
                    <Link className="px-3" to="/home">Home</Link>
                    <Link className="px-3" to="/jobs">Jobs</Link>
                    <Link className="px-3" to="/browes">Browse</Link>
                  </>
                )}

                <hr className="my-2" />

                {!user ? (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/Signup">
                      <Button className="w-full bg-[#6A38C2] text-white">
                        Signup
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={logOutHandler}
                    >
                      <LogOut className="mr-2" />
                      Log Out
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
