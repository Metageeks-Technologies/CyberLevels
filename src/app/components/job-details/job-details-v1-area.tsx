import React, { useEffect } from "react";
import Image from "next/image";
import type { IJobPost } from "@/types/jobPost-type";
import job_img_1 from "@/assets/images/logo/media_22.png";
import type { ICompany } from "@/types/company";
import Link from "next/link";

const JobDetailsV1Area = ({
  job,
  url,
  company,
}: {
  job: IJobPost;
  url: string;
  company?: ICompany;
}) => {
  const URL = `${process.env.NEXT_PUBLIC_HOME_ENDPOINT}${url}`;
  console.log(company);
  // console.log(job);
  // const description = job?.testQuestions?.split(`\n\n`);

  // const sections = text.split("\n\n");
  // sections.map((section, index) => {
  //   const paragraphs = section.split("\n");
  //   dynamicContent = `${dynamicContent} ${
  //     paragraphs[0].length < 30
  //       ? `<h4 >${paragraphs[0]}</h4>`
  //       : `<p >${paragraphs[0]}</p>`
  //   }   <ul>`;
  //   paragraphs.slice(1).map((paragraph, i) => {
  //     dynamicContent = `${dynamicContent} <li>${paragraph}</li>`;
  //   });
  //   dynamicContent += "</ul></div>";
  // });
  // console.log({ content: description });
  const date = new Date(job.createdAt);
  const readableString = date.toLocaleDateString();

  return (
    <section className="job-details pt-100 lg-pt-80 pb-130 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xxl-9 col-xl-8">
            <div className="details-post-data me-xxl-5 pe-xxl-4">
              <div className="post-date">
                {readableString} by
                <a href="#" className="fw-500 ms-2  text-dark">
                  {company?.name}
                </a>
              </div>
              <h3 className="post-title">{job.title}</h3>
              <ul className="share-buttons d-flex flex-wrap style-none">
                <li>
                  <a
                    target="_blank"
                    href={`https://twitter.com/intent/tweet?text=${""}&url=${URL}`}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-linkedin"></i>
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${URL}`}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-twitter"></i>
                    <span>LinkedIn</span>
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-link-45deg"></i>
                    <span>Copy</span>
                  </a>
                </li> */}
              </ul>

              {/* {description?.map((text, index) => {
                const paragraph = text.split("\n");
                // console.log("temp", paragraph);
                return (
                  <div className="post-block border-style mt-50 lg-mt-30">
                    <div className="d-flex align-items-center">
                      <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                        1
                      </div>
                      <h4 className="block-title">{paragraph[0]}</h4>
                    </div>
                    <ul className="list-type-one style-none mb-15">
                      {paragraph.splice(1).map((val, index) => {
                        return <li>{val}</li>;
                      })}
                    </ul>
                  </div>
                );
              })} */}

              <div className="post-block border-style mt-30">
                <div className="d-flex align-items-center">
                  <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                    1
                  </div>
                  <h4 className="block-title">Job Description</h4>
                </div>
                <p>
                  As a <a href="#">Product Designer</a> at WillowTree, you’ll
                  give form to ideas by being the voice and owner of product
                  decisions. You’ll drive the design direction, and then make it
                  happen!
                </p>
                <p>
                  We understand our responsibility to create a diverse,
                  equitable, and inclusive place within the tech industry, while
                  pushing to make our industry more representative.{" "}
                </p>
              </div>
              <div className="post-block border-style mt-40 lg-mt-30">
                <div className="d-flex align-items-center">
                  <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                    2
                  </div>
                  <h4 className="block-title">Responsibilities</h4>
                </div>
                <ul className="list-type-one style-none mb-15">
                  <li>
                    Collaborate daily with a multidisciplinary team of Software
                    Engineers, Researchers, Strategists, and Project Managers.
                  </li>
                  <li>
                    Co-lead ideation sessions, workshops, demos, and
                    presentations with clients on-site
                  </li>
                  <li>
                    Push for and create inclusive, accessible design for all
                  </li>
                  <li>
                    Maintain quality of the design process and ensure that when
                    designs are translated into code they accurately reflect the
                    design specifications.
                  </li>
                  <li>
                    Sketch, wireframe, build IA, motion design, and run
                    usability tests
                  </li>
                  <li>
                    Design pixel perfect responsive UI’s and understand that
                    adopting common interface pattern is better for UX than
                    reinventing the wheel
                  </li>
                  <li>
                    Ensure content strategy and design are perfectly in-sync
                  </li>
                  <li>
                    Give and receive design critique to help constantly refine
                    and push our work
                  </li>
                </ul>
              </div>

              <div className="post-block border-style mt-40 lg-mt-30">
                <div className="d-flex align-items-center">
                  <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                    3
                  </div>
                  <h4 className="block-title">Benefits:</h4>
                </div>
                <ul className="list-type-two style-none mb-15">
                  {job?.benefits?.map((val, index) => {
                    return <li key={index}>{val}</li>;
                  })}
                  {/* <li>We are a remote-first company.</li>
                  <li>
                    100% company-paid health insurance premiums for you & your
                    dependents
                  </li>
                  <li>Vacation stipend</li>
                  <li>Unlimited paid vacation and paid company holidays</li>
                  <li>Monthly wellness/gym stipend</li> */}
                </ul>
              </div>
            </div>
          </div>
          {/* side section */}
          <div className="col-xxl-3 col-xl-4">
            <div className="job-company-info ms-xl-5 ms-xxl-0 lg-mt-50">
              <Image
                // src={job_img_1}
                src={company?.logo as string}
                alt="logo"
                className="lazy-img m-auto logo"
                width={60}
                height={60}
              />
              <div className="text-md text-dark text-center mt-15 mb-20 text-capitalize">
                {company?.name}
              </div>

              <div className="border-top mt-40 pt-40">
                <ul className="job-meta-data row style-none">
                  <li className="col-xl-7 col-md-4 col-sm-6">
                    <span>Salary</span>
                    <div>
                      $ {job.salary.minimum}-{job.salary.maximum} PA
                    </div>
                  </li>
                  <li className="col-xl-5 col-md-4 col-sm-6">
                    <span>Expertise</span>
                    {/* <div>{job.primarySkills.join(",")}</div> */}
                    <div>{job.primarySkills[0]}</div>
                  </li>
                  <li className="col-xl-7 col-md-4 col-sm-6">
                    <span>Location</span>
                    <div>{job.location}</div>
                  </li>
                  <li className="col-xl-5 col-md-4 col-sm-6">
                    <span>Job Type</span>
                    <div>{job.jobType[0]}</div>
                  </li>
                  <li className="col-xl-7 col-md-4 col-sm-6">
                    <span>Date</span>
                    <div>{readableString} </div>
                  </li>
                  <li className="col-xl-5 col-md-4 col-sm-6">
                    <span>Experience</span>
                    <div>{job.preferredExperience[0]}</div>
                  </li>
                </ul>
                <div className="job-tags d-flex flex-wrap pt-15">
                  {job.primarySkills &&
                    job.primarySkills.map((t, i) => (
                      <a key={i} href="#">
                        {t}
                      </a>
                    ))}
                  {job.secondarySkills &&
                    job.secondarySkills.map((t, i) => (
                      <a key={i} href="#">
                        {t}
                      </a>
                    ))}
                </div>
                <a href="#" className="btn-one w-100 mt-25">
                  Apply Now
                </a>
              </div>
            </div>
            <div className="job-company-info ms-xl-5 ms-xxl-0 mt-30 lg-mt-50">
              {/* <Image
                src={job_img_1}
                alt="logo"
                className="lazy-img m-auto logo"
                width={60}
                height={60}
              />
             
              <a href="#" className="website-btn tran3s">
                Visit website
              </a> */}
              <Link
                href={`company-details/${company?._id}`}
                className="website-btn tran3s"
              >
                Visit Company
              </Link>
              <div className="text-md text-dark text-center mt-15 mb-20 text-capitalize">
                About Company
              </div>

              <div className="border-top ">
                <ul className="job-meta-data row style-none">
                  <li className="col-xl-7 col-md-4 col-sm-6">
                    <span>Team size</span>
                    <div>{company?.teamSize} People</div>
                  </li>
                  <li className="col-xl-5 col-md-4 col-sm-6">
                    <span>Category</span>
                    <div>{company?.category}</div>
                  </li>
                  <li className="col-xl-7 col-md-4 col-sm-6">
                    <span>Founded Date</span>
                    <div>{readableString} </div>
                  </li>
                  <li className="col-xl-5 col-md-4 col-sm-6">
                    <span>Experience</span>
                    <div>{job.preferredExperience[0]}</div>
                  </li>
                </ul>
                <div className="job-tags d-flex flex-wrap pt-15">
                  {company?.benefits &&
                    company.benefits.map((t, i) => (
                      <a key={i} href="#">
                        {t}
                      </a>
                    ))}
                </div>
                {/* <a href="#" className="btn-one w-100 mt-25">
                  Apply Now
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsV1Area;
