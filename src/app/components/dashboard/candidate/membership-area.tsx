import React from "react";
import DashboardHeader from "../candidate/dashboard-header";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import instance from "@/lib/axios";

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
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const bodyObj = {
      amount: 100,
      currency: "INR",
      user: currCandidate?._id,
      userModel: "Candidate",
      product: "657c77e3b1d24ba5bfe3cdde",
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
      name: "Shiva Shah",
      description: "Testing of RazorPay",
      image: "https://avatars.githubusercontent.com/u/86485099?v=4",
      order_id: order.id,
      callback_url: `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/payment/paymentVerification`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
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
                    <h4>Current Plan ({subscription.plan})</h4>
                    <p>
                      Unlimited access to our legal document library and online
                      rental application tool, billed monthly.
                    </p>
                  </div>
                </div>
                <div className="col-xxl-5 col-lg-6 d-flex flex-column">
                  <div className="column border-left w-100 h-100">
                    <div className="d-flex">
                      <h3 className="price m0">₹00</h3>
                      <div className="ps-4 flex-fill">
                        <h6>Monthly Plan</h6>
                        <span className="text1 d-block">
                          Your subscription renews{" "}
                          <span className="fw-500">July 12th, 2023</span>
                        </span>
                        <a href="#" className="cancel-plan tran3s">
                          Cancel Current Plan
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="pricing-section">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6">
                  <div className="pricing-card-one border-0 mt-25">
                    <div className="pack-name">Standard</div>
                    <div className="price fw-500">0</div>
                    <ul className="style-none">
                      <li>15 job Post </li>
                      <li>7 featured job </li>
                      <li>No Suggestion to employer </li>
                    </ul>
                    <a href="#" className="get-plan-btn tran3s w-100 mt-30">
                      Current Plan
                    </a>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="pricing-card-one popular-two mt-25 ">
                    <div className="popular-badge">popular</div>
                    <div className="pack-name">Gold</div>
                    <div className="price fw-500">
                      <sub>₹</sub> 277.<sup>99</sup>
                    </div>
                    <ul className="style-none">
                      <li>30 job Post </li>
                      <li>15 featured job </li>
                      <li>
                        1.5X high Chance for getting suggested to the employer{" "}
                      </li>
                    </ul>
                    <button
                      onClick={checkoutHandler}
                      className="get-plan-btn tran3s w-100 mt-30 mx-auto "
                    >
                      Choose Plan
                    </button>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="pricing-card-one border-0 mt-25">
                    <div className="pack-name">Diamond</div>
                    <div className="price fw-500">
                      <sub>₹</sub> 399.<sup>99</sup>
                    </div>
                    <ul className="style-none">
                      <li>60 job post </li>
                      <li>30 featured job </li>
                      <li>
                        1.5X high Chance for getting suggested to the employer.{" "}
                      </li>
                      <li>View the linting Company.</li>
                    </ul>
                    <a href="#" className="get-plan-btn tran3s w-100 mt-30">
                      Choose Plan
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployMembershipArea;
