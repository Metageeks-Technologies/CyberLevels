"use client";
import React, { useEffect } from "react";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/headers/header";
import JobDetailsV1Area from "@/app/components/job-details/job-details-v1-area";
import JobPortalIntro from "@/app/components/job-portal-intro/job-portal-intro";
import JobDetailsBreadcrumb from "@/app/components/jobs/breadcrumb/job-details-breadcrumb";
import RelatedJobs from "@/app/components/jobs/related-jobs";
import FooterOne from "@/layouts/footers/footer-one";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { usePathname } from "next/navigation";
import { getJobPostDetails } from "@/redux/features/jobPost/api";
import { useDispatch } from "react-redux";
import { getAllJobAppByCandidate } from "@/redux/features/jobApp/api";

const JobDetailsDynamicPage = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const { jobPost } = useAppSelector((state) => state.jobPost);
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);

  const { companyOfJobPost } = useAppSelector(
    (state) => state.company.companyList
  );
  const pathName = usePathname();
  useEffect(() => {
    getJobPostDetails(dispatch, params.id);
    console.log("from the job details", currUser);
    if (currUser) getAllJobAppByCandidate(dispatch, currUser);
  }, [params.id]);
  // console.log("for company", companyOfJobPost);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* job details breadcrumb start */}
        <JobDetailsBreadcrumb />
        {/* job details breadcrumb end */}

        {/* job details area start */}

        {jobPost && companyOfJobPost && (
          <JobDetailsV1Area
            job={jobPost}
            url={pathName}
            company={companyOfJobPost}
          />
        )}
        {/* job details area end */}

        {/* related job start */}
        {jobPost && <RelatedJobs category={[jobPost.jobCategory]} />}
        {/* related job end */}

        {/* job portal intro start */}
        <JobPortalIntro />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default JobDetailsDynamicPage;
