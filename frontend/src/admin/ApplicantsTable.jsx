import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, CheckCircle, XCircle, Clock } from "lucide-react"; // ✅ Added icons
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_AND_POINT } from "../components/utills/constand";
import { toast } from "sonner";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_AND_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  // ✅ Helper to render status icon + color
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return (
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <CheckCircle size={16} /> Accepted
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 text-red-600 font-medium">
            <XCircle size={16} /> Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-gray-600 font-medium">
            <Clock size={16} /> Pending
          </span>
        );
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>
          A list of your recently applied users.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants &&
            applicants.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-500 hover:underline hover:cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.createdAt?.split("T")[0]}
                </TableCell>

                {/* ✅ Status column with colored icon */}
                <TableCell>{getStatusBadge(item?.status)}</TableCell>

                {/* ✅ Popover for Accept/Reject */}
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36">
                      <div className="text-sm font-medium mb-2 text-gray-700 border-b pb-1">
                        Update Status
                      </div>
                      {shortListingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item._id)}
                          className={`flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer ${
                            status === "Accepted"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {status === "Accepted" ? (
                            <CheckCircle size={16} />
                          ) : (
                            <XCircle size={16} />
                          )}
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
