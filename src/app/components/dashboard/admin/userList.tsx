import React from "react";
import ShortSelect from "../../common/short-select";
import DashboardHeader from "../candidate/dashboard-header";
// import ActionDropdown from "./action-dropdown-sabJobs";
import CandidateList from "./user/candidates";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserList = ({ setIsOpenSidebar }: IProps) => {
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Saved Job</h2>
          <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <ShortSelect />
          </div>
        </div>

        <div className="wrapper">
          <CandidateList />
        </div>
      </div>
    </div>
  );
};

export default UserList;
