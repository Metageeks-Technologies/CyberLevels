"use client";
import React from "react";
import DropZone from "@/layouts/dropZone";
import { notifyError } from "@/utils/toast";
import { deleteResume, uploadResume } from "@/redux/features/candidate/api";
import { setFile, setUploadProgress } from "@/redux/features/globalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const UploadResume = () => {
  const { file, uploadProgress } = useAppSelector((s) => s.global);
  const { currCandidate, loading } = useAppSelector(
    (store) => store.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    if (!currCandidate) {
      notifyError("please Login to upload your resume.");
      return;
    }
    if (!file || file?.type !== "application/pdf") {
      notifyError("Please upload Your resume as pdf.");
      return;
    }
    const metaData = {
      name: file.name,
      type: file.type,
      candidateId: currCandidate._id,
      candidateName: currCandidate.firstName + " " + currCandidate.lastName,
    };
    await uploadResume(dispatch, file, metaData);
    dispatch(setFile(null));
    dispatch(setUploadProgress(0));
  };

  const handleDelete = (s3Key: string, resumeId: string) => {
    if (!currCandidate) {
      notifyError("please Login to upload your resume.");
      return;
    }

    const metaData = {
      s3Key,
      resumeId,
      candidateId: currCandidate._id,
    };
    console.log(metaData);
    deleteResume(dispatch, metaData);
  };
  return (
    <>
      {/* <h2 className="main-title">My Resume</h2> */}
      <div className="bg-white card-box border-20 mt-40 ">
        <h4 className="dash-title-three">Resume</h4>
        <div className="dash-input-wrapper mb-20">
          <label htmlFor=""> Attachment*</label>

          {currCandidate?.resumes.map((resume) => (
            <div
              key={resume.s3Key}
              className="attached-file d-flex align-items-center justify-content-between mb-15"
            >
              <span>{resume.name}</span>
              <button
                type="button"
                onClick={() => handleDelete(resume.s3Key, resume._id)}
                className="remove-btn"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          ))}
        </div>

        {!file && (
          <>
            <div
              style={{ cursor: "pointer" }}
              className="dash-btn-one d-inline-block position-relative me-3"
            >
              {/* 
              Upload CV
              <input type="file" id="uploadCV" name="uploadCV" placeholder="" /> */}

              <DropZone showIcon={false} style="" text={"Upload New"} />
            </div>
            <div className=" mt-3 ">
              <small>Upload file with .pdf .doc .docx</small>
            </div>
          </>
        )}

        {file && file.type === "application/pdf" && (
          <>
            <p className="my-2">{file.name}</p>
            <button
              className="dash-btn-one  tran3s me-3 mt-3 mb-20"
              type="button"
              onClick={handleSubmit}
            >
              {uploadProgress !== 0 ? `${uploadProgress}% ` : "Save"}
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default UploadResume;
