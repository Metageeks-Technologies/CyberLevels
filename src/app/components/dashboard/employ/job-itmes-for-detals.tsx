import React from "react";
import ActionDropdown from "./actionDropDownForDetails";
import Link from "next/link";

const EmployJobItem = ({
  title,
  info,
  date,
  tesScore,
  status,
  id,
  appId,
  isFeedbackAsked,
}: {
  title: string;
  info: string;
  date: string;
  tesScore: String;
  status: string;
  id: string;
  appId: string;
  isFeedbackAsked: boolean;
}) => {
  return (
    <tr className={`${status}`}>
      <td>
        <div className="job-name fw-500">
          <Link href={`/candidate-profile-v1/${id}`} target="_blank">
            {title}
          </Link>
        </div>
        <div className="info1">{info}</div>
      </td>
      <td>{date}</td>
      <td>{tesScore}</td>
      <td>
        <div className="job-status text-capitalize">{status}</div>
      </td>
      <td>
        <div className="action-dots float-end">
          <button
            className="action-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
          </button>

          <ActionDropdown
            isFeedbackAsked={isFeedbackAsked}
            id={appId}
            candidateId={id}
          />
        </div>
      </td>
    </tr>
  );
};

export default EmployJobItem;
