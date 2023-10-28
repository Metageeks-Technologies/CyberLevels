"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "@/layouts/wrapper";
import EmployAside from "@/app/components/dashboard/employ/aside";
import EmployJobDetailsArea from "@/app/components/dashboard/employ/job-details-area";
import { getallJobAppByJobPostWithCandidate } from "@/redux/features/jobApp/api";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";

const EmployDashboardJobsPage = ({ params }: { params: { id: string } }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { allJobAppByJobPostWithCandidate, loading } = useAppSelector(
    (state) => state.jobApplication
  );

  useEffect(() => {
    getallJobAppByJobPostWithCandidate(dispatch, params.id);
  }, []);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <EmployAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {/* aside end  */}

        {/* job Details area start */}
        {allJobAppByJobPostWithCandidate && (
          <EmployJobDetailsArea
            setIsOpenSidebar={setIsOpenSidebar}
            jobApp={allJobAppByJobPostWithCandidate}
          />
        )}

        {/* <div>hello</div> */}
        {/* job Details area end */}
      </div>
    </Wrapper>
  );
};

export default EmployDashboardJobsPage;
