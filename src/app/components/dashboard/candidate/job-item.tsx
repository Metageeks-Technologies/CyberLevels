import React from "react";
import ActionDropdown from "../candidate/action-dropdown";

const CandidateJobItem = ({
  title,
  info,
  date,
  application,
  status,
  updatedAt,
}: {
  title: string;
  info: string;
  date: string;
  application: string;
  status: string;
  updatedAt: string;
}) => {
  return (
    <tr
      className={`${status === "Received" && "pending"} ${
        status === "Under Review" && "active"
      } ${status === "Not Selected" && "expired"} ${
        status === "Shortlisted" && "active"
      }`}
    >
      <td>
        <div className="job-name fw-500">{title}</div>
        <div className="info1">{info}</div>
      </td>
      <td>{date}</td>
      <td>{application}</td>
      <td>
        <div className="job-status text-capitalize">{status}</div>
      </td>
      <td className="float-end">{updatedAt}</td>
      {/* <td>
        <div className="action-dots float-end">
          <button
            className="action-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
          </button>
          
          <ActionDropdown />
          
        </div>
      </td> */}
    </tr>
  );
};

export default CandidateJobItem;
