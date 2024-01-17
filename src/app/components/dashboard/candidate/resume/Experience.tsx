"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useEffect, useState } from "react";
import SelectMonth from "../select-month";
import SelectYear from "../select-year";
import { addExperience } from "@/redux/features/candidate/api";
import WorkExperience from "@/app/components/candidate-details/work-experience";
import { notifyInfo } from "@/utils/toast";
import EditExperience from "@/app/components/candidate-details/popup/EditExperience";
import { checkValidDateTimeLine, checkValidDescription } from "@/utils/helper";
const Experience = () => {
  const dispatch = useAppDispatch();
  const { currCandidate, loading } = useAppSelector(
    (store) => store.candidate.candidateDashboard
  );
  const user = currCandidate;
  const [experience, setExperience] = useState({
    title: "",
    company: "",
    description: "",
  });
  const [startYear, setStartYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [checkValidDate, setCheckValidDate] = useState(true);
  const [allFieldsCheck, setAllFieldsCheck] = useState(false);
  const [validDescription, setValidDescription] = useState(true);
  useEffect(() => {
    if (
      startYear &&
      endYear &&
      startMonth &&
      endMonth &&
      startYear !== "Start Year" &&
      startMonth !== "Start Month" &&
      endYear !== "End Year" &&
      endMonth !== "End Month" &&
      experience.title &&
      experience.company &&
      experience.description
    ) {
      setAllFieldsCheck(true);
    } else {
      setAllFieldsCheck(false);
    }
  }, [
    startYear,
    endYear,
    startMonth,
    endMonth,
    experience.title,
    experience.company,
    experience.description,
  ]);

  useEffect(() => {
    if (
      checkValidDescription(experience.description,50) ||
      experience.description.trim().length === 0
    ) {
      setValidDescription(true);
    } else {
      setValidDescription(false);
    }
  }, [experience.description]);
  useEffect(() => {
    if (
      !startMonth ||
      !startYear ||
      !endMonth ||
      !endYear ||
      (startYear === "Start Year" &&
        startMonth === "Start Month" &&
        endYear === "End Year" &&
        endMonth === "End Month") ||
      checkValidDateTimeLine(
        startMonth + " " + startYear,
        endMonth + " " + endYear
      )
    ) {
      setCheckValidDate(true);
    } else {
      setCheckValidDate(false);
    }
  }, [startYear, startMonth, endMonth, endYear]);
  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExperience({
      ...experience,
      [name]: value,
    });
  };

  const handleAddExperience = async () => {
    if (
      !experience.title ||
      !experience.company ||
      !experience.description ||
      !startYear ||
      startYear === "Start Year" ||
      !startMonth ||
      startMonth === "Start Month" ||
      !endYear ||
      endYear === "End Year" ||
      !endMonth ||
      endMonth === "End Month"
    ) {
      notifyInfo("Please Complete fields marked with *");
      return;
    }
    if (!validDescription) {
      notifyInfo("please complete description");
      return;
    }
    const bodyObj = {
      ...experience,
      startYear: startMonth + " " + startYear,
      endYear: endMonth + " " + endYear,
    };
    if (!checkValidDate) {
      notifyInfo("Start date cannot be greater than end date");
      return;
    }

    await addExperience(dispatch, user?._id || "", bodyObj);
    setExperience({
      title: "",
      company: "",
      description: "",
    });
    setStartYear("");
    setEndYear("");
    setStartMonth("");
    setEndMonth("");
  };

  return (
    <>
      <div className="bg-white card-box border-20 mt-40">
        <div>
          {user?.experience.length !== 0 && (
            <div className="inner-card border-style mb-25 lg-mb-20">
              <h3 className="title">Work Experience</h3>

              <WorkExperience />
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
                            default={{ value: startYear, label: startYear }}
                            setYear={setStartYear}
                            firstInput="Start Year"
                            placeholder="Start Year"
                          />
                        </div>
                        <div className="col-sm-3">
                          <SelectMonth
                            default={{ value: startMonth, label: startMonth }}
                            setMonth={setStartMonth}
                            firstInput="Start Month"
                            placeholder="Start Month"
                          />
                        </div>
                        <div className="col-sm-3">
                          <SelectYear
                            default={{ value: endYear, label: endYear }}
                            setYear={setEndYear}
                            firstInput="End Year"
                            placeholder="End Year"
                          />
                        </div>
                        <div className="col-sm-3">
                          <SelectMonth
                            default={{ value: endMonth, label: endMonth }}
                            setMonth={setEndMonth}
                            firstInput="End Month"
                            placeholder="End Month"
                          />
                        </div>
                        {!checkValidDate && (
                          <p style={{ color: "red" }}>
                            Start date cannot be greater that end date
                          </p>
                        )}
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
                      {!validDescription && (
                        <p style={{ color: "red" }}>
                          description must include{" "}
                          {experience.description.trim().length}/50
                        </p>
                      )}
                    </div>
                  </div>
                  {allFieldsCheck && checkValidDate && validDescription ? (
                    <button
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOneA"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                      onClick={handleAddExperience}
                      className="dash-btn-two tran3s me-3 mb-15"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="button"
                      // data-bs-toggle="collapse"
                      // data-bs-target="#collapseOneA"
                      // aria-expanded="false"
                      // aria-controls="collapseOne"
                      onClick={handleAddExperience}
                      className="dash-btn-two tran3s me-3 mb-15"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {<EditExperience />}
    </>
  );
};

export default Experience;
