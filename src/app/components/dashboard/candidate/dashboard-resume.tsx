"use client";
import instance from "@/lib/axios";
import {
  requestFailDash,
  requestStartDash,
  updateEduSuccess,
  updateExpSuccess,
} from "@/redux/features/candidate/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { AxiosError } from "axios";
import React, { useState } from "react";
import Education from "./resume/Education";
import WorkExperience from "../../candidate-details/work-experience";
import DashboardHeader from "./dashboard-header";
import SelectYear from "./select-year";
import DropZone from "@/layouts/dropZone";
import { deleteResume, uploadResume } from "@/redux/features/candidate/api";
import { setFile, setUploadProgress } from "@/redux/features/globalSlice";
import SelectMonth from "./select-month";
import icon_3 from "@/assets/images/icon/icon_10.svg";
import Image from "next/image";
import UploadResume from "./resume/uploadResume";
import Skills from "./resume/Skills";
import Certificate from "./resume/Certification";
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardResume = ({ setIsOpenSidebar }: IProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const { currCandidate, loading } = useAppSelector(
    (store: RootState) => store.candidate.candidateDashboard
  );
  const user = currCandidate;
  const dispatch = useAppDispatch();
  const [education, setEducation] = useState({
    degree: "",
    institute: "",
    description: "",
  });
  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEducation({
      ...education,
      [name]: value,
    });
  };

  const [experience, setExperience] = useState({
    title: "",
    company: "",
    description: "",
  });

  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExperience({
      ...experience,
      [name]: value,
    });
  };
  const [startYear, setStartYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const handleAddEducation = async () => {
    const bodyObj = {
      ...education,
      startYear,
      endYear,
    };
    // console.log(bodyObj);
    // return;

    dispatch(requestStartDash());
    try {
      const { data } = await instance.patch(
        `/candidate/updateEdu/${user?._id}`,
        bodyObj
      );
      console.log(data);
      dispatch(updateEduSuccess(bodyObj));
    } catch (error) {
      const e = error as AxiosError;
      dispatch(requestFailDash(e.message));
    }
    setEducation({
      degree: "",
      institute: "",
      description: "",
    });
    setStartYear("");
    setEndYear("");
  };
  const handleAddExperience = async () => {
    const bodyObj = {
      ...experience,
      startYear,
      endYear,
    };
    dispatch(requestStartDash());
    try {
      const { data } = await instance.patch(
        `/candidate/updateExp/${user?._id}`,
        bodyObj
      );
      console.log(data);
      dispatch(updateExpSuccess(bodyObj));
    } catch (error) {
      const e = error as AxiosError;
      dispatch(requestFailDash(e.message));
    }
    setExperience({
      title: "",
      company: "",
      description: "",
    });
    setStartYear("");
    setEndYear("");
  };

  return (
    <>
      <div className="dashboard-body">
        <div className="position-relative candidates-profile-details">
          {/* header start */}
          <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
          {/* header end */}

          <UploadResume />

          <div className="bg-white card-box border-20 mt-40">
            {
              <>
                <h4 className="dash-title-three">Education && Experience</h4>
                {/* education */}
                <Education />
              </>
            }
            {/* experience */}
            <div>
              {user?.experience.length !== 0 && (
                <div className="inner-card border-style mb-25 lg-mb-20">
                  <h3 className="title">Work Experience</h3>
                  {/* WorkExperience */}
                  <WorkExperience experience={user?.experience} />
                  {/* WorkExperience */}
                </div>
              )}
              <div className="accordion dash-accordion-one" id="accordionTwo">
                <div className="accordion-item">
                  <div className="accordion-header" id="headingOneA">
                    <button
                      className="accordion-button  collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOneA"
                      aria-expanded="false"
                      aria-controls="collapseOneA"
                    >
                      Add Experience{" "}
                      <span className="fw-bold fs-5 mt-1  ">
                        <i className="bi bi-plus"></i>
                      </span>
                    </button>
                  </div>
                  <div
                    id="collapseOneA"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOneA"
                    data-bs-parent="#accordionTwo"
                  >
                    <div className="accordion-body">
                      <div className="row">
                        <div className="col-lg-2">
                          <div className="dash-input-wrapper mb-30 md-mb-10">
                            <label htmlFor="title">Title*</label>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="dash-input-wrapper mb-30">
                            <input
                              name="title"
                              value={experience.title}
                              onChange={handleExperienceChange}
                              type="text"
                              placeholder="Lead Security Manager "
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2">
                          <div className="dash-input-wrapper mb-30 md-mb-10">
                            <label htmlFor="company">Company*</label>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="dash-input-wrapper mb-30">
                            <input
                              name="company"
                              value={experience.company}
                              onChange={handleExperienceChange}
                              type="text"
                              placeholder="Amazon Inc"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2">
                          <div className="dash-input-wrapper mb-30 md-mb-10">
                            <label htmlFor="">Duration*</label>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="row">
                            <div className="col-sm-3">
                              <SelectYear
                                setYear={setStartYear}
                                firstInput="Start Year"
                              />
                            </div>
                            <div className="col-sm-3">
                              <SelectMonth
                                setMonth={setStartMonth}
                                firstInput="Start Month"
                              />
                            </div>
                            <div className="col-sm-3">
                              <SelectYear
                                setYear={setStartYear}
                                firstInput="End4 Year"
                              />
                            </div>
                            <div className="col-sm-3">
                              <SelectMonth
                                setMonth={setEndMonth}
                                firstInput="End Month"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="row"></div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2">
                          <div className="dash-input-wrapper mb-30 md-mb-10">
                            <label htmlFor="description">Description*</label>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="dash-input-wrapper mb-30">
                            <textarea
                              value={experience.description}
                              name="description"
                              onChange={handleExperienceChange}
                              className="size-lg"
                              placeholder="Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam et pulvinar tortor luctus."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleAddExperience}
                        className="dash-btn-two tran3s me-3 mb-15"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <a href="#" className="dash-btn-one">
              <i className="bi bi-plus"></i> Add more
            </a> */}
          </div>

          <div className="bg-white card-box border-20 mt-40">
            {user && <Certificate />}
          </div>
          
          <div className="bg-white card-box border-20 mt-40">
            {user && <Skills skills={user.skills} />}
          </div>

          {/* <DashboardPortfolio /> */}

          {/* <div className="button-group d-inline-flex align-items-center mt-30">
            <a href="#" className="dash-btn-two tran3s me-3">
              Save
            </a>
            <a href="#" className="dash-cancel-btn tran3s">
              Cancel
            </a>
          </div> */}
        </div>
      </div>

      {/* video modal start */}
      {/* <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"-6ZbrfSRWKc"}
      /> */}
      {/* video modal end */}
    </>
  );
};

export default DashboardResume;
