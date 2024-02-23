import { ICoupon } from "@/types/coupon-type";
import React from "react";

const CouponGridItem = ({ key, item ,style_2=true}: { key: number; item: ICoupon ,style_2?: boolean;}) => {
  return (
    <div
      className={`job-list-two ${style_2 ? "style-two" : ""} position-relative`}
    >
      <div className="cursor-pointer">
        <div>
          <div
            // onClick={() => handleViewClick(item._id)}
            className="title fw-500 tran3s"
          >
            {`${item.code?.slice(0, 20)} ${item.code?.length > 20 ? ".." : ""}`}
          </div>
        </div>
        <div className="job-salary">
          <span className="fw-500 text-dark">{item.description}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-auto">
          <div className="job-location">
            {/* <div onClick={() => handleViewClick(item._id)}> */}
            {item.discountPercentage}
          </div>
        </div>

        <div
          // href={`/job-details-v1/${item._id}`}
          // href={"/dashboard/candidate-dashboard/membership"}
          className="apply-btn text-center tran3s"
          // onClick={() => handleViewClick(item._id)}
        >
          {item.expirationDate?.toString()}
        </div>
      </div>
    </div>
  );
};

export default CouponGridItem;
