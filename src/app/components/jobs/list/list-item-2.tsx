"use client";
import LoginModal from "@/app/components/common/popup/login-modal";
import job_img_1 from "@/assets/images/logo/media_22.png";
import { removeSavedJob, saveJob } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IJobPost } from "@/types/jobPost-type";
import Image from "next/image";
import Link from "next/link";

const ListItemTwo = ({ item }: { item: IJobPost }) => {
  const { savedJobsPage, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { isAuthenticated, currUser } = useAppSelector(
    (state) => state.persistedReducer.user
  );

  const dispatch = useAppDispatch();
  const isActive = item?.isSaved || false;
  const handleSaveJob = (jobPostId: string) => {
    if (!isActive) {
      saveJob(dispatch, {
        jobPostId,
        candidateId: currUser,
        page: savedJobsPage,
      });
    } else {
      removeSavedJob(dispatch, {
        jobPostId,
        candidateId: currUser,
        page: savedJobsPage,
      });
    }
  };

  const handleSubscribePopup = () => {};
  return (
    <>
      <div className="job-list-one style-two position-relative border-style mb-20">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-5">
            <div className="job-title d-flex align-items-center">
              <Link href={`/job-details-v1/${item._id}`} className="logo">
                <Image src={job_img_1} alt="logo" className="lazy-img m-auto" />
              </Link>
              <div className="split-box1">
                <Link
                  href={`/job-details-v1/${item._id}`}
                  className="job-duration fw-500"
                >
                  {item.jobType?.join(" ,")}
                </Link>
                <Link
                  href={`/job-details-v1/${item._id}`}
                  className="title fw-500 tran3s"
                >
                  {item.title?.slice(0, 22)}{" "}
                  {item.title?.length > 20 ? ".." : ""}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="job-location">
              <Link href={`/job-details-v1/${item._id}`}>{item.location}</Link>
            </div>
            <div className="job-salary">
              <span className="fw-500 text-dark">
                ${item.salary.minimum}-{item.salary.maximum} PA
              </span>{" "}
              /{item?.preferredExperience?.[0]}
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="btn-group d-flex align-items-center justify-content-sm-end xs-mt-20">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSaveJob(item._id)}
                className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${
                  isActive ? "active" : ""
                }`}
                title={`${isActive ? "Remove Job" : "Save Job"}`}
              >
                <i className="bi bi-bookmark-dash"></i>
              </button>
              {isAuthenticated ? (
                <Link
                  href={`/job-details-v1/${item._id}`}
                  // href={"/dashboard/candidate-dashboard/membership"}
                  className="apply-btn text-center tran3s"
                >
                  View
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

export default ListItemTwo;
