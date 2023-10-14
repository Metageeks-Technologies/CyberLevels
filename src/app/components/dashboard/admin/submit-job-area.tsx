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
import FormatText from "@/ui/temp";
import { MagicWand } from "@phosphor-icons/react";
import { setLoading } from "@/redux/features/authSlice";
import Loader from "@/ui/loader";
import TinyMCEEditor from "@/ui/textEditor";

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
  const [txt, setTxt] = useState<any>("");

  const handleSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalary({
      ...salary,
      [name]: value,
    });
  };
  // console.log(skills);
  const bodyObj = {
    title: title,
    location: expLocation.location,
    jobType: jobType,
    jobCategory: jobCategory,
    skillsRequired: skills,
    salary: salary,
    preferredExperience: expLocation.experience,
  };

  const handleSubmit = async () => {
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
    setTitle("");
    setJobCategory("");
    setJobType("");
    setExpLocation({
      experience: "",
      location: "",
    });
    setSalary({
      minimum: "",
      maximum: "",
      isDisclosed: true,
    });
    setSkills([]);
    setTxt("");
  };

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: "Does Azure OpenAI support customer managed keys?",
    },
    {
      role: "assistant",
      content: "Yes, customer managed keys are supported by Azure OpenAI",
    },
    {
      role: "user",
      content: `give me job description for job post ${
        bodyObj.title
      }  in job category of ${bodyObj.jobCategory} with ${
        bodyObj.jobType
      } job type,skills required are  ${bodyObj.skillsRequired.join(
        ","
      )}, with experience of ${bodyObj.preferredExperience} at location of ${
        bodyObj.location
      }, make it an intreating paragraph of 50 to 75 words with necessary bullet points`,
    },
  ];

  const [txtLoading, setTxtLoading] = useState(false);

  const draftWithAi = async () => {
    setTxtLoading(true);
    const serverUrl =
      "https://cyberlevels.openai.azure.com/openai/deployments/cyberlevels/chat/completions?api-version=2023-05-15";

    try {
      const { data } = await axios.post(
        serverUrl,
        { messages },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": "0a995d6ac1fb47b9a19629e9ffe6f14e",
          },
        }
      );
      setTxt(data);
      setTxtLoading(false);
      console.log(data);
    } catch (error) {
      setTxtLoading(false);
    }
  };

  return (
    <div className="dashboard-body job-details">
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
          <h4 className="dash-title-three pt-50 lg-pt-30">Add Description</h4>
          <div className="dash-input-wrapper mb-30 ">
            <label htmlFor="">Job Description*</label>
            <div className="position-relative">
              {txt ? (
                <TinyMCEEditor text={txt.choices[0].message.content} />
              ) : (
                <TinyMCEEditor text={""} />
              )}
              <button
                style={{
                  backgroundColor: "#D2F34C",
                  padding: "5px 10px",
                  borderRadius: "13%",
                  zIndex: `${txt ? 0 : 9}`,
                }}
                type="button"
                className="position-absolute d-flex justify-content-center top-0 end-0"
                onClick={draftWithAi}
              >
                <MagicWand size={30} color="white" weight="bold" />
                {txtLoading ? <Loader /> : "Draft"}
              </button>
            </div>
          </div>
          {/* {txt && <FormatText txt={txt.choices[0].message.content} />} */}

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
            disabled={loading}
            type={"submit"}
            onClick={handleSubmit}
            className="dash-btn-two tran3s me-3"
          >
            {loading ? <Loader /> : "Next"}
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
