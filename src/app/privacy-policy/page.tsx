import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/footer-one";
import PrivacyPolicyArea from "../components/privacy-policy/privacy-policyArea";

export const metadata: Metadata = {
  title: "Privacy-policy",
};

const PrivacyPolicyPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}
        <section className="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100 md-pt-80 pb-180 xl-pb-150">
          <div className="container">
            <div className="row">
              <div className="col order-lg-last">
                <div className="ps-xxl-4 wow fadeInRight">
                  <div className="title-one">
                    <h3>Introduction</h3>
                  </div>
                  <p className="mt-20 md-mt-20 mb-40 md-mb-20">
                    At CyberLevels, we are committed to protecting your privacy
                    and ensuring that your personal information is handled in a
                    safe and responsible manner. This Privacy Policy outlines
                    how we collect, use, disclose, and protect your information
                    when you use our website, services, and applications
                    (collectively, the "Service").
                  </p>

                  <div className="title-one">
                    <h3>Information We Collect</h3>
                  </div>
                  <ul className="list-style-one style-none">
                    <li>
                      <strong>Personal Information:</strong> This includes your
                      name, email address, phone number, postal address, resume
                      details, and any other information you provide when you
                      create an account, apply for jobs, or communicate with us.
                    </li>
                    <li>
                      <strong>Usage Data:</strong> We collect information about
                      your interactions with our Service, such as the pages you
                      visit, the features you use, and the actions you take.
                    </li>
                    <li>
                      <strong>Device Information:</strong> We collect
                      information about the devices you use to access our
                      Service, including IP address, browser type, operating
                      system, and device identifiers.
                    </li>
                    <li>
                      <strong>Cookies and Tracking Technologies:</strong> We use
                      cookies and similar tracking technologies to collect
                      information about your usage of our Service and to improve
                      your experience. You can manage your cookie preferences
                      through your browser settings.
                    </li>
                  </ul>

                  <div className="title-one mt-4">
                    <h3>How We Use Your Information</h3>
                  </div>

                  <ul className="list-style-one style-none">
                    <li>
                      <strong>Providing and Improving Our Service:</strong>
                      To operate and maintain our Service, to improve our
                      Service, and to develop new features and functionalities.
                    </li>
                    <li>
                      <strong>Personalizing Your Experience:</strong>
                      To tailor the content and information we send or display
                      to you, to offer location customization, and to provide
                      personalized help and instructions.
                    </li>
                    <li>
                      <strong>Communication:</strong>
                      To send you administrative information, such as updates to
                      our policies, as well as marketing communications, job
                      alerts, and other information that may be of interest to
                      you.
                    </li>
                    <li>
                      <strong>Job Applications:</strong>
                      To process and manage your job applications and to
                      communicate with you about the status of your
                      applications.
                    </li>
                    <li>
                      <strong>Compliance:</strong>: To comply with legal
                      obligations, to resolve disputes, and to enforce our
                      agreements.
                    </li>
                  </ul>

                  <div className="title-one mt-4">
                    <h3>Sharing Your Information</h3>
                  </div>

                  <ul className="list-style-one style-none">
                    <li>
                      <strong>Employers and Recruiters: </strong> When you apply
                      for a job or express interest in a job, we share your
                      information with the relevant employers and recruiters.
                    </li>
                    <li>
                      <strong>Service Providers</strong>
                      We may share your information with third-party service
                      providers who perform services on our behalf, such as
                      payment processing, data analysis, email delivery, hosting
                      services, and customer service
                    </li>
                    <li>
                      <strong>Legal Compliance:</strong> We may disclose your
                      information to comply with legal obligations, respond to
                      legal requests, and protect our rights and interests.
                    </li>
                    <li>
                      <strong>Business Transfers:</strong>If we are involved in
                      a merger, acquisition, or sale of assets, your information
                      may be transferred as part of that transaction.
                    </li>
                  </ul>

                  <div className="title-one mt-4">
                    <h3>Data Security</h3>
                  </div>
                  <p>
                    We implement a variety of security measures to protect the
                    safety of your personal information. However, no method of
                    transmission over the internet or method of electronic
                    storage is 100% secure, and we cannot guarantee absolute
                    security.
                  </p>
                  <div className="title-one mt-4">
                    <h3>Data Retention</h3>
                  </div>
                  <p>
                    We retain your personal information for as long as necessary
                    to fulfill the purposes for which we collected it, including
                    any legal, accounting, or reporting requirements. When your
                    information is no longer needed, we will securely delete or
                    anonymize it.
                  </p>
                  <div className="title-one mt-4">
                    <h3>Your Rights</h3>
                  </div>
                  <ul className="list-style-one style-none">
                    Under Canadian law, you have the following rights regarding
                    your personal information:
                    <li>
                      <strong> Access: </strong> You have the right to access
                      the personal information we hold about you.
                    </li>
                    <li>
                      <strong>Correction:</strong>You have the right to request
                      that we correct any inaccuracies in your personal
                      information.
                    </li>
                    <li>
                      <strong>Deletion:</strong>You have the right to request
                      that we delete your personal information, subject to
                      certain exceptions.
                    </li>
                    <li>
                      <strong>Withdrawal of Consent:</strong>You have the right
                      to file a complaint with the relevant privacy authority if
                      you believe that we have not complied with applicable
                      privacy laws.
                    </li>
                  </ul>

                  <div className="title-one mt-4">
                    <h3>Third-Party Links</h3>
                  </div>
                  <p>
                    Our Service may contain links to third-party websites or
                    services. We are not responsible for the privacy practices
                    of these third parties, and we encourage you to review their
                    privacy policies.
                  </p>

                  <div className="title-one mt-4">
                    <h3>Changes to This Privacy Policy</h3>
                  </div>
                  <p>
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on our website. Your continued use of the Service after any
                    such changes constitutes your acceptance of the new Privacy
                    Policy.
                  </p>

                  <div className="title-one mt-4">
                    <h3>Contact Us</h3>
                  </div>
                  <p>
                    If you have any questions about these Terms of Use, please
                    contact us at: contact@cyberlevels.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default PrivacyPolicyPage;
