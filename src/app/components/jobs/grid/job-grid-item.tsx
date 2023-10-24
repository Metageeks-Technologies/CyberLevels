"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IJobType } from "@/types/job-data-type";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { add_to_wishlist } from "@/redux/features/wishlist";
import type { IJobPost } from "@/types/jobPost-type";
import job_img_1 from "@/assets/images/logo/media_22.png";

const JobGridItem = ({
  item,
  style_2 = true,
}: {
  item: IJobPost;
  style_2?: boolean;
}) => {
  const { _id, title, salary } = item || {};
  const { wishlist } = useAppSelector((state) => state.wishlist);
  // const isActive = wishlist.some((p) => p.id == _id);
  const dispatch = useAppDispatch();
  // handle add wishlist
  const handleAddWishlist = (item: IJobType) => {
    dispatch(add_to_wishlist(item));
  };
  const isActive = true;
  return (
    <div
      className={`job-list-two ${style_2 ? "style-two" : ""} position-relative`}
    >
      <Link href={`/job-details-v1/${_id}`} className="logo">
        <Image
          src={job_img_1}
          alt="logo"
          style={{ height: "auto", width: "auto" }}
          className="lazy-img m-auto"
        />
      </Link>
      <a
        // onClick={() => handleAddWishlist(item)}
        className={`save-btn text-center rounded-circle tran3s cursor-pointer ${
          isActive ? "active" : ""
        }`}
        title={`${isActive ? "Remove Job" : "Save Job"}`}
      >
        <i className="bi bi-bookmark-dash"></i>
      </a>
      <div className="d-flex gap-2 mt-40 mb-40  flex-wrap ">
        {item?.jobType.map((val, index) => (
          <Link
            href={`/job-details-v1/${_id}`}
            className={`job-duration fw-500 ${
              val == "part-time" ? "part-time" : ""
            }`}
          >
            {val}
          </Link>
        ))}
      </div>
      <div>
        <Link href={`/job-details-v1/${_id}`} className="title fw-500 tran3s">
          {item.title}
        </Link>
      </div>
      <div className="job-salary">
        <span className="fw-500 text-dark">
          ${`${salary.minimum}-${salary.maximum}`} PA
        </span>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-auto">
        <div className="job-location">
          <Link href={`/job-details-v1/${_id}`}>{item.location}</Link>
        </div>
        <Link
          href={`/job-details-v1/${_id}`}
          className="apply-btn text-center tran3s"
        >
          APPLY
        </Link>
      </div>
    </div>
  );
};

export default JobGridItem;
