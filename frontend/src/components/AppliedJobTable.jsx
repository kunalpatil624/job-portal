// // // import React from 'react'
// // // import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
// // // import { Badge } from "@/components/ui/badge"
// // // import { useSelector } from 'react-redux'
// // // import store from './redux/store'


// // // const job = [1,2,3,4,5]
// // // const AppliedJobTable = () => {
// // //     const { allAppliedJobs } = useSelector(store => store.job);
// // //     console.log(allAppliedJobs)
// // //   return (
// // //     <div> 
        
// // //         <Table>
// // //             <TableCaption> {allAppliedJobs.length <= 0 ? <h1 className='text-red-500 text-center '>NOTE:- You haven't applied any job yet.</h1> : <p>A list of your applied jobs</p>}</TableCaption>
// // //             <TableHeader>
// // //                 <TableHead>Company</TableHead>
// // //                 <TableHead>Job Role</TableHead>
// // //                 <TableHead>Date</TableHead>
// // //                 <TableHead className="text-right">Status</TableHead>
// // //             </TableHeader>
// // //             <TableBody>
// // //                 {
// // //                     allAppliedJobs?.map((appliedJob, index) => (
// // //                         <TableRow key={index}>
// // //                             <TableCell>{appliedJob?.job?.company?.name}</TableCell>
// // //                             <TableCell>{appliedJob?.job?.title}</TableCell>
// // //                             <TableCell>{appliedJob?.job?.createdAt.split("T")[0]}</TableCell>
// // //                             <TableCell className="text-right"><Badge className={`${appliedJob.status === "rejected" ? "bg-red-400" : appliedJob?.status === "pending" ? "bg-gray-400" :  "bg-green-400" }`} >{appliedJob?.status.toLowerCase()}</Badge></TableCell>
// // //                         </TableRow>
// // //                     ))
// // //                 }
// // //             </TableBody>
// // //         </Table>
// // //     </div>
// // //   )
// // // }

// // // export default AppliedJobTable

// // import React from "react";
// // import {
// //   Table,
// //   TableBody,
// //   TableCaption,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import { Badge } from "@/components/ui/badge";
// // import { useSelector } from "react-redux";

// // const AppliedJobTable = () => {
// //   const { allAppliedJobs } = useSelector((store) => store.job);
// //   console.log(allAppliedJobs);

// //   return (
// //     <div>
// //       <Table>
// //         <TableCaption>
// //           {allAppliedJobs.length <= 0 ? (
// //             <h1 className="text-red-500 text-center">
// //               NOTE: You haven't applied to any job yet.
// //             </h1>
// //           ) : (
// //             <p>A list of your applied jobs</p>
// //           )}
// //         </TableCaption>

// //         {/* ✅ Fixed TableHeader structure */}
// //         <TableHeader>
// //           <TableRow>
// //             <TableHead>Company</TableHead>
// //             <TableHead>Job Role</TableHead>
// //             <TableHead>Date</TableHead>
// //             <TableHead className="text-right">Status</TableHead>
// //           </TableRow>
// //         </TableHeader>

// //         <TableBody>
// //           {allAppliedJobs?.map((appliedJob, index) => (
// //             <TableRow key={index}>
// //               <TableCell>{appliedJob?.job?.company?.name}</TableCell>
// //               <TableCell>{appliedJob?.job?.title}</TableCell>
// //               <TableCell>
// //                 {appliedJob?.job?.createdAt?.split("T")[0]}
// //               </TableCell>
// //               <TableCell className="text-right">
// //                 <Badge
// //                   className={`${
// //                     appliedJob?.status === "rejected"
// //                       ? "bg-red-400"
// //                       : appliedJob?.status === "pending"
// //                       ? "bg-gray-400"
// //                       : "bg-green-400"
// //                   } capitalize`}
// //                 >
// //                   {appliedJob?.status}
// //                 </Badge>
// //               </TableCell>
// //             </TableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //     </div>
// //   );
// // };

// // export default AppliedJobTable;


// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { useSelector } from "react-redux";
// import { CheckCircle, XCircle, Clock } from "lucide-react"; // ✅ Import icons

// const AppliedJobTable = () => {
//   const { allAppliedJobs } = useSelector((store) => store.job);
//   console.log(allAppliedJobs);

//   const getStatusBadge = (status) => {
//     switch (status?.toLowerCase()) {
//       case "accepted":
//         return (
//           <Badge className="flex items-center gap-2 bg-green-500 text-white">
//             <CheckCircle size={16} />
//             Accepted
//           </Badge>
//         );
//       case "rejected":
//         return (
//           <Badge className="flex items-center gap-2 bg-red-500 text-white">
//             <XCircle size={16} />
//             Rejected
//           </Badge>
//         );
//       default:
//         return (
//           <Badge className="flex items-center gap-2 bg-gray-500 text-white">
//             <Clock size={16} />
//             Pending
//           </Badge>
//         );
//     }
//   };

//   return (
//     <div className="overflow-x-auto">
//       <Table>
//         <TableCaption>
//           {allAppliedJobs.length <= 0 ? (
//             <h1 className="text-red-500 text-center">
//               NOTE: You haven’t applied to any job yet.
//             </h1>
//           ) : (
//             <p>A list of your applied jobs</p>
//           )}
//         </TableCaption>

//         <TableHeader>
//           <TableRow>
//             <TableHead>Company</TableHead>
//             <TableHead>Job Role</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Status</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {allAppliedJobs?.map((appliedJob, index) => (
//             <TableRow key={index}>
//               <TableCell>{appliedJob?.job?.company?.name}</TableCell>
//               <TableCell>{appliedJob?.job?.title}</TableCell>
//               <TableCell>
//                 {appliedJob?.job?.createdAt?.split("T")[0]}
//               </TableCell>
//               <TableCell className="text-center">
//                 {getStatusBadge(appliedJob?.status)}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AppliedJobTable;


import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { CheckCircle, XCircle, Clock } from "lucide-react"; // ✅ Import icons

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  console.log(allAppliedJobs);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return (
          <Badge className="flex items-center justify-center gap-2 bg-green-500 text-white text-sm w-fit mx-auto">
            <CheckCircle size={16} />
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="flex items-center justify-center gap-2 bg-red-500 text-white text-sm w-fit mx-auto">
            <XCircle size={16} />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="flex items-center justify-center gap-2 bg-gray-500 text-white text-sm w-fit mx-auto">
            <Clock size={16} />
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>
          {allAppliedJobs.length <= 0 ? (
            <h1 className="text-red-500 text-center">
              NOTE: You haven’t applied to any job yet.
            </h1>
          ) : (
            <p>A list of your applied jobs</p>
          )}
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Company</TableHead>
            <TableHead className="text-left">Job Role</TableHead>
            <TableHead className="text-left">Date</TableHead>
            {/* ✅ Header also centered now */}
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs?.map((appliedJob, index) => (
            <TableRow key={index}>
              <TableCell>{appliedJob?.job?.company?.name}</TableCell>
              <TableCell>{appliedJob?.job?.title}</TableCell>
              <TableCell>
                {appliedJob?.job?.createdAt?.split("T")[0]}
              </TableCell>
              {/* ✅ Status aligned under Status heading */}
              <TableCell className="text-center">
                {getStatusBadge(appliedJob?.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
