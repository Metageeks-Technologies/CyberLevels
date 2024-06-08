import FooterOne from "@/layouts/footers/footer-one";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import { Metadata } from "next";
import CandidateProfileBreadcrumb from "../components/candidate-details/profile-bredcrumb";
import FeatureOne from "../components/features/feature-one";

export const metadata: Metadata = {
  title: "Term and Conditions",
};

const AboutUsPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* breadcrumb start */}

        {/* breadcrumb end */}

        <section className="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100 md-pt-80 pb-180 xl-pb-150">
          <div className="container">
            <div className="row">
              <div className="col order-lg-last">
                <div className="ps-xxl-4 wow fadeInRight">
                  <div className="title-one">
                    <h3>Introduction</h3>
                  </div>
                  <p className="mt-20 md-mt-20 mb-40 md-mb-20">
                    Welcome to CyberLevels. These Terms of Use govern your use
                    of our website, services, and applications (collectively,
                    the "Service"). By accessing or using our Service, you agree
                    to be bound by these Terms of Use. If you do not agree with
                    any part of these terms, you must not use our Service.
                  </p>

                  <div className="title-one">
                    <h3>Acceptance of Terms</h3>
                  </div>
                  <p className="mt-20 md-mt-20 mb-40 md-mb-20">
                    By accessing, browsing, or using the Service, you
                    acknowledge that you have read, understood, and agree to be
                    bound by these Terms of Use, our Privacy Policy, and all
                    applicable laws and regulations. If you do not agree to
                    these terms, please do not use our Service.
                  </p>
                  <div className="title-one">
                    <h3>User Accounts</h3>
                  </div>

                  <ul className="list-style-one style-none">
                    <li>
                      <strong>Registration:</strong> To use certain features of
                      our Service, you must create an account. You agree to
                      provide accurate, current, and complete information during
                      the registration process and to update such information to
                      keep it accurate, current, and complete.
                    </li>
                    <li>
                      <strong>Account Security:</strong> You are responsible for
                      maintaining the confidentiality of your account login
                      credentials and for all activities that occur under your
                      account. You agree to notify us immediately of any
                      unauthorized use of your account or any other breach of
                      security.
                    </li>
                  </ul>

                  <div className="title-one mt-4">
                    <h3>Use of the Service</h3>
                  </div>

                  <ul className="list-style-one style-none">
                    <li>
                      <strong> Eligibility: </strong> You must be at least 18
                      years old to use our Service. By using our Service, you
                      represent and warrant that you have the right, authority,
                      and capacity to enter into these Terms of Use and to abide
                      by all the terms and conditions herein.
                    </li>
                    <li>
                      <strong>Permitted Uses:</strong> You may use the Service
                      for lawful purposes only. You agree not to use the Service
                      in any way that violates any applicable local, provincial,
                      national, or international law or regulation.
                    </li>
                    <li>
                      <strong>Prohibited Uses:</strong>
                      <ul style={{ listStyle: "none" }}>
                        <li>
                          Use the Service for any unauthorized or illegal
                          purposes .
                        </li>
                        <li>
                          Post or transmit any content that is unlawful,
                          harmful, threatening, abusive, harassing, defamatory,
                          vulgar, obscene, or otherwise objectionable.
                        </li>
                        <li>
                          Impersonate any person or entity or falsely state or
                          otherwise misrepresent your affiliation with a person
                          or entity.
                        </li>
                        <li>
                          Use any automated means, including robots, crawlers,
                          or data mining tools, to download, monitor, or use
                          data from the Service.
                        </li>
                        <li>
                          Interfere with or disrupt the integrity or performance
                          of the Service.
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <div className="title-one mt-4">
                    <h3>Intellectual Property</h3>
                  </div>
                  <ul className="list-style-one style-none">
                    <li>
                      <strong>Ownership: </strong> All content, trademarks,
                      service marks, trade names, logos, and other intellectual
                      property displayed on the Service are the property of
                      CyberLevels or their respective owners. You agree not to
                      use these materials without prior written consent.
                    </li>
                    <li>
                      <strong>User Content:</strong> By submitting content to
                      our Service, you grant CyberLevels a worldwide,
                      non-exclusive, royalty-free license to use, copy, modify,
                      distribute, and display such content in connection with
                      providing the Service.
                    </li>
                  </ul>

                  <div className="title-one mt-4">
                    <h3>Fees and Payments</h3>
                  </div>
                  <ul className="list-style-one style-none">
                    <li>
                      <strong>Pricing: </strong> Some features of our Service
                      may require payment of fees. You agree to pay all
                      applicable fees in connection with your use of the
                      Service.
                    </li>
                    <li>
                      <strong>Billing:</strong> We use a third-party payment
                      processor to handle billing. By providing a payment
                      method, you authorize us to charge the applicable fees to
                      your designated payment method.
                    </li>
                    <li>
                      <strong>Refunds:</strong> Fees are non-refundable except
                      as required by law or as otherwise stated in these Terms.
                    </li>
                  </ul>

                  <div className="title-one mt-4">
                    <h3>Disclaimers and Limitation of Liability</h3>
                  </div>
                  <ul className="list-style-one style-none">
                    <li>
                      <strong>No Warranty: </strong> The Service is provided on
                      an "as is" and "as available" basis without any warranties
                      of any kind, express or implied. We do not warrant that
                      the Service will be uninterrupted, error-free, or free of
                      viruses or other harmful components.
                    </li>
                    <li>
                      <strong>Limitation of Liability:</strong> In no event
                      shall CyberLevels, its affiliates, or their respective
                      officers, directors, employees, agents, or licensors be
                      liable for any direct, indirect, incidental, special, or
                      consequential damages resulting from the use or inability
                      to use the Service, including but not limited to damages
                      for loss of profits, use, data, or other intangibles, even
                      if we have been advised of the possibility of such damages
                    </li>
                  </ul>

                  <div className="title-one mt-4">
                    <h3>Indemnification</h3>
                  </div>
                  <p>
                    You agree to indemnify, defend, and hold harmless
                    CyberLevels, its affiliates, and their respective officers,
                    directors, employees, agents, and licensors from and against
                    any claims, liabilities, damages, losses, costs, and
                    expenses, including reasonable legal fees, arising out of or
                    in any way connected with your access to or use of the
                    Service, your violation of these Terms, or your infringement
                    of any intellectual property or other rights of any third
                    party.
                  </p>

                  <div className="title-one mt-4">
                    <h3>Changes to Terms & Conditions</h3>
                  </div>
                  <p className="mt-20 md-mt-20 mb-40 md-mb-20">
                    We may update these Terms from time to time. We will notify
                    you of any changes by posting the new Terms on our website.
                    Your continued use of the Service after any such changes
                    constitutes your acceptance of the new Terms.
                  </p>
                  <div className="title-one mt-4">
                    <h3>Governing Law</h3>
                  </div>
                  <p>
                    These Terms are governed by and construed in accordance with
                    the laws of the Province of [Your Province] and the federal
                    laws of Canada applicable therein, without regard to its
                    conflict of law principles. You agree to submit to the
                    exclusive jurisdiction of the courts located in [Your
                    Province], Canada, to resolve any dispute arising out of
                    these Terms or the Service.
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

        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default AboutUsPage;
