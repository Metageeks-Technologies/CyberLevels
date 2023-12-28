"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import job_data from "@/data/job-data";
import icon_1 from "@/assets/dashboard/images/icon/icon_12.svg";
import icon_2 from "@/assets/dashboard/images/icon/icon_13.svg";
import icon_3 from "@/assets/dashboard/images/icon/icon_14.svg";
import icon_4 from "@/assets/dashboard/images/icon/icon_15.svg";
import main_graph from "@/assets/dashboard/images/main-graph.png";
import DashboardHeader from "../candidate/dashboard-header";
import { CardItem } from "../candidate/dashboard-area";
import NiceSelect from "@/ui/nice-select";
import EmployeeAreaChart from "@/ui/EmployerAreaChart";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getJobPostViews,
  getJobPostsForEmployer,
} from "@/redux/features/jobPost/api";
import { JobPostView } from "@/redux/features/jobPost/slice";
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployDashboardArea = ({ setIsOpenSidebar }: IProps) => {
  const dispatch = useAppDispatch();
  const { currEmployer } = useAppSelector((state) => state.employer);
  const { jobPostsForEmployer, viewsOnJobPost } = useAppSelector(
    (state) => state.jobPost
  );
  const job_items = [...job_data.reverse().slice(0, 6)];
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const handleJobs = (item: { value: string; label: string }) => {
    setSelectedJobId(item.value);
  };
  const [viewsDataDay, setViewsDataDay] = useState<JobPostView[][] | []>();
  const [viewsDataMonth, setViewsDataMonth] = useState<JobPostView[][] | []>();
  const [viewsDataYear, setViewsDataYear] = useState<JobPostView[][] | []>();
  const [dataMode, setDataMode] = useState<string>("day");
  const [lastUnit, setLastUnit] = useState<number>(6);
  const [totalViews, setTotalViews] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const handleLastUnits = (item: { value: string; label: string }) => {
    const val = parseInt(item.value);
    setLastUnit(val);
  };
  const jobTitles = jobPostsForEmployer.map((job) => ({
    value: job._id, // Assuming the job ID is unique and can be used as a value
    label: job.title,
    date: job.createdAt,
  }));
  useEffect(() => {
    if (currEmployer) getJobPostsForEmployer(dispatch, currEmployer._id);
    // console.log(jobPostsForEmployer)
  }, [currEmployer]);

  useEffect(() => {
    const calcTotalViews = () => {
      // Sum up the views of all job posts
      const total = jobPostsForEmployer.reduce(
        (acc, job) => acc + job.views?.length!,
        0
      );
      // console.log(total,"Total");
      // Set the total views in the component state
      setTotalViews(total);
    };

    const calcTotalApplicants = () => {
      // Sum up the views of all job posts
      const total = jobPostsForEmployer.reduce(
        (acc, job) => acc + job.candidates?.length!,
        0
      );
      // console.log(total,"Total");
      // Set the total views in the component state
      setTotalApplicants(total);
    };

    // Call the function to calculate total views
    calcTotalViews();
    calcTotalApplicants();
  }, [jobPostsForEmployer]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedJobId) {
          const viewsDay = await getJobPostViews(
            dispatch,
            "day",
            selectedJobId
          );
          setViewsDataDay(viewsDay);

          const viewsMonth = await getJobPostViews(
            dispatch,
            "month",
            selectedJobId
          );
          setViewsDataMonth(viewsMonth);

          const viewsYear = await getJobPostViews(
            dispatch,
            "year",
            selectedJobId
          );
          setViewsDataYear(viewsYear);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // console.log(viewsDataMonth);
  }, [selectedJobId]);

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Dashboard</h2>
        <div className="row">
          <CardItem
            img={icon_1}
            title="Total Views"
            value={totalViews.toString()}
          />
          <CardItem
            img={icon_2}
            title="Applicants"
            value={totalApplicants.toString()}
          />
          <CardItem
            img={icon_3}
            title="Tokens Left"
            value={currEmployer?.subscription.requestLimit.toString()}
          />
          <CardItem
            img={icon_4}
            title="Jobs Posted"
            value={jobPostsForEmployer?.length.toString()}
          />
        </div>

        <div className="row d-flex pt-50 lg-pt-10">
          <div className="col-xl-7 col-lg-6 d-flex flex-column">
            <div className="user-activity-chart bg-white border-20 mt-30 h-100">
              <h4 className="dash-title-two">Job Views</h4>
              <div className="d-sm-flex align-items-center job-list">
                <div className="fw-500 pe-3">Jobs:</div>
                <div className="flex-fill xs-mt-10">
                  <NiceSelect
                    options={jobTitles}
                    defaultCurrent={0}
                    onChange={(item) => handleJobs(item)}
                    name="Search Jobs"
                    isScroll={true}
                  />
                </div>
              </div>
              <div
                className="flex px-4 md:px-6 lg:px-8 xl:px-10 "
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="gap-1 sm:gap-2" style={{ display: "flex" }}>
                  <button
                    className=" font-bold p-2 px-3"
                    style={{
                      background: dataMode === "day" ? "#D2F34C" : "#3f634d",
                      borderRadius: "9999px",
                      color: dataMode === "day" ? " #3f634d" : "white",
                    }}
                    onClick={() => setDataMode("day")}
                  >
                    Day
                  </button>
                  <button
                    className="p-2 font-bold px-3"
                    style={{
                      background: dataMode === "month" ? "#D2F34C" : "#3f634d",
                      borderRadius: "9999px",
                      color: dataMode === "month" ? " #3f634d" : "white",
                    }}
                    onClick={() => setDataMode("month")}
                  >
                    Month
                  </button>
                  <button
                    className=" p-2 px-3"
                    style={{
                      background: dataMode === "year" ? "#D2F34C" : "#3f634d",
                      borderRadius: "9999px",
                      color: dataMode === "year" ? " #3f634d" : "white",
                    }}
                    onClick={() => setDataMode("year")}
                  >
                    Year
                  </button>
                </div>
                <div>
                  <NiceSelect
                    options={[
                      { value: "2", label: "last 3 units" },
                      { value: "4", label: "last 5 units" },
                      { value: "6", label: "last 7 units" },
                      { value: "11", label: "last 12 units" },
                    ]}
                    defaultCurrent={2}
                    onChange={(item) => handleLastUnits(item)}
                    name="last units"
                  />
                </div>
              </div>
              <div className="px-3 pb-3 mt-50">
                <EmployeeAreaChart
                  dataMode={dataMode}
                  lastUnit={lastUnit}
                  viewsDataDay={viewsDataDay}
                  viewsDataMonth={viewsDataMonth}
                  viewsDataYear={viewsDataYear}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 d-flex">
            <div className="recent-job-tab bg-white border-20 mt-30 w-100">
              <h4 className="dash-title-two">Posted Job</h4>
              <div className="wrapper">
                {job_items.map((j) => (
                  <div
                    key={j.id}
                    className="job-item-list d-flex align-items-center"
                  >
                    <div>
                      <Image
                        src={j.logo}
                        alt="logo"
                        width={40}
                        height={40}
                        className="lazy-img logo"
                      />
                    </div>
                    <div className="job-title">
                      <h6 className="mb-5">
                        <a href="#">{j.duration}</a>
                      </h6>
                      <div className="meta">
                        <span>Fulltime</span> . <span>{j.location}</span>
                      </div>
                    </div>
                    <div className="job-action">
                      <button
                        className="action-btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span></span>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            View Job
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Archive
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployDashboardArea;
