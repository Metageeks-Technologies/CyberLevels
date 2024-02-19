"use client";
import React, { useEffect } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import instance from "@/lib/axios";
import { getCandidateSub } from "@/redux/features/subscription/api";
import { ICandidateSub, Price } from "@/types/template";
import { notifyError } from "@/utils/toast";
import { getDate } from "@/utils/helper";
declare global {
  interface Window {
    Razorpay: any;
  }
}

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployMembershipArea = ({ setIsOpenSidebar }: IProps) => {
  const { currCandidate } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );
  const subscription = currCandidate?.subscription;

  const checkoutHandler = async (
    event: React.MouseEvent<HTMLButtonElement>,
    sub: ICandidateSub,
    price: Price
  ) => {
    if (!currCandidate) {
      notifyError("Please login to proceed");
      return;
    }
    const bodyObj = {
      amount: price.amount,
      currency: price.currency.abbreviation,
      duration: price.duration,
      user: currCandidate?._id,
      userModel: "Candidate",
      product: sub._id,
      productModel: "CandidateSub",
    };

    const {
      data: { keyId },
    } = await instance.get("/payment/getKey");

    const {
      data: { order },
    } = await instance.post("/payment/checkout", bodyObj);

    const options = {
      key: keyId,
      amount: order.amount,
      currency: order.currency,
      name: currCandidate?.firstName + currCandidate?.lastName,
      description: "Payment for subscription plan",
      image: currCandidate.avatar || "",
      order_id: order.id,
      callback_url: `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/payment/paymentVerification`,
      prefill: {
        name: currCandidate.firstName + currCandidate.lastName || "user",
        email: currCandidate.email,
        contact: currCandidate?.phoneNumber || "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#00BF58",
      },
    };

    const razor = new window.Razorpay(options);
    razor.on("payment.failed", function (response: any) {
      alert(`Payment failed: ${response.error.code}`);
    });
    razor.open();
  };

  const dispatch = useAppDispatch();
  const { candidateSub } = useAppSelector((s) => s.subscription);
  const [isYearly, setIsYearly] = React.useState<boolean>(true);

  const handleToggle = () => {
    setIsYearly((prev) => !prev);
  };

  useEffect(() => {
    getCandidateSub(dispatch);
  }, []);

  const lastPayDate = new Date(currCandidate?.paymentDate || 0);

  return (
    <>
      {subscription && (
        <div className="dashboard-body">
          <div className="position-relative">
            {/* header start */}
            <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
            {/* header end */}

            <h2 className="main-title">Membership</h2>

            <div className="membership-plan-wrapper mb-20">
              <div className="row gx-0">
                <div className="col-xxl-7 col-lg-6 d-flex flex-column">
                  <div className="column w-100 h-100">
                    <h4>Current Plan ({subscription.subscriptionType})</h4>
                    <ul className="style-none">
                      <li>
                        {subscription.offering.jobApplicationLimit !== -1
                          ? subscription.offering.jobApplicationLimit
                          : "unlimited"}{" "}
                        jobs can be Applied per month
                      </li>
                      <li>{subscription.offering.aiTokenLimit} Ai tokens</li>
                      <li>Full job search</li>
                      <li>Job Suggestions based on skills</li>
                      <li>blogs: Updates on News in Cybersecurity Trends</li>
                      <li>Job list newsletter </li>
                      <li>Applied job tracking</li>
                      {subscription.subscriptionType === "foundational" ? (
                        <>
                          <li>Limited Companies details</li>
                        </>
                      ) : (
                        <>
                          <li>Saved Jobs and Favorite Companies</li>
                          <li>Detailed Companies details</li>
                          <li>Feedback feature for each applied job</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="col-xxl-5 col-lg-6 d-flex flex-column">
                  <div className="column border-left w-100 h-100">
                    <div className="">
                      <h3 className="price m0">
                        {subscription.price[0].currency.symbol}{" "}
                        {subscription.price[0].amount}
                      </h3>
                      <div className="ps-4 flex-fill">
                        <h6>
                          subscription duration -{" "}
                          {subscription.price[0].duration}
                        </h6>
                        {currCandidate.paymentDate ? (
                          <p className="text1 d-block">
                            subscribed at{" "}
                            <span className="fw-500">
                              {getDate(lastPayDate.toLocaleDateString())}
                            </span>
                          </p>
                        ) : null}
                        {subscription.subscriptionType === "foundational" ? (
                          <p>You can anytime update the subscription plan.</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center ">
              <div className="subscription-tab align-content-center py-2  d-flex gap-3 px-2">
                <p
                  onClick={handleToggle}
                  className={`p-1 px-2 ${isYearly && "active"}`}
                >
                  Yearly
                </p>
                <p
                  onClick={handleToggle}
                  className={`p-1 px-2 ${!isYearly && "active"}`}
                >
                  Monthly
                </p>
              </div>
            </div>

            <section className="pricing-section">
              <div className="row justify-content-center">
                {candidateSub.length > 0
                  ? candidateSub.map((item) => (
                      <div className="col-lg-4 col-md-6">
                        <div className="pricing-card-one mt-25">
                          <div className="pack-name">
                            {item.subscriptionType}
                          </div>
                          {item.price.length && item.price.length > 1 ? (
                            <div className="price fw-500">
                              {!isYearly ? (
                                <>
                                  <sub>{item.price[0].currency.symbol}</sub>{" "}
                                  {item.price[0].amount}
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <sub>{item.price[1].currency.symbol}</sub>
                                  {item.price[1].amount}
                                </>
                              )}
                            </div>
                          ) : (
                            <div className="price fw-500">
                              <sub>{item.price[0].currency.symbol}</sub>{" "}
                              {item.price[0].amount}
                            </div>
                          )}
                          <ul className="style-none">
                            <li>
                              {item.offering.jobApplicationLimit !== -1
                                ? item.offering.jobApplicationLimit
                                : "unlimited"}{" "}
                              jobs can be Applied per month
                            </li>
                            <li>{item.offering.aiTokenLimit} Ai tokens</li>
                            <li>Full job search</li>
                            <li>Job Suggestions based on skills</li>
                            <li>
                              blogs: Updates on News in Cybersecurity Trends
                            </li>
                            <li>Job list newsletter </li>
                            <li>Applied job tracking</li>
                            {item.subscriptionType === "foundational" ? (
                              <>
                                <li>Limited Companies details</li>
                              </>
                            ) : (
                              <>
                                <li>Saved Jobs and Favorite Companies</li>
                                <li>Detailed Companies details</li>
                                <li>Feedback feature for each applied job</li>
                              </>
                            )}
                          </ul>
                          <button
                            onClick={(e) =>
                              checkoutHandler(
                                e,
                                item,
                                item.price[isYearly ? 1 : 0]
                              )
                            }
                            className="get-plan-btn tran3s w-100 mt-30 mx-auto "
                          >
                            {subscription.hasOwnProperty("_id") &&
                            subscription._id === item._id
                              ? "Current Plan"
                              : "Choose Plan"}
                          </button>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployMembershipArea;
