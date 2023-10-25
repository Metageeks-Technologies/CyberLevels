"use client";
import React, { useEffect } from "react";
import Wrapper from "@/layouts/wrapper";
import EmployDashboardMain from "@/app/components/dashboard/employ";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getCurrEmployer } from "@/redux/features/employer/api";

const EmployDashboardPage = () => {
  const dispatch = useAppDispatch();
  const { currUser, isAuthenticated } = useAppSelector(
    (state) => state.persistedReducer.user
  );

  const { currEmployer } = useAppSelector((state) => state.employer);
  useEffect(() => {
    if (currUser && isAuthenticated) {
      getCurrEmployer(dispatch, currUser);
    }
  }, []);
  return <Wrapper>{currEmployer && <EmployDashboardMain />}</Wrapper>;
};

export default EmployDashboardPage;
