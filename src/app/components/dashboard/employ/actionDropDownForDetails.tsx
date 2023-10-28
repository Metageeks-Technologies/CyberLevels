"use client";
import React from "react";
import Image from "next/image";
import { updateJobAppStatus } from "@/redux/features/jobApp/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
// const  enum: ['Received', 'Under Review', 'Shortlisted', "Not Selected"]

const ActionDropdown = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const handleClick = async (value: string) => {
    await updateJobAppStatus(dispatch, value, id);
  };
  const { loading } = useAppSelector((state) => state.jobApplication);
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <button
          disabled={loading}
          style={{ color: "#fac715" }}
          className="active dropdown-item"
          onClick={() => handleClick("Under Review")}
        >
          Under Review
        </button>
      </li>
      <li>
        <button
          disabled={loading}
          style={{ color: "#28cc8b" }}
          onClick={() => handleClick("Shortlisted")}
          className="dropdown-item"
        >
          Shortlist
        </button>
      </li>
      <li>
        <button
          disabled={loading}
          style={{ color: "#ff5050;" }}
          className="dropdown-item"
          onClick={() => handleClick("Not Selected")}
        >
          Reject
        </button>
      </li>
    </ul>
  );
};

export default ActionDropdown;
