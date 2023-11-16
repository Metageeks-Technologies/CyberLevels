"use client";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import DropZone from "@/layouts/dropZone";
import { updateAvatar } from "@/redux/features/candidate/api";
import { setFile, setUploadProgress } from "@/redux/features/globalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ICandidate } from "@/types/user-type";
import { notifyError } from "@/utils/toast";
import Image from "next/image";
import avatar from "@/assets/dashboard/images/avatar_04.jpg";
import React, { useState } from "react";
import DashboardHeader from "./dashboard-header";
import Location from "./profile/Location";
import Social from "./profile/OnTheWeb";
import Profile from "./profile/Profile";
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const { currCandidate, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();
  const user = currCandidate as ICandidate;

  const { file } = useAppSelector((s) => s.global);

  const handleProfilePhoto = async () => {
    if (!user) {
      notifyError("please Login to upload your resume.");
      notifyError;
      return;
    }

    const supportedFormat = ["image/jpeg", "image/png"];
    if (!file || !supportedFormat.includes(file?.type) || file.size > 1048576) {
      notifyError("Please upload Profile Photo in supported format.");
      dispatch(setFile(null));
      return;
    }

    const nameArr = file.name.split(".");
    const extension = nameArr[nameArr.length - 1];
    const metaData = {
      extension: extension,
      type: file.type,
      userId: user._id,
      folder: user.role,
    };
    await updateAvatar(dispatch, file, metaData);

    dispatch(setFile(null));
    dispatch(setUploadProgress(0));
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        {/* Profile start */}
        <h2 className="main-title">My Profile</h2>
        <div className="bg-white card-box border-20 ">
          <div className="d-flex justify-content-between ">
            <div className="user-avatar-setting d-flex align-items-center mb-30">
              <img
                width={50}
                height={50}
                src={user.avatar}
                // src={
                //   user?.avatar !== "none" || false
                //     ? (user?.avatar as string)
                //     : avatar
                // }
                alt="avatar"
                className="lazy-img user-img"
              />
              {!file && (
                <div className=" upload-btn position-relative tran3s ms-4 me-3">
                  <DropZone
                    text={
                      user.avatar
                        ? "Update profile photo"
                        : "Upload profile photo"
                    }
                  />
                </div>
              )}
              {file && (
                <>
                  <div className="d-flex flex-column justify-content-center   ">
                    <button
                      onClick={handleProfilePhoto}
                      className="upload-btn position-relative tran3s ms-4 me-3"
                    >
                      {"Save"}
                    </button>
                    <div className="ms-4 mt-1 ">
                      <small>
                        Upload square image in .png, .jpeg, max 1mb sized
                      </small>
                    </div>
                  </div>
                  <p className="dash-title-three">{file?.name}</p>
                </>
              )}
            </div>
            <div>
              <button
                data-bs-toggle="modal"
                data-bs-target="#profileModal"
                type="button"
                className="apply-btn text-center tran3s"
              >
                <Image
                  height={24}
                  width={24}
                  src={icon_3}
                  title="Edit Profile"
                  alt="edit"
                />
              </button>
            </div>
          </div>
          <Profile />
        </div>
        {/* Profile end */}

        {/* Skills start */}
        <div className="bg-white card-box border-20 mt-40">
          <div className=" d-flex justify-content-between ">
            <h4 className="dash-title-three">On the web</h4>
            <button
              data-bs-toggle="modal"
              data-bs-target="#socialModal"
              type="button"
              className="apply-btn text-center tran3s"
            >
              <Image
                height={24}
                width={24}
                src={icon_3}
                title="Edit Social"
                alt="Edit Social"
              />
            </button>
          </div>
          <Social />
          {/* {[...user?.socialSites, ...social].map((val, index) => (
            <div key={val} className="dash-input-wrapper mb-20">
              <label htmlFor="">Network {index + 1}</label>
              <input type="text" readOnly value={val} />
            </div>
          ))} */}

          {/* {isAddingSocialLink && (
            <div className="dash-input-wrapper mb-20">
              <label htmlFor="SocialInput">
                Network {user?.socialSites.length + social.length + 1}
              </label>
              <input
                name="SocialInput"
                value={SocialInput}
                onChange={(e) => setSocialInput(e.target.value)}
                onBlur={addToSocial}
                type="text"
                placeholder="#"
              />
            </div>
          )} */}

          {/* <button onClick={() => setSocialLink(true)} className="dash-btn-one">
            <i className="bi bi-plus"></i> Add more link
          </button> */}
        </div>
        {/* Skills end */}

        {/*location start */}
        <Location />
        {/*location end */}
      </div>
    </div>
  );
};

export default DashboardProfileArea;
