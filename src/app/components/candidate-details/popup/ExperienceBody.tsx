"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IEducation, IExperience } from "@/types/user-type";
import { notifyError, notifyInfo } from "@/utils/toast";
import { useEffect, useState } from "react";
import SelectMonth from "../../dashboard/candidate/select-month";
import SelectYear from "../../dashboard/candidate/select-year";
import {
  getCurrCandidate,
  updateEducation,
  updateExperience,
} from "@/redux/features/candidate/api";
import { setCurrDashEducation } from "@/redux/features/candidate/dashboardSlice";
// import { updateExistingEduSuccess } from "@/redux/features/candidate/dashboardSlice";

const EditExperienceBody = ({
  experienceProp,
}: {
  experienceProp: IExperience;
}) => {
  const dispatch = useAppDispatch();
  const { currCandidate, currDashExperience } = useAppSelector(
    (store) => store.candidate.candidateDashboard
  );
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  // const user = currCandidate;
  // useEffect(() => {
  //   // console.log(updatedexperienceProp);
  // }, [experienceProp]);

  // console.log(experienceProp._id);

  const [experience, setExperience] = useState({
    title: "",
    company: "",
    description: "",
  });
  // let start: string[] = [];
  // let end: string[] = [];
  const start = experienceProp?.startYear.split(" ");
  const end = experienceProp?.endYear.split(" ");
  const [startYear, setStartYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [endMonth, setEndMonth] = useState("");

  useEffect(() => {
    setExperience({
      title: experienceProp.title || "",
      company: experienceProp.company || "",
      description: experienceProp.description || "",
    });

    const start = experienceProp.startYear?.split(" ");
    const end = experienceProp.endYear?.split(" ");

    setStartYear(start[1] || "");
    setStartMonth(start[0] || "");
    setEndYear(end[1] || "");
    setEndMonth(end[0] || "");
    // console.log(startMonth, startYear, endYear, endMonth);
  }, [experienceProp]);
  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExperience({
      ...experience,
      [name]: value,
    });
  };

  const handleAddEducation = async () => {
    if (
      !experience.title ||
      !experience.description ||
      !experience.company ||
      !startYear ||
      startYear === "Start Year" ||
      !startMonth ||
      startMonth === "Start Month" ||
      !endYear ||
      endYear === "End Year" ||
      !endMonth ||
      endMonth === "End Month"
    ) {
      notifyInfo("Please complete fields marked with *");
      return;
    }
    if (!currCandidate) {
      notifyError("! unauthenticated user");
      return;
    }
    const bodyObj = {
      ...experience,
      startYear: startMonth + " " + startYear,
      endYear: endMonth + " " + endYear,
    };
    console.log("bodyObj", bodyObj);
    //  await addEducation(dispatch, user._id, bodyObj);
    if (currCandidate) {
      console.log(experienceProp, "Experience Prop");
      await updateExperience(
        dispatch,
        currCandidate?._id,
        currDashExperience,
        bodyObj
      );
    } else {
      console.log("error");
    }
    setExperience({
      title: "",
      company: "",
      description: "",
    });
    setStartYear("");
    setEndYear("");
    getCurrCandidate(dispatch,currUser as string);
  };
  console.log(startMonth, startYear, endYear, endMonth);

  return (
    <div className="accordion-body">
      <p>{experienceProp._id}</p>
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
              onChange={handleEducationChange}
              type="text"
              placeholder="SDE"
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
              onChange={handleEducationChange}
              type="text"
              placeholder="Amazon"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2">
          <div className="dash-input-wrapper mb-30 md-mb-10">
            <label htmlFor="">Start Date*</label>
          </div>
        </div>
        <div className="col-lg-10">
          <div className="row">
            <div className="col-sm-6">
              <SelectMonth
                default={{
                  value: start[0],
                  label: start[0],
                }}
                setMonth={setStartMonth}
                firstInput="Start Month"
              />
            </div>
            <div className="col-sm-6">
              <SelectYear
                default={{ value: start[1], label: start[1] }}
                setYear={setStartYear}
                firstInput="Start Year"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2">
          <div className="dash-input-wrapper mb-30 md-mb-10">
            <label htmlFor="">End Date*</label>
          </div>
        </div>
        <div className="col-lg-10">
          <div className="row">
            <div className="col-sm-6">
              <SelectMonth
                default={{ value: end[0], label: end[0] }}
                setMonth={setEndMonth}
                firstInput="End Month"
              />
            </div>
            <div className="col-sm-6">
              <SelectYear
                default={{ value: end[1], label: end[1] }}
                setYear={setEndYear}
                firstInput="End Year"
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
              value={experience.description}
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
        type="button"
        // className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
        className="dash-btn-two tran3s me-3 mb-15"
      >
        Save
      </button>
    </div>
  );
};

export default EditExperienceBody;
