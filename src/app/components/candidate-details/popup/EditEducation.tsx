"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { notifyError } from "@/utils/toast";
import { useEffect, useState } from "react";
import SelectMonth from "../../dashboard/candidate/select-month";
import SelectYear from "../../dashboard/candidate/select-year";
import { IEducation } from "@/types/user-type";
import { dirname } from "node:path/posix";

const EditEducation = () => {
  const { currCandidate, loading, currDashEducation } = useAppSelector(
    (store) => store.candidate.candidateDashboard
  );

  const educationProp = currCandidate?.education.find(
    (obj) => obj._id === currDashEducation
  ) as IEducation;

  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(currDashEducation);
    console.log(educationProp);

    // educationProp;
  }, [currDashEducation]);

  const user = currCandidate;
  const [education, setEducation] = useState({
    degree: educationProp?.degree || "",
    institute: educationProp?.institute || "",
    description: educationProp?.description || "",
  });
  const start = educationProp?.startYear.split(" ");
  const end = educationProp?.endYear.split(" ");
  const [startYear, setStartYear] = useState(start?.[1] || "");
  const [startMonth, setStartMonth] = useState(start?.[0] || "");
  const [endYear, setEndYear] = useState(end?.[1] || "");
  const [endMonth, setEndMonth] = useState(end?.[0] || "");

  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEducation({
      ...education,
      [name]: value,
    });
  };

  const handleAddEducation = async () => {
    if (!user) {
      notifyError("! unauthenticated user");
      return;
    }
    const bodyObj = {
      ...education,
      startYear: startMonth + " " + startYear,
      endYear: endMonth + " " + endYear,
    };
    console.log(bodyObj);
    //  await addEducation(dispatch, user._id, bodyObj);
    setEducation({
      degree: "",
      institute: "",
      description: "",
    });
    setStartYear("");
    setEndYear("");
  };

  return (
    <>
      {educationProp && (
        <div
          className="modal fade"
          id="EducationModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen modal-dialog-centered">
            <div className="container">
              <div className="user-data-form modal-content">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>

                <div className="form-wrapper m-auto w-100 ">
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="degree">Degree*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <input
                            name="degree"
                            value={education.degree}
                            onChange={handleEducationChange}
                            type="text"
                            placeholder="Bachelor's"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="dash-input-wrapper mb-30 md-mb-10">
                          <label htmlFor="institute">Institute*</label>
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <div className="dash-input-wrapper mb-30">
                          <input
                            name="institute"
                            value={education.institute}
                            onChange={handleEducationChange}
                            type="text"
                            placeholder="Oxford"
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
                              default={{ value: start[0], label: start[0] }}
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
                            value={education.description}
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
                      className="dash-btn-two tran3s me-3 mb-15"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditEducation;
