"use client";
import React, { useState, useEffect } from "react";
import slugify from "slugify";
import FilterArea from "../filter/filter-area";
import job_data from "@/data/job-data";
import ListItemTwo from "./list-item-2";
import type { IJobType } from "@/types/job-data-type";
import type { IFilterState } from "@/redux/features/filterJobPostSlice";
import Pagination from "@/ui/pagination";
import JobGridItem from "../grid/job-grid-item";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import NiceSelect from "@/ui/nice-select";
import { getJObPosts } from "@/redux/features/jobPost/api";
import { IJobPost } from "@/types/jobPost-type";

const JobListThree = ({
  itemsPerPage,
  grid_style = false,
}: {
  itemsPerPage: number;
  grid_style?: boolean;
}) => {
  let all_jobs = job_data;
  const maxPrice = job_data.reduce((max, job) => {
    return job.salary > max ? job.salary : max;
  }, 0);
  const filterState = useAppSelector((state) => state.filter);
  const {
    location,
    jobCategory,
    jobType,
    salary,
    preferredExperience,
    workMode,
  } = filterState;
  const { allJobPost, totalJobPost, totalNumOfPage, loading, page } =
    useAppSelector((state) => state.jobPost);
  const dispatch = useAppDispatch();
  const [currentItems, setCurrentItems] = useState<IJobPost[] | null>(
    allJobPost
  );
  const [filterItems, setFilterItems] = useState<IJobType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [jobTypeTemp, setJobTypeTemp] = useState(grid_style ? "grid" : "list");
  const [priceValue, setPriceValue] = useState([0, maxPrice]);
  const [shortValue, setShortValue] = useState("");

  useEffect(() => {
    getJObPosts(dispatch, filterState, page);
  }, [location, jobCategory, jobType, workMode, salary, preferredExperience]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % all_jobs.length;
    setItemOffset(newOffset);
  };
  // handleShort
  const handleShort = (item: { value: string; label: string }) => {
    setShortValue(item.value);
  };
  return (
    <section className="job-listing-three pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <button
              type="button"
              className="filter-btn w-100 pt-2 pb-2 h-auto fw-500 tran3s d-lg-none mb-40"
              data-bs-toggle="offcanvas"
              data-bs-target="#filteroffcanvas"
            >
              <i className="bi bi-funnel"></i>
              Filter
            </button>
            {/* filter area start */}
            <FilterArea
              priceValue={priceValue}
              setPriceValue={setPriceValue}
              maxPrice={maxPrice}
            />
            {/* filter area end */}
          </div>

          <div className="col-xl-9 col-lg-8">
            <div className="job-post-item-wrapper ms-xxl-5 ms-xl-3">
              <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                <div className="total-job-found">
                  <div>
                    <Pagination pageCount={0} handlePageClick={() => {}} />
                  </div>
                  All <span className="text-dark">{totalJobPost}</span> jobs
                  found
                </div>
                <div className="d-flex align-items-center">
                  <div className="short-filter d-flex align-items-center">
                    <div className="text-dark fw-500 me-2">Short:</div>
                    <NiceSelect
                      options={[
                        { value: "", label: "Price Short" },
                        { value: "price-low-to-high", label: "low to high" },
                        { value: "price-high-to-low", label: "High to low" },
                      ]}
                      defaultCurrent={0}
                      onChange={(item) => handleShort(item)}
                      name="Price Short"
                    />
                  </div>
                  <button
                    onClick={() => setJobTypeTemp("list")}
                    className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn 
                    ${jobTypeTemp === "grid" ? "active" : ""}`}
                    title="Active List"
                  >
                    <i className="bi bi-list"></i>
                  </button>
                  <button
                    onClick={() => setJobTypeTemp("grid")}
                    className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn 
                    ${jobTypeTemp === "list" ? "active" : ""}`}
                    title="Active Grid"
                  >
                    <i className="bi bi-grid"></i>
                  </button>
                </div>
              </div>
              <div
                className={`accordion-box list-style ${
                  jobTypeTemp === "list" ? "show" : ""
                }`}
              >
                {allJobPost &&
                  allJobPost.map((job) => (
                    <ListItemTwo key={job.location} item={job} />
                  ))}
              </div>

              <div
                className={`accordion-box grid-style ${
                  jobTypeTemp === "grid" ? "show" : ""
                }`}
              >
                {/* <div className="row">
                  {currentItems &&
                    currentItems.map((job) => (
                      <div key={job.id} className="col-sm-6 mb-30">
                        <JobGridItem item={job} />
                      </div>
                    ))}
                </div> */}
              </div>

              {true && (
                <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                  <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                    Showing <span className="text-dark fw-500">{page}</span> to{" "}
                    <span className="text-dark fw-500">
                      {Math.min(page + itemsPerPage, totalJobPost)}
                    </span>{" "}
                    of <span className="text-dark fw-500">{totalJobPost}</span>
                  </p>
                  {/* <Pagination pageCount={0} handlePageClick={() => {}} /> */}
                  {/* {true && (
                   
                  )} */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobListThree;
