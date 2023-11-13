import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ICompany } from "@/types/company";
import {
  removeSavedCompany,
  saveCompany,
} from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import team_img_1 from "@/assets/images/assets/img_42.png";
// item.isFav

const CompanyGridItem = ({ item }: { item: ICompany }) => {
  const { savedCompanyPage, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { isAuthenticated, currUser } = useAppSelector(
    (state) => state.persistedReducer.user
  );

  const dispatch = useAppDispatch();
  const isActive = item?.isSaved || false;
  const handleSaveCompany = (companyId: string) => {
    if (!isActive) {
      saveCompany(dispatch, {
        companyId,
        candidateId: currUser,
        page: savedCompanyPage,
      });
    } else {
      removeSavedCompany(dispatch, {
        companyId,
        candidateId: currUser,
        page: savedCompanyPage,
      });
    }
  };
  const handleSubscribePopup = () => {};
  return (
    <div className={`company-grid-layout ${isActive ? "favourite" : ""} mb-30`}>
      <Link
        href="/company-details"
        className="company-logo me-auto ms-auto rounded-circle"
      >
        <Image
          src={team_img_1}
          alt="image"
          className="lazy-img rounded-circle"
        />
      </Link>
      <h5 className="text-center">
        <Link href="/company-details" className="company-name tran3s">
          {item.name}
        </Link>
      </h5>
      <p className="text-center mb-auto">
        {item.location?.[0]?.city}, {item.location?.[0]?.country}
      </p>
      <div className="bottom-line d-flex">
        {/* <Link href="/company-details">{item.benefits.length} Vacancy</Link> */}
        {isAuthenticated ? (
          <Link
            href={`/company-details/${item._id}`}
            className="open-job-btn text-center fw-500 tran3s me-2"
          >
            {/* {item.vacancy} open job */}
            {item.jobOpenings} open job
          </Link>
        ) : (
          <button
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
            type="button"
            className="apply-btn text-center tran3s"
            onClick={handleSubscribePopup}
          >
            View
          </button>
        )}
        {/* <Link href="/company-details">
          <i className="bi bi-bookmark-dash"></i> Save
        </Link> */}
        <button
          type="button"
          // disabled={loading}
          onClick={() => handleSaveCompany(item._id)}
          className={` cursor-pointer ${isActive ? "active" : ""}`}
          title={`${isActive ? "Remove Company" : "Save Company"}`}
        >
          <i className="bi bi-bookmark-dash"></i>
        </button>
      </div>
    </div>
  );
};

export default CompanyGridItem;
