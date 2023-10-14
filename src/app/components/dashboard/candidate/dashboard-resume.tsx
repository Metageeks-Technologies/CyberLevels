"use client";
import React, { useState } from "react";
import video_bg from "@/assets/dashboard/images/video_post.jpg";
import DashboardHeader from "./dashboard-header";
import DashboardPortfolio from "./dashboard-portfolio";
import SelectYear from "./select-year";
import VideoPopup from "../../common/video-popup";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Education from "../../candidate-details/Education";
import WorkExperience from "../../candidate-details/work-experience";
import {
  updateEduSuccess,
  updateExpSuccess,
  requestStart,
  requestFail,
} from "@/redux/features/userSlice";
import axios, { AxiosError } from "axios";
import { ICandidate } from "@/data/candidate-data";
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardResume = ({ setIsOpenSidebar }: IProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const { user: candidate, loading } = useSelector(
    (store: RootState) => store.persistedReducer.user
  );
  const user = candidate;
  const dispatch = useDispatch();
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
  const [endYear, setEndYear] = useState("");
  const handleAddEducation = async () => {
    const bodyObj = {
      ...education,
      startYear,
      endYear,
    };
    // console.log(bodyObj);
    // return;

    dispatch(requestStart());
    try {
      const { data } = await axios.patch(
        `http://localhost:8000/api/v1/candidate/updateEdu/${user?._id}`,
        bodyObj
      );
      console.log(data);
      dispatch(updateEduSuccess(bodyObj));
    } catch (error) {
      const e = error as AxiosError;
      dispatch(requestFail(e.message));
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
    dispatch(requestStart());
    try {
      const { data } = await axios.patch(
        `http://localhost:8000/api/v1/candidate/updateExp/${user?._id}`,
        bodyObj
      );
      console.log(data);
      dispatch(updateExpSuccess(bodyObj));
    } catch (error) {
      const e = error as AxiosError;
      dispatch(requestFail(e.message));
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

          <h2 className="main-title">My Resume</h2>

          <div className="bg-white card-box border-20">
            <h4 className="dash-title-three">Resume Attachment</h4>
            <div className="dash-input-wrapper mb-20">
              <label htmlFor="">CV Attachment*</label>

              <div className="attached-file d-flex align-items-center justify-content-between mb-15">
                <span>MyCvResume.PDF</span>
                <a href="#" className="remove-btn">
                  <i className="bi bi-x"></i>
                </a>
              </div>
              <div className="attached-file d-flex align-items-center justify-content-between">
                <span>CandidateCV02.PDF</span>
                <a href="#" className="remove-btn">
                  <i className="bi bi-x"></i>
                </a>
              </div>
            </div>

            <div className="dash-btn-one d-inline-block position-relative me-3">
              <i className="bi bi-plus"></i>
              Upload CV
              <input type="file" id="uploadCV" name="uploadCV" placeholder="" />
            </div>
            <small>Upload file .pdf, .doc, .docx</small>
          </div>

          {/* <div className="bg-white card-box border-20 mt-40">
            <h4 className="dash-title-three">Intro</h4>
          <div className="dash-input-wrapper mb-35 md-mb-20">
            <label htmlFor="">Overview*</label>
            <textarea className="size-lg" placeholder="Write something interesting about you...."></textarea>
            <div className="alert-text">Brief description for your resume. URLs are hyperlinked.</div>
          </div>

          <div className="row">
              <div className="col-sm-6 d-flex">
                <div
                  className="intro-video-post position-relative mt-20"
                  style={{ backgroundImage: `url(${video_bg.src})` }}
                >
                  <a
                    className="fancybox rounded-circle video-icon tran3s text-center"
                    onClick={() => setIsVideoOpen(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-play"></i>
                  </a>
                  <a href="#" className="close">
                    <i className="bi bi-x"></i>
                  </a>
                </div>
              </div>
              <div className="col-sm-6 d-flex">
                <div className="intro-video-post position-relative empty mt-20">
                  <span>+ Add Intro Video</span>
                  <input
                    type="file"
                    id="uploadVdo"
                    name="uploadVdo"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div> */}

          <div className="bg-white card-box border-20 mt-40">
            <h4 className="dash-title-three">Education && Experience</h4>
            {/* education */}
            <div className="mt-50 mb-75 lg-mb-50 ">
              <div className="inner-card border-style mb-25 lg-mb-20">
                <h3 className="title">Education</h3>
                <Education education={user?.education} />
              </div>
              <div className="accordion dash-accordion-one" id="accordionOne">
                <div className="accordion-item">
                  <div className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Add Education
                    </button>
                  </div>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionOne"
                  >
                    <div className="accordion-body">
                      <div className="row">
                        <div className="col-lg-2">
                          <div className="dash-input-wrapper mb-30 md-mb-10">
                            <label htmlFor="degree">Degree*</label>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="dash-input-wrapper mb-30">
                            <input
                              name="degree"
                              value={education.degree}
                              onChange={handleEducationChange}
                              type="text"
                              placeholder="Bachelor's"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2">
                          <div className="dash-input-wrapper mb-30 md-mb-10">
                            <label htmlFor="institute">Institute*</label>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="dash-input-wrapper mb-30">
                            <input
                              name="institute"
                              value={education.institute}
                              onChange={handleEducationChange}
                              type="text"
                              placeholder="Oxford"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2">
                          <div className="dash-input-wrapper mb-30 md-mb-10">
                            <label htmlFor="">Year*</label>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="row">
                            <div className="col-sm-6">
                              <SelectYear
                                setYear={setStartYear}
                                firstInput="Start"
                              />
                            </div>
                            <div className="col-sm-6">
                              <SelectYear
                                setYear={setEndYear}
                                firstInput="End"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-2">
                          <div className="dash-input-wrapper mb-15 md-mb-7">
                            <label htmlFor="description">Description*</label>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="dash-input-wrapper mb-30">
                            <textarea
                              value={education.description}
                              name="description"
                              onChange={handleEducationChange}
                              className="size-lg"
                              placeholder="Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam et pulvinar tortor luctus."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleAddEducation}
                        className="dash-btn-two tran3s me-3 mb-15"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* experience */}
            <div>
              <div className="inner-card border-style mb-25 lg-mb-20">
                <h3 className="title">Work Experience</h3>
                {/* WorkExperience */}
                <WorkExperience experience={user?.experience} />
                {/* WorkExperience */}
              </div>
              <div className="accordion dash-accordion-one" id="accordionTwo">
                <div className="accordion-item">
                  <div className="accordion-header" id="headingOneA">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOneA"
                      aria-expanded="false"
                      aria-controls="collapseOneA"
                    >
                      Add Experience
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
                            <label htmlFor="">Year*</label>
                          </div>
                        </div>
                        <div className="col-lg-10">
                          <div className="row">
                            <div className="col-sm-6">
                              <SelectYear
                                setYear={setStartYear}
                                firstInput="Start"
                              />
                            </div>
                            <div className="col-sm-6">
                              <SelectYear
                                setYear={setEndYear}
                                firstInput="End"
                              />
                            </div>
                          </div>
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
            <h4 className="dash-title-three">Skills</h4>
            <div className="dash-input-wrapper mb-40">
              {/* <label htmlFor="">Add Skills*</label> */}

              <div className="skills-wrapper">
                <ul className="style-none d-flex flex-wrap align-items-center">
                  {user?.skills.map((val, index) => (
                    <li key={index} className="is_tag">
                      <button>
                        {val} <i className="bi bi-x"></i>
                      </button>
                    </li>
                  ))}

                  <li className="more_tag">
                    <button>+</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <DashboardPortfolio />

          <div className="button-group d-inline-flex align-items-center mt-30">
            <a href="#" className="dash-btn-two tran3s me-3">
              Save
            </a>
            <a href="#" className="dash-cancel-btn tran3s">
              Cancel
            </a>
          </div>
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
