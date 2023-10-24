import React from "react";
import { ICandidate } from "@/types/user-type";
import Image from "next/image";
import Link from "next/link";
import job_img_1 from "@/assets/images/logo/media_22.png";

// item.favorite

const CandidateListItem = ({
  item,
  style_2 = false,
}: {
  item: ICandidate;
  style_2?: boolean;
}) => {
  return (
    <div
      className={`candidate-profile-card ${false ? "favourite" : ""} ${
        style_2 ? "border-0" : ""
      } list-layout mb-25`}
    >
      <div className="d-flex">
        <div className="cadidate-avatar online position-relative d-block me-auto ms-auto">
          <Link href="/candidate-profile-v2" className="rounded-circle">
            <Image
              src={job_img_1}
              alt="image"
              className="lazy-img rounded-circle"
            />
          </Link>
        </div>
        <div className="right-side">
          <div className="row gx-1 align-items-center">
            <div className="col-xl-3">
              <div className="position-relative">
                <h4 className="candidate-name mb-0">
                  <Link href="/candidate-profile-v2" className="tran3s">
                    {item.firstName.slice(0, 3)}...
                  </Link>
                </h4>
                {/* <div className="candidate-post">{item.title}</div> */}
                <ul className="cadidate-skills style-none d-flex align-items-center">
                  {item.skills.slice(0, 3).map((s, i) => (
                    <li key={i}>{s.split(" ")[0]}</li>
                  ))}
                  {item.skills.length > 3 && (
                    <li className="more">
                      {item.skills.length - item.skills.slice(0, 3).length}+
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Salary</span>
                <div>$ 3-4 PA</div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Location</span>
                <div>
                  {item.location.city},{item.location.country}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4">
              <div className="d-flex justify-content-lg-end">
                <Link
                  href="/candidate-profile-v2"
                  className="save-btn text-center rounded-circle tran3s mt-10"
                >
                  <i className="bi bi-heart"></i>
                </Link>
                <Link
                  href="/candidate-profile-v2"
                  className="profile-btn tran3s ms-md-2 mt-10 sm-mt-20"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateListItem;
