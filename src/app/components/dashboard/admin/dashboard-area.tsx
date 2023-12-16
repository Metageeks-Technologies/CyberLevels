"use client";
import React, { useEffect } from "react";
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
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { getJObPosts, deleteJobPost, getAllJobPosts } from "@/redux/features/jobPost/api";
import job_img_1 from "@/assets/images/logo/media_22.png";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 1000,
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Line Chart',
    },
  },
};

const generateRandomData = (count: number): number[] => {
  const randomData: number[] = [];
  for (let i = 0; i < count; i++) {
    randomData.push(Math.floor(Math.random() * 1000 ));
  }
  return randomData;
};

const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: generateRandomData(labels.length),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: generateRandomData(labels.length),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminDashboardArea = ({ setIsOpenSidebar }: IProps) => {
  // const job_items = [...job_data.reverse().slice(0, 6)];
  const handleJobs = (item: { value: string; label: string }) => {};
  const dispatch = useAppDispatch();
  const { allJobPostAdmin, page } = useAppSelector((state) => state.jobPost);
  const filterObj = useAppSelector((state) => state.filter);
  useEffect(() => {
    getAllJobPosts(dispatch);
  }, []);
  const handleDelete = (id: string) => {
    deleteJobPost(dispatch, id);
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Dashboard</h2>
        {/* <div className="row">
          <CardItem img={icon_1} title="Total Visitor" value="1.7k+" />
          <CardItem img={icon_2} title="Shortlisted" value="03" />
          <CardItem img={icon_3} title="Views" value="2.1k" />
          <CardItem img={icon_4} title="Applied Job" value="07" />
        </div> */}

        <div className="row d-flex pt-0 lg-pt-10">
          <div className="col-xl-7 col-lg-6 d-flex flex-column">
            <div className="user-activity-chart bg-white border-20 mt-30 h-100">
              <h4 className="dash-title-two">Job Views</h4>
              <div className="d-sm-flex align-items-center job-list">
                <div className="fw-500 pe-3">Jobs:</div>
                <div className="flex-fill xs-mt-10">
                  <NiceSelect
                    options={[
                      {
                        value: "Web-&-Mobile-Prototype-designer",
                        label: "Web & Mobile Prototype designer....",
                      },
                      { value: "Document Writer", label: "Document Writer" },
                      {
                        value: "Outbound Call Service",
                        label: "Outbound Call Service",
                      },
                      { value: "Product Designer", label: "Product Designer" },
                    ]}
                    defaultCurrent={0}
                    onChange={(item) => handleJobs(item)}
                    name="Search Jobs"
                  />
                </div>
              </div>
              <div className="ps-5 pe-5 mt-50">
              <Line options={options} data={data} />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 d-flex">
            <div className="recent-job-tab bg-white border-20 mt-30 w-100">
              <h4 className="dash-title-two">Posted Job</h4>

              <div className="wrapper">
              {allJobPostAdmin?.slice(0, 5).map((app) => {
                console.log(allJobPostAdmin)
                  if (typeof app !== "string") {
                    return (
                      <div
                        key={app._id}
                        className="job-item-list d-flex align-items-center"
                      >
                        <div>
                          <Image
                            src={job_img_1}
                            alt="logo"
                            width={40}
                            height={40}
                            className="lazy-img logo"
                          />
                        </div>
                        <div className="job-title">
                          <h6 className="mb-5">
                            <Link href={`/job-details-v1/${app._id}`}>
                              {app.title}
                            </Link>
                          </h6>
                          <div className="meta">
                            <span>{app.jobType[0]}</span> .{" "}
                            <span>{app.location[0]}</span>
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
                              <Link
                                className="dropdown-item"
                                href={`/job-details-v1/${app._id}`}
                              >
                                View Job
                              </Link>
                            </li>
                            {/* <li>
                            <a className="dropdown-item" href="#">
                              Archive
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </li> */}
                          </ul>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardArea;
