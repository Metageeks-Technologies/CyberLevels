"use client";
import React from "react";
import Image from "next/image";
import { updateJobAppStatus } from "@/redux/features/jobApp/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCurrJobApp } from "@/redux/features/jobApp/slice";
// const  enum: ['Received', 'Under Review', 'Shortlisted', "Not Selected"]

const ActionDropdown = ({
  id,
  candidateId,
}: {
  id: string;
  candidateId: string;
}) => {
  const dispatch = useAppDispatch();
  const { currUser } = useAppSelector((s) => s.persistedReducer.user);
  const { socket } = useAppSelector((s) => s.global);
  const handleClick = async (value: string) => {
    if (currUser) {
      await updateJobAppStatus(
        dispatch,
        {
          status: value,
          employerId: currUser,
          candidateId,
          id,
          redirectUrl: `${process.env.NEXT_PUBLIC_HOME_ENDPOINT}/dashboard/candidate-dashboard/jobs`,
        },
        socket
      );
    }
  };
  const { loading } = useAppSelector((state) => state.jobApplication);
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <button
          onClick={() => {
            dispatch(setCurrJobApp(id));
          }}
          data-bs-toggle="modal"
          data-bs-target="#chatModal"
          type="button"
          className="active dropdown-item"
        >
          Chat
        </button>
      </li>
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
