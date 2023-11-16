import { IResume } from "@/types/user-type";
import React, { useState } from "react";

const SelectResume = ({
  resumes,
  setStep,
  setForm,
}: {
  resumes: IResume[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setForm: React.Dispatch<
    React.SetStateAction<{
      testScore: number;
      appliedWithResume: string;
      jobLetter: string;
    }>
  >;
}) => {
  const [isSaved, setSaved] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const handleClick = (resumeId: string) => {
    setForm((form) => ({
      ...form,
      appliedWithResume: resumeId,
    }));
    setSelectedId(resumeId);
    setSaved(true);
  };

  return (
    <div>
      <p className="mt-3 fw-medium mb-3 text-center ">
        Select your resume for this job post.
      </p>
      {resumes.length >= 1 ? (
        <div>
          {resumes.map((resume) => (
            <button
              onClick={() => handleClick(resume._id)}
              type="button"
              className={`${
                String(resume._id) === selectedId && "request-btn-active"
              } request-btn d-flex w-100  flex-column  rounded gap-1 mb-3 border border-black p-3 `}
            >
              <div className="job-name fw-500">{resume.name}</div>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <p>Please upload your resume First....</p>
          <button
            className="btn-two tran3s"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            close
          </button>
        </div>
      )}
      <div className="button-group d-inline-flex align-items-center mt-30">
        {isSaved && (
          <button
            onClick={() => setStep((p) => p + 1)}
            className="btn-two tran3s"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectResume;
