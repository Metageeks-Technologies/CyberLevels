"use client";
import { updateCurrCandidate } from "@/redux/features/candidate/api";
// import AutocompleteSkill from "@/ui/autoCompleteSkill";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";
import AutocompleteSoftSkill from "@/ui/autoCompleteSoftSkill";

const EditSoftSkill = ({ skills }: { skills: string[] }) => {
  const dispatch = useAppDispatch();
  const [_skills, setSkills] = useState<string[]>(skills || []);
  const handleRemove = (skill: string) => {
    setSkills((prev) => prev.filter((val) => val !== skill));
  };
  const { currCandidate } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );
  const handleSave = async () => {
    if (currCandidate) {
      const isUpdated = await updateCurrCandidate(dispatch, currCandidate._id, {
        softSkills: _skills,
      });
      if (isUpdated) {
        notifySuccess("Soft skills updated successfully");
      } else notifyError("something went wrong try again");
    }
  };
  return (
    <>
      {
        <div
          className="modal fade"
          id="softSkillModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen modal-dialog-centered">
            <div className="container-fluid">
              <div className="user-data-form modal-content">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>

                <div className="form-wrapper dash-input-wrapper m-auto w-100 ">
                  <div>
                    <h3 className=" text-dark ">Soft skills</h3>
                    <div>
                      Tell recruiters what you know or what you are known for
                      e.g. Time Management, Communication, Leadership etc. We will send you
                      job recommendations based on these skills.
                    </div>
                  </div>
                  <div className="mt-3">
                    <h4>Skills</h4>
                    <div className="skills-wrapper">
                      <ul className="style-none .skill-input-data d-flex flex-wrap align-items-center">
                        {_skills?.map((val, index) => (
                          <li key={index} className="is_tag">
                            <button>
                              {val}

                              <i
                                onClick={() => handleRemove(val)}
                                className="bi bi-x"
                              ></i>
                            </button>
                          </li>
                        ))}

                        {/* <li className="more_tag">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#skillModal"
                          type="button"
                          className=" d-flex justify-content-center align-items-center "
                        ></button>
                      </li> */}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3">
                    <AutocompleteSoftSkill skills={_skills} setSkills={setSkills} />
                  </div>

                  <div className="button-group d-inline-flex align-items-center mt-30">
                    <button
                      onClick={handleSave}
                      className="dash-btn-two tran3s me-3"
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Save
                    </button>
                    <button
                      className="dash-cancel-btn tran3s"
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default EditSoftSkill;