"use client";
import job_img_1 from "@/assets/images/logo/media_22.png";
import { removeSavedJob, saveJob } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import type { IJobPost } from "@/types/jobPost-type";
import Image from "next/image";
import Link from "next/link";
import LoginModal from "../../common/popup/login-modal";

const JobGridItem = ({
  item,
  style_2 = true,
}: {
  item: IJobPost;
  style_2?: boolean;
}) => {
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
      <div
        className={`job-list-two ${
          style_2 ? "style-two" : ""
        } position-relative`}
      >
        <Link href={`/job-details-v1/${item._id}`} className="logo">
          <Image
            src={job_img_1}
            alt="logo"
            style={{ height: "auto", width: "auto" }}
            className="lazy-img m-auto"
          />
        </Link>
        <button
          type="button"
          disabled={loading}
          onClick={() => handleSaveJob(item._id)}
          className={`save-btn text-center rounded-circle tran3s cursor-pointer ${
            isActive ? "active" : ""
          }`}
          title={`${isActive ? "Remove Job" : "Save Job"}`}
        >
          <i className="bi bi-bookmark-dash"></i>
        </button>
        <div className="d-flex gap-2 mt-40 mb-40  flex-wrap ">
          {item?.jobType?.map((val, index) => (
            <Link
              href={`/job-details-v1/${item._id}`}
              className={`job-duration fw-500 ${
                val == "part-time" ? "part-time" : ""
              }`}
            >
              {val}
            </Link>
          ))}
        </div>
        <div>
          <Link
            href={`/job-details-v1/${item._id}`}
            className="title fw-500 tran3s"
          >
            {item.title}
          </Link>
        </div>
        <div className="job-salary">
          <span className="fw-500 text-dark">
            ${`${item.salary.minimum}-${item.salary.maximum}`} PA
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-auto">
          <div className="job-location">
            <Link href={`/job-details-v1/${item._id}`}>{item.location}</Link>
          </div>
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
      {/* login modal start */}
      <LoginModal />
      {/* login modal end */}
    </>
  );
};

export default JobGridItem;
