import React, { useState } from "react";
import job_data from "@/data/job-data";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setJobType } from "@/redux/features/filterJobPostSlice";

// job type items
const JobTypeOption = [
  "Full time",
  "Part time",
  "Internship",
  "Hourly contract",
  "Fixed price",
];

const JobType = ({
  setCategoryVal,
}: {
  setCategoryVal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const { jobType } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const handleSelect = (selectedType: string) => {
    setSelectedJobType(selectedType);
    dispatch(setJobType(selectedType));
  };

  return (
    <div className="main-body">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ backgroundColor: "white", color: "black", border: "1px solid white" }}
        >
          {selectedJobType || "Select Job Type"}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ backgroundColor: "white", border: "1px solid white" }}>
          {JobTypeOption.map((type, index) => (
            <li key={index}>
              <button
                className={`dropdown-item ${jobType.includes(type) ? "active" : ""}`}
                onClick={() => handleSelect(type)}
                style={{ backgroundColor: "white", color: "black", border: "1px solid white" }}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobType;
