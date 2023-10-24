"use client";
import React, { useEffect } from "react";
import Wrapper from "@/layouts/wrapper";
import CandidateDashboardMain from "@/app/components/dashboard/candidate";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getCurrCandidate } from "@/redux/features/candidate/api";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Candidate Dashboard",
// };

const CandidateDashboardPage = () => {
  const dispatch = useAppDispatch();
  const { currUser, isAuthenticated } = useAppSelector(
    (state) => state.persistedReducer.user
  );

  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );

  useEffect(() => {
    if (currUser && isAuthenticated) {
      getCurrCandidate(dispatch, currUser);
    }
  }, []);

  return <Wrapper>{currCandidate && <CandidateDashboardMain />}</Wrapper>;
};

export default CandidateDashboardPage;
