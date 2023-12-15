"use client";
import React, { useState } from "react";
import { updateCurrCandidate } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";

const Certificates: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currCandidate } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );
  const [texts, setTexts] = useState<string[]>(
    currCandidate?.certificate || []
  );
  const [currentText, setCurrentText] = useState<string>("");

  const addText = () => {
    if (currentText.trim() !== "") {
      setTexts([...texts, currentText]);
      console.log(currentText, "hello");
      setCurrentText("");
    }
  };

  const handleSave = async () => {
    console.log(texts, "hiiii");
    if (currCandidate) {
      const isUpdated = await updateCurrCandidate(dispatch, currCandidate._id, {
        certificate: texts,
      });
      if (isUpdated) {
        notifySuccess("updated successfully");
      } else notifyError("something went wrong try again");
    }
  };

  const editText = (index: number) => {
    const newText = prompt("Edit:", texts[index]);
    if (newText !== null && newText.trim() !== "") {
      const updatedTexts = [...texts];
      updatedTexts[index] = newText;
      setTexts(updatedTexts);
    }
  };

  const removeText = (index: number) => {
    const updatedTexts = [...texts];
    updatedTexts.splice(index, 1);
    setTexts(updatedTexts);
  };

  return (
    <>
      <h4 className="dash-title-three">Certification and Qualification</h4>
      <div className="dash-input-wrapper mb-40">
        <div className="skills-wrapper py-3 ">
          <input
            type="text"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
            style={{ borderRadius: "10px" }}
          />
          <div className=" d-flex ">
            <button className="mt-3 dash-btn-two tran3s me-3" onClick={addText}>
              Add
            </button>
            <button
              className="mt-3 dash-btn-two tran3s me-3"
              onClick={handleSave}
            >
              Save
            </button>
          </div>

          <ul className="list-unstyled ">
            {texts.map((text, index) => (
              <li
                className="flex items-center justify-between mb-2"
                key={index}
              >
                <span className="font-bold text-xl">{text}</span>
                <div className="flex">
                  <button className="ml-2" onClick={() => editText(index)}>
                    edit
                  </button>
                  <button className="ml-2" onClick={() => removeText(index)}>
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Certificates;
