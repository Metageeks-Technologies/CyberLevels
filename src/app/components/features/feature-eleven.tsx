"use client";
import React, { useState } from "react";
import AccordionItem from "../accordion/accordion-item";
import VideoPopup from "../common/video-popup";
import CounterOne from "../counter/counter-one";

const FeatureEleven = () => {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  return (
    <>
      <section className="text-feature-three position-relative pt-100 lg-pt-80 md-pt-50">
        <div className="container">
          <div className="row">
            <div className="col-xxl-11 m-auto">
              <div className="row">
                <div className="col-lg-5">
                  <div className="title-one mt-30 md-mb-40">
                    <h2 className="fw-500">
                      We’ve been helping customer globally.
                    </h2>
                  </div>
                </div>
                <div className="col-lg-6 ms-auto">
                  <div className="wow fadeInRight">
                    <div
                      className="accordion accordion-style-one color-two ps-xxl-5 ms-xxl-4"
                      id="accordionOne"
                    >
                      <AccordionItem
                        id="one"
                        isShow={true}
                        title="Who we are?"
                        desc="Welcome to CyberLevels, the future of job searching and recruitment. We are an innovative AI-based job portal dedicated to transforming the way job seekers and employers connect. Our platform leverages cutting-edge artificial intelligence to match the right talent with the right opportunities, ensuring a seamless and efficient hiring process for all."
                        parent="accordionOne"
                      />
                      <AccordionItem
                        id="two"
                        title="What’s our goal"
                        desc="At CyberLevels, our mission is to bridge the gap between job seekers and employers by providing an intelligent, best AI based services , user-friendly, and efficient platform that revolutionizes the recruitment landscape. We aim to empower individuals by helping them find their dream jobs and to support companies in discovering the perfect candidates for their needs."
                        parent="accordionOne"
                      />
                      {/* <AccordionItem
                        id="three"
                        title="What We Do"
                        desc="Our founders Dustin Moskovitz and Justin lorem Rosenstein met while leading Engineering teams at Facebook quesi. Lorem ipsum dolor sit, amet consectetur adipisicing elit."
                        parent="accordionOne"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureEleven;
