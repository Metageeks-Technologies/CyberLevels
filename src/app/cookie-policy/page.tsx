import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/footer-one";

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
                    At CyberLevels, we use cookies and similar tracking
                    technologies to enhance your experience on our website and
                    to provide you with personalized content and targeted
                    advertisements. This Cookie Policy explains what cookies
                    are, how we use them, and how you can manage your cookie
                    preferences
                  </p>

                  <div className="title-one">
                    <h3>What Are Cookies?</h3>
                  </div>
                  <ul className="list-style-one style-none">
                    Cookies are small text files that are stored on your device
                    (computer, smartphone, tablet) when you visit a website.
                    They help websites remember information about your visit,
                    which can make your next visit easier and the site more
                    useful to you. Cookies can be categorized as follows:
                    <li>
                      <strong>Session Cookies:</strong> Temporary cookies that
                      expire when you close your browser.
                    </li>
                    <li>
                      <strong>Persistent Cookies:</strong> Cookies that remain
                      on your device for a set period or until you delete them.
                    </li>
                    <li>
                      <strong>First-Party Cookies:</strong> Cookies set by the
                      website you are visiting.
                    </li>
                    <li>
                      <strong>Third-Party Cookies:</strong> Cookies set by a
                      third party, such as analytics or advertising services.
                    </li>
                  </ul>
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
