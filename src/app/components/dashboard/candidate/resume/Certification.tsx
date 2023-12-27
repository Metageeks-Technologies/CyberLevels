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

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSaveVisible, setSaveVisible] = useState<boolean>(false);

  const addText = () => {
    if (currentText.trim() !== ''){
    setTexts([...texts, currentText]);
    
    setCurrentText('');
    setSaveVisible(true);
    
}
  };

  const handleSave = async () => {
    
    if (currCandidate) {
      const isUpdated = await updateCurrCandidate(dispatch, currCandidate._id, {
        certificate: texts,
      });
      if (isUpdated) {
        setSaveVisible(false);
        notifySuccess("updated successfully");
      } else notifyError("something went wrong try again");
    }
  };
  const selectText = (index: number | null) => {
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const editText = (index: number) => {
    setEditingIndex(index);
    setCurrentText(texts[index]); // Set the current text to the text at the specified index
  };

  const updateText = (index: number ) => {
    
    const updatedTexts = [...texts];
    updatedTexts[index] = currentText; // Update the text at the specified index
    setTexts(updatedTexts);
    
    // Reset states
    setEditingIndex(null);
    setCurrentText('');   
    setSelectedIndex(null); 
    setSaveVisible(true);
    
  };

  const removeText = (index: number) => {
    const updatedTexts = [...texts];
    updatedTexts.splice(index, 1);
    setTexts(updatedTexts);
    setEditingIndex(null);
    setSaveVisible(true);
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
              <button className="mt-3 btn-one tran3s me-3" onClick={addText}>
                Add
              </button>
              {isSaveVisible && (
              <button
                className="mt-3 dash-btn-two tran3s me-3 "
                onClick={handleSave}
              >
                Save
              </button>
              )}
            </div>
          <div className="skills-wrapper"></div>
            <ul className="  flex-wrap align-items-center ">
              {texts.map((text, index) => (
                <li
                  className=" mt-3"  style={{ padding: "0 22px" }}
                  key={index}
                >
                  <div className="d-flex">
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={currentText}
                        onChange={(e) => setCurrentText(e.target.value)}
                        style={{ borderRadius: "10px" }}
                      />
                      <div className="d-flex">
                        <button
                          className="btn"
                          onClick={() => updateText(index)}
                        >
                          Update
                        </button>
                        <button
                          className="btn"
                          onClick={() => setEditingIndex(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn-eight style-two"
                        onClick={() => selectText(index)}
                      >
                        {text}
                      </button>
                      {selectedIndex === index && (
                        <div className="d-flex">
                          <button
                            className="btn"
                            onClick={() => editText(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn"
                            onClick={() => removeText(index)}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  {/* <button className="btn-eight style-two"onClick={() => selectText(index)}>{text}</button>
                  {editingIndex === index && (
                  <>
                    <button className="btn" onClick={() => editText(index)}>edit</button>
                    <button className="btn" onClick={() => removeText(index)}>remove</button>
                  </>
                )} */}
                    {/* <button className="" onClick={() => editText(index)}>
                      edit
                    </button>
                    <button className="bi bi-x" onClick={() => removeText(index)}>
                      remove
                    </button> */}
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
