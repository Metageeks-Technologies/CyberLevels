"use client";
import React, { useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import EmployExperience from "./employ-experience";
import NiceSelect from "@/ui/nice-select";
import AutocompletePosition from "@/ui/autoCompletePosistion";
import AutocompleteSkill from "@/ui/autoCompleteSkill";
import Upload from "@/ui/upload";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  submitJobPostFail,
  submitJobPostStart,
  submitJobPostSuccess,
} from "@/redux/features/jobPostSlice";
import axios, { AxiosError } from "axios";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
interface IFileAttachment {
  type: Buffer;
  contentType: String;
}

const SubmitJobArea = ({ setIsOpenSidebar }: IProps) => {
  const handleJobType = (item: { value: string; label: string }) => {
    setJobType(item.value);
  };
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.jobPost);

  const [title, setTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [expLocation, setExpLocation] = useState({
    experience: "",
    location: "",
  });
  const [salary, setSalary] = useState({
    minimum: "",
    maximum: "",
    isDisclosed: true,
  });

  const [fileAttachment, setFileAttachment] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);

  const handleSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalary({
      ...salary,
      [name]: value,
    });
  };
  // console.log(skills);

  const handleSubmit = async () => {
    const bodyObj = {
      title: title,
      location: expLocation.location,
      jobType: jobType,
      jobCategory: jobCategory,
      skillsRequired: skills,
      salary: salary,
      preferredExperience: expLocation.experience,
    };

    dispatch(submitJobPostStart());
    const formData = new FormData();
    formData.append("fileAttachment", fileAttachment as File);
    formData.append("bodyObj", JSON.stringify(bodyObj));
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/jobPost/add",
        formData
      );
      dispatch(submitJobPostSuccess(data.job));
    } catch (error) {
      console.log(error);
      const e = error as AxiosError;
      dispatch(submitJobPostFail(e.message));
    }
    console.log(bodyObj);
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Post a New Job</h2>

        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">Job Details</h4>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Title*</label>
            {/* <input type="text" placeholder="Ex: Product Designer" /> */}
            <AutocompletePosition
              selected={title}
              setSelected={setTitle}
              endPoint="jobTitle"
            />
          </div>

          <div className="row align-items-end">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Job Category</label>
                <AutocompletePosition
                  selected={jobCategory}
                  setSelected={setJobCategory}
                  endPoint="jobCategory"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Job Type</label>
                <NiceSelect
                  options={[
                    { value: "Full time", label: "Full time" },
                    { value: "Part time", label: "Part time" },
                    { value: "Hourly-Contract", label: "Hourly-Contract" },
                    { value: "Fixed-Price", label: "Fixed-Price" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => handleJobType(item)}
                  name="Job Type"
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="salary">Salary*</label>
                <input
                  type="text"
                  name="minimum"
                  value={salary.minimum}
                  onChange={handleSalary}
                  placeholder="Min (LPA)"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <input
                  type="text"
                  name="maximum"
                  value={salary.maximum}
                  onChange={handleSalary}
                  placeholder="Max (LPA)"
                />
              </div>
            </div>
          </div>

          <h4 className="dash-title-three pt-50 lg-pt-30">
            Skills & Experience
          </h4>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Skills*</label>
            <AutocompleteSkill skills={skills} setSkills={setSkills} />
            {/* <input type="text" placeholder="Add Skills" /> */}
            <div className="skill-input-data d-flex align-items-center flex-wrap">
              {skills.map((value) => (
                <button key={value}>{value}</button>
              ))}
            </div>
          </div>

          {/* employ experience start */}
          <EmployExperience
            selected={expLocation}
            setSelected={setExpLocation}
          />
          {/* employ experience end */}
          <h4 className="dash-title-three pt-50 lg-pt-30">File Attachment</h4>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">File Attachment*</label>
            <div className="attached-file d-flex align-items-center justify-content-between mb-15">
              <span>guidline&requirments.doc</span>
              <a href="#" className="remove-btn">
                <i className="bi bi-x"></i>
              </a>
            </div>
          </div>
          <div className="dash-btn-one d-inline-block position-relative me-3">
            {/* <input type="file" id="uploadCV" name="uploadCV" placeholder="" /> */}
            <Upload setSelected={setFileAttachment} text="Upload File" />
          </div>
          <small>Upload file .pdf, .doc, .docx</small>
          <h4 className="dash-title-three pt-50 lg-pt-30">
            Add Description With AI
          </h4>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Description*</label>
            <textarea
              className="size-lg"
              placeholder="Write about the job in details..."
            ></textarea>
          </div>
          {/* <h4 className="dash-title-three pt-50 lg-pt-30">
            Address & Location
          </h4> */}
          {/* <div className="row">
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Address*</label>
                <input
                  type="text"
                  placeholder="Cowrasta, Chandana, Gazipur Sadar"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Country*</label>
                <CountrySelect />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">City*</label>
              
                <AutocompleteCity />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">State*</label>
                <StateSelect />
              </div>
            </div>
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Map Location*</label>
                <div className="position-relative">
                  <input type="text" placeholder="XC23+6XC, Moiran, N105" />
                  <button className="location-pin tran3s">
                    <Image src={icon} alt="icon" className="lazy-img m-auto" />
                  </button>
                </div>
                <div className="map-frame mt-30">
                  <div className="gmap_canvas h-100 w-100">
                    <iframe
                      className="gmap_iframe h-100 w-100"
                      src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="button-group d-inline-flex align-items-center mt-30">
          <button
            type={"submit"}
            onClick={handleSubmit}
            className="dash-btn-two tran3s me-3"
          >
            Next
          </button>
          <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubmitJobArea;
