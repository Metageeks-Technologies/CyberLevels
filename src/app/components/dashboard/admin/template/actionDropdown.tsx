import React from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import Link from "next/link";


const ActionDropdown = () => {
//   const { savedJobsPage, loading } = useAppSelector(
//     (state) => state.candidate.candidateDashboard
//   );
//   const { currUser } = useAppSelector((state) => state.persistedReducer.user);
//   const dispatch = useAppDispatch();
//   const handleDelete = () => {
//     removeSavedJob(dispatch, {
//       jobPostId: id,
//       candidateId: currUser,
//       page: savedJobsPage,
//     });
//   };
  
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <button className="dropdown-item" >
          <Image src={view} alt="icon" className="lazy-img" /> Signup
        </button>
      </li>
      {/* <li>
        <a className="dropdown-item" href="#">
          <Image src={share} alt="icon" className="lazy-img" /> Chat
        </a>
      </li> */}
      <li>
        <button className="dropdown-item"  >
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Login
        </button>
      </li>
      <li>
        <button className="dropdown-item" >
          <Image src={view} alt="icon" className="lazy-img" /> Payment Success
        </button>
      </li>
    </ul>
  );
};

export default ActionDropdown;
