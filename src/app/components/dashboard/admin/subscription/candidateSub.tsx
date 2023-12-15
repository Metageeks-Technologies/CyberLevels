"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getCandidateSub } from "@/redux/features/subscription/api";
import { IEmployerSub, Offering } from "@/types/template";
import { camelCaseToNormal } from "@/utils/helper";

const OfferingList = ({ offeringData }: { offeringData: Offering }) => {
  const renderOfferingItems = () => {
    return Object.entries(offeringData).map(([key, value]) => {
      // Customize the rendering based on your requirements
      let displayKey = key;
      let displayValue = value;

      return <li key={key}>{`${camelCaseToNormal(key)}: ${displayValue}`}</li>;
    });
  };

  return <ul className="style-none">{renderOfferingItems()}</ul>;
};

const CandidateSub = () => {
  const dispatch = useAppDispatch();
  const { employSub } = useAppSelector((s) => s.subscription);

  useEffect(() => {
    getCandidateSub(dispatch);
  }, []);
  console.log(employSub);
  return (
    <section className="pricing-section">
      <div className="row justify-content-center">
        {employSub.map((subObj: IEmployerSub, index: number) => (
          <div className="col-lg-4 col-md-6">
            <div key={subObj._id} className="pricing-card-one border-0 mt-25">
              <div className="pack-name">{subObj.subscriptionType}</div>
              <div className="price fw-500">
                {subObj.price.amount} {subObj.price.currency}
              </div>
              <ul className="style-none">
                <OfferingList offeringData={subObj.offering as Offering} />
              </ul>
              <a href="#" className="get-plan-btn tran3s w-100 mt-30">
                {subObj.duration} Plan
              </a>
            </div>
          </div>
        ))}

        {/* <div className="col-lg-4 col-md-6">
                <div className="pricing-card-one popular-two mt-25">
                  <div className="popular-badge">popular</div>
                  <div className="pack-name">Gold</div>
                  <div className="price fw-500">
                    <sub>$</sub> 27.<sup>99</sup>
                  </div>
                  <ul className="style-none">
                    <li>30 job posting </li>
                    <li>15 featured job </li>
                    <li>Job post live for 60 days </li>
                  </ul>
                  <a href="#" className="get-plan-btn tran3s w-100 mt-30">
                    Choose Plan
                  </a>
                </div>
              </div>


              <div className="col-lg-4 col-md-6">
                <div className="pricing-card-one border-0 mt-25">
                  <div className="pack-name">Diamond</div>
                  <div className="price fw-500">
                    <sub>$</sub> 39.<sup>99</sup>
                  </div>
                  <ul className="style-none">
                    <li>60 job posting </li>
                    <li>30 featured job </li>
                    <li>Job post live for 130 days </li>
                  </ul>
                  <a href="#" className="get-plan-btn tran3s w-100 mt-30">
                    Choose Plan
                  </a>
                </div>
              </div> */}
      </div>
    </section>
  );
};

export default CandidateSub;
