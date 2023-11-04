"use client";
import CandidateDashboardMain from "@/app/components/dashboard/candidate";
import Wrapper from "@/layouts/wrapper";
import { addNotification } from "@/redux/features/candidate/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
// export const metadata: Metadata = {
//   title: "Candidate Dashboard",
// };

const CandidateDashboardPage = () => {
  const dispatch = useAppDispatch();

  const { socket } = useAppSelector((s) => s.global);

  const { currCandidate, toggle } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );

  useEffect(() => {
    socket?.on("getNotification", (data: any) => {
      dispatch(addNotification(data.notification));
      console.log("hello");
    });
  }, [socket, toggle]);

  return <Wrapper>{currCandidate && <CandidateDashboardMain />}</Wrapper>;
};

export default CandidateDashboardPage;
