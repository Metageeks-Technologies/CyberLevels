import React from "react";
import Link from "next/link";
import AccordionItem from "../accordion/accordion-item";

const FaqArea = () => {
  return (
    <section className="faq-section position-relative pt-100 lg-pt-80">
      <div className="container">
        <ul
          className="nav nav-tabs border-0 justify-content-center"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#fc1"
              role="tab"
            >
              All
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#fc2"
              role="tab"
            >
              General Questions
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#fc3"
              role="tab"
            >
              Job Seekers
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#fc4"
              role="tab"
            >
              Employers
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#fc5"
              role="tab"
            >
              Privacy and Security
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#fc6"
              role="tab"
            >
              {" "}
              Support
            </button>
          </li>
        </ul>
        <div className="bg-wrapper mt-60 lg-mt-40">
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" role="tabpanel" id="fc1">
              <div className="accordion accordion-style-two" id="accordionTwo">
                <AccordionItem
                  id="six"
                  title="What is CyberLevels?"
                  desc="CyberLevels is an AI-based job portal designed to connect job seekers with potential employers efficiently. Our platform uses advanced AI algorithms to match candidates with the best job opportunities based on their skills, experience, and preferences."
                  parent="accordionThree"
                />
                <AccordionItem
                  id="seven"
                  title="How do I create an account?"
                  desc="To create an account, Use LinkedIn or Google Login on the Login button at the top right corner of our homepage. After login by using Google Login or LinkedIn login ,please complete your profile on your own Dashboard section."
                  parent="accordionThree"
                />
                <AccordionItem
                  id="eight"
                  title="Is there a fee to use CyberLevels?"
                  desc="Creating an account and searching for jobs is free for job seekers. Employers may need to pay for premium job postings and other advanced features.If Job seekers looking for some advanced features ,may need to get a different plan."
                  parent="accordionThree"
                />
                <AccordionItem
                  id="thirteen"
                  title="How do I apply for a job?"
                  desc={`Once you find a job listing that interests you, click on the "Apply Now" button. You may need to upload your resume and cover letter or fill out an online application form.`}
                  parent="accordionFour"
                />
                <AccordionItem
                  id="nine"
                  title="Can I save jobs to apply for later?"
                  desc={`Yes, you can save jobs by clicking on the "Save Job" button on the job listing page. You can view your saved jobs anytime by going to your account dashboard.`}
                  parent="accordionFour"
                />
                <AccordionItem
                  id="ten"
                  title="How does the AI match me with jobs?"
                  desc={`Our AI algorithm analyzes your resume, profile information, and job preferences to match you with relevant job opportunities. It takes into account factors like skills to suggest the best matches.`}
                  parent="accordionFour"
                />
                <AccordionItem
                  id="eleven"
                  title="Can I update my profile and resume?"
                  desc={`Yes, you can update your profile and resume at any time by logging into your account and navigating to the "Dashboard" section.`}
                  parent="accordionFour"
                />
                <AccordionItem
                  id="twelve"
                  title="What if I forget my password?"
                  desc={`Dependent on Google or Linkedin Login process.`}
                  parent="accordionFour"
                />
                <AccordionItem
                  id="fourteen"
                  title="How do I post a job?"
                  desc={`To post a job, you need to login as an employer account. Once logged in, click on the "Post a Job" button and fill out the job details. You can choose from various posting options based on your needs and based on your plan selected.`}
                  parent="accordionFive"
                />
                <AccordionItem
                  id="fifteen"
                  title="How can I search for candidates?"
                  desc={`Employers can search for candidates by using the "Search Candidates" feature. You can filter candidates based on various criteria such as skills, experience, and location.`}
                  parent="accordionFive"
                />
                <AccordionItem
                  id="sixteen"
                  title="What are premium job postings? "
                  desc={`Premium job postings offer enhanced visibility and reach to attract more qualified candidates. These postings may appear at the top of search results and in targeted job seeker emails.`}
                  parent="accordionFive"
                />
                <AccordionItem
                  id="seventeen"
                  title="How do I manage my job postings?"
                  desc={`You can manage your job postings by logging into your employer account and navigating to the "My Jobs" section. Here, you can edit, pause, or delete your job listings.`}
                  parent="accordionFive"
                />
                <AccordionItem
                  id="eighteen"
                  title="How is my personal information protected?"
                  desc="We take your privacy seriously and use advanced security measures to protect your personal information. For more details, please review our Privacy Policy."
                  parent="accordionSix"
                />
                <AccordionItem
                  id="nineteen"
                  title="How can I contact customer support? "
                  desc="If you have any questions or need assistance, you can contact our customer support team via email at contact@cyberlevels.com"
                  parent="accordionSeven"
                />
                <AccordionItem
                  id="twenty"
                  title="Where can I find more information about using the platform?"
                  desc="You can reach out to us contact@cyberlevels.com using the subject of email “Training”.Our expert team will give live training to use this AI based platform."
                  parent="accordionSeven"
                />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc2">
              <div
                className="accordion accordion-style-two"
                id="accordionThree"
              >
                <AccordionItem
                  id="six"
                  title="What is CyberLevels?"
                  desc="CyberLevels is an AI-based job portal designed to connect job seekers with potential employers efficiently. Our platform uses advanced AI algorithms to match candidates with the best job opportunities based on their skills, experience, and preferences."
                  parent="accordionThree"
                />
                <AccordionItem
                  id="seven"
                  title="How do I create an account?"
                  desc="To create an account, Use LinkedIn or Google Login on the Login button at the top right corner of our homepage. After login by using Google Login or LinkedIn login ,please complete your profile on your own Dashboard section."
                  parent="accordionThree"
                />
                <AccordionItem
                  id="eight"
                  title="Is there a fee to use CyberLevels?"
                  desc="Creating an account and searching for jobs is free for job seekers. Employers may need to pay for premium job postings and other advanced features.If Job seekers looking for some advanced features ,may need to get a different plan."
                  parent="accordionThree"
                />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc3">
              <div className="accordion accordion-style-two" id="accordionFour">
                <AccordionItem
                  id="eight"
                  title="How do I apply for a job?"
                  desc={`Once you find a job listing that interests you, click on the "Apply Now" button. You may need to upload your resume and cover letter or fill out an online application form.`}
                  parent="accordionFour"
                />
                <AccordionItem
                  id="nine"
                  title="Can I save jobs to apply for later?"
                  desc={`Yes, you can save jobs by clicking on the "Save Job" button on the job listing page. You can view your saved jobs anytime by going to your account dashboard.`}
                  parent="accordionFour"
                />
                <AccordionItem
                  id="ten"
                  title="How does the AI match me with jobs?"
                  desc={`Our AI algorithm analyzes your resume, profile information, and job preferences to match you with relevant job opportunities. It takes into account factors like skills to suggest the best matches.`}
                  parent="accordionFour"
                />
                <AccordionItem
                  id="eleven"
                  title="Can I update my profile and resume?"
                  desc={`Yes, you can update your profile and resume at any time by logging into your account and navigating to the "Dashboard" section.`}
                  parent="accordionFour"
                />
                <AccordionItem
                  id="twelve"
                  title="What if I forget my password?"
                  desc={`Dependent on Google or Linkedin Login process.`}
                  parent="accordionFour"
                />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc4">
              <div className="accordion accordion-style-two" id="accordionFive">
                <AccordionItem
                  id="ten"
                  title="How do I post a job?"
                  desc={`To post a job, you need to login as an employer account. Once logged in, click on the "Post a Job" button and fill out the job details. You can choose from various posting options based on your needs and based on your plan selected.`}
                  parent="accordionFive"
                />
                <AccordionItem
                  id="eleven"
                  title="How can I search for candidates?"
                  desc={`Employers can search for candidates by using the "Search Candidates" feature. You can filter candidates based on various criteria such as skills, experience, and location.`}
                  parent="accordionFive"
                />
                <AccordionItem
                  id="twelve"
                  title="What are premium job postings? "
                  desc={`Premium job postings offer enhanced visibility and reach to attract more qualified candidates. These postings may appear at the top of search results and in targeted job seeker emails.`}
                  parent="accordionFive"
                />
                <AccordionItem
                  id="twelve"
                  title="How do I manage my job postings?"
                  desc={`You can manage your job postings by logging into your employer account and navigating to the "My Jobs" section. Here, you can edit, pause, or delete your job listings.`}
                  parent="accordionFive"
                />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc5">
              <div className="accordion accordion-style-two" id="accordionSix">
                <AccordionItem
                  id="twelve"
                  title="How is my personal information protected?"
                  desc="We take your privacy seriously and use advanced security measures to protect your personal information. For more details, please review our Privacy Policy."
                  parent="accordionSix"
                />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc6">
              <div
                className="accordion accordion-style-two"
                id="accordionSeven"
              >
                <AccordionItem
                  id="fourteen"
                  title="How can I contact customer support? "
                  desc="If you have any questions or need assistance, you can contact our customer support team via email at contact@cyberlevels.com"
                  parent="accordionSeven"
                />
                <AccordionItem
                  id="fifteen"
                  title="Where can I find more information about using the platform?"
                  desc="You can reach out to us contact@cyberlevels.com using the subject of email “Training”.Our expert team will give live training to use this AI based platform."
                  parent="accordionSeven"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center border-bottom pb-150 lg-pb-50 mt-60 lg-mt-40 wow fadeInUp">
          <div className="title-three mb-30">
            <h2 className="fw-normal">Don’t get your answer?</h2>
          </div>
          <Link href="/contact" className="btn-one">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqArea;
