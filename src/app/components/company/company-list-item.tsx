import React from "react";
import Image from "next/image";
import Link from "next/link";
import team_img_1 from "@/assets/images/assets/img_42.png";
import {
  removeSavedCompany,
  saveCompany,
} from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ICompany } from "@/types/company";
import LoginModal from "../common/popup/login-modal";
// item.isFav;

const CompanyListItem = ({ item }: { item: ICompany }) => {
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
    <>
      <div
        className={`company-list-layout ${isActive ? "favourite" : ""} mb-20`}
      >
        <div className="row justify-content-between align-items-center">
          <div className="col-xl-5">
            <div className="d-flex align-items-xl-center">
              <Link
                href={`/company-details/${item._id}`}
                className="company-logo rounded-circle"
              >
                <Image
                  // src={item.logo}
                  src={team_img_1}
                  alt="image"
                  className="lazy-img rounded-circle"
                />
              </Link>
              <div className="company-data">
                <h5 className="m0">
                  <Link
                    href={`/company-details/${item._id}`}
                    className="company-name tran3s"
                  >
                    {item.name}
                  </Link>
                </h5>
                <p>
                  {item.location[0].city} {item.location[0].country}
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-8">
            <div className="d-flex align-items-center ps-xxl-5 lg-mt-20">
              {/* <div className="d-flex align-items-center">
              <Image
                src={team_img_1}
                alt="team_img"
                className="lazy-img rounded-circle team-img"
              />
              <Image
                src={team_img_2}
                alt="team_img"
                className="lazy-img rounded-circle team-img"
              />
              <Image
                src={team_img_3}
                alt="team_img"
                className="lazy-img rounded-circle team-img"
              />
              <div className="team-text">
                <span className="text-md fw-500 text-dark d-block">14+ </span>{" "}
                Team Size
              </div>
            </div> */}
            </div>
          </div>
          <div className="col-xl-3 col-md-4">
            <div className="btn-group d-flex align-items-center justify-content-md-end lg-mt-20">
              {isAuthenticated ? (
                <Link
                  href={`/company-details/${item._id}`}
                  className="open-job-btn text-center fw-500 tran3s me-2"
                >
                  {/* {item.vacancy} open job */}
                  {item.benefits.length} open job
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

              <button
                type="button"
                disabled={loading}
                onClick={() => handleSaveCompany(item._id)}
                className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${
                  isActive ? "active" : ""
                }`}
                title={`${isActive ? "Remove Company" : "Save Company"}`}
              >
                <i className="bi bi-bookmark-dash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* login modal start */}
      <LoginModal />

      {/* login modal end */}
    </>
  );
};

export default CompanyListItem;
