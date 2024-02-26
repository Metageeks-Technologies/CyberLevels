import { ICoupon } from "@/types/coupon-type";
import React from "react";
// import ActionDropdown from "./ActionDropdownForCoupon";

const PaymentGridItem = ({
  key,
  item,
  style_2 = true,
}: {
  key: number;
  item: any;
  style_2?: boolean;
}) => {
//   const date1 = new Date(item.expirationDate ?? new Date());
//   const options2: Intl.DateTimeFormatOptions = {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   };
//   const readableStrings = date1.toLocaleDateString(undefined, options2);

  return (
    <>
      <div
        className={`job-list-two ${
          style_2 ? "style-two" : ""
        } position-relative `}
      >
        <div className="cursor-pointer">
          {/* <div className="d-flex action-dots justify-content-end d-flex float-end ">
            <button
              className="action-btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>
                <ActionDropdown id={item?._id} />
              </span>
            </button>
          </div> */}
          <div
            // onClick={() => handleViewClick(item._id)}
            className=" fw-500 tran3s"
          >
            {`${item.razorpayOrderId?.slice(0, 20)} ${item.razorpayOrderId?.length > 20 ? ".." : ""}`}
          </div>
          <div className="mb-3 d-flex" style={{ height: "80px" }}>
            <span className="fw-500 text-dark">
              {item.amount}
              {/* {`${item?.description?.slice(0, 20)} ${item?.description?.length > 20 ? ".." : ""}`} */}
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-auto">
            <div
              className="job-location d-flex justify-content-center"
              style={{ fontSize: "x-large", color: "red", fontWeight: "600" }}
            >
              {/* <div onClick={() => handleViewClick(item._id)}> */}
              {item?.user?.firstName}
            </div>
          </div>

          <div
            // href={`/job-details-v1/${item._id}`}
            // href={"/dashboard/candidate-dashboard/membership"}
            className="apply-btn text-center tran3s mt-3"
            style={{ width: "100%" }}
            // onClick={() => handleViewClick(item._id)}
          >
            {item.currency}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentGridItem;
