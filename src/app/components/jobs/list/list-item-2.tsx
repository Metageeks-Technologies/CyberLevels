"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IJobType } from "@/types/job-data-type";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { add_to_wishlist } from "@/redux/features/wishlist";
import { IJobPost } from "@/types/jobPost-type";
import job_img_1 from "@/assets/images/logo/media_22.png";

const ListItemTwo = ({ item }: { item: IJobPost }) => {
  const { wishlist } = useAppSelector((state) => state.wishlist);
  const isActive = wishlist.some((p) => p.location === item._id);
  const dispatch = useAppDispatch();
  console.log(item);
  // handle add wishlist
  const handleAddWishlist = (item: IJobType) => {
    dispatch(add_to_wishlist(item));
  };
  return (
    <div className="job-list-one style-two position-relative border-style mb-20">
      <div className="row justify-content-between align-items-center">
        <div className="col-md-5">
          <div className="job-title d-flex align-items-center">
            <Link href={`/job-details-v1/${item._id}`} className="logo">
              <Image src={job_img_1} alt="logo" className="lazy-img m-auto" />
            </Link>
            <div className="split-box1">
              <Link
                href={`/job-details-v1/${item._id}`}
                className="job-duration fw-500"
              >
                {item.jobType.join(" ,")}
              </Link>
              <Link
                href={`/job-details-v1/${item._id}`}
                className="title fw-500 tran3s"
              >
                {item.title.slice(0, 22)} {item.title.length > 20 ? ".." : ""}
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6">
          <div className="job-location">
            <Link href={`/job-details-v1/${item._id}`}>{item.location}</Link>
          </div>
          <div className="job-salary">
            <span className="fw-500 text-dark">
              ${item.salary.minimum}-{item.salary.maximum} PA
            </span>{" "}
            /{item.preferredExperience[0]}
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="btn-group d-flex align-items-center justify-content-sm-end xs-mt-20">
            <a
              // onClick={() => handleAddWishlist(item)}
              className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${
                isActive ? "active" : ""
              }`}
              title={`${isActive ? "Remove Job" : "Save Job"}`}
            >
              <i className="bi bi-bookmark-dash"></i>
            </a>
            <Link
              href={`/job-details-v1/${item._id}`}
              className="apply-btn text-center tran3s"
            >
              APPLY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemTwo;
