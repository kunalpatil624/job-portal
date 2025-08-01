import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaBeer } from "react-icons/fa"; // FontAwesome icon
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, Menu, User2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_AND_POINT } from "../utills/constand";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_AND_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
      }
      dispatch(setUser(null));
      navigate("/");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="bg-white w-full sticky top-0 bg-white shadow-sm z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <Link to={"/home"}>
            <h1 className="text-2xl font-bold">
              job <span className="text-red-500">portal</span>
            </h1>
          </Link>
          {/* <img className="h-40 w-40" src="https://res.cloudinary.com/dtyuevzyx/image/upload/v1753386038/ChatGPT_Image_Jul_25_2025_01_09_37_AM_sbl7r4.png" alt="" /> */}
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
          {
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>
                  {
                    user && user?.role === "student" ? (
                     <Link to={"/profile"}>My Account</Link>
                    ) : (
                      "My Account"
                    )
                  }
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  {!user ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/home">
                          Home
                          <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/jobs">
                          Jobs
                          <DropdownMenuShortcut>⌘J</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/browes">
                          Browse
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : user?.role === "student" ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/home">
                          Home
                          <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/jobs">
                          Jobs
                          <DropdownMenuShortcut>⌘J</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/browes">
                          Browse
                          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/home">
                          Companies
                          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/jobs">
                          Jobs
                          <DropdownMenuShortcut>⌘J</DropdownMenuShortcut>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>GitHub</DropdownMenuItem>
                <DropdownMenuItem disabled>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                {!user ? (
                  <DropdownMenuItem>
                    <Link to={"/login"}>Login</Link>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>
                    <Button
                      className="hover:cursor-pointer"
                      onClick={logOutHandler}
                      variant="link"
                    >
                      {" "}
                      Log-out
                    </Button>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
