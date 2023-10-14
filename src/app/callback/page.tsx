"use client";
import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserFail,
  getUserStart,
  getUserSuccess,
} from "@/redux/features/userSlice";
import instance from "@/lib/axios";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { whoIsTryingToLoginWithLn } = useSelector(
    (state: RootState) => state.persistedReducer.user
  );

  const urlParams = new URLSearchParams(window.location.search);
  const state = urlParams.get("state");
  if (!whoIsTryingToLoginWithLn || !state) {
    alert(
      "there is change in browser,please complete the login posses with one browser only"
    );
  }

  useEffect(() => {
    if (whoIsTryingToLoginWithLn && state) {
      type RequestData = {
        code?: string;
        state: string;
        error?: string;
        error_description?: string;
        role: string;
      };
      const requestData: RequestData = {
        state: urlParams.get("state") as string,
        role: whoIsTryingToLoginWithLn,
      };

      if (urlParams.has("error")) {
        requestData.error = urlParams.get("error") as string;
        requestData.error_description = urlParams.get(
          "error_description"
        ) as string;
      }
      if (urlParams.has("code")) {
        requestData.code = urlParams.get("code") as string;
      }
      console.log(requestData);

      const formData = new URLSearchParams(requestData).toString();
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const callApi = async () => {
        dispatch(getUserStart());
        try {
          const { data } = await instance.post(
            "/candidate/auth/getCandidate",
            formData,
            { headers: headers, withCredentials: true }
          );
          dispatch(getUserSuccess(data.user));
          console.log(data);
          router.push(`/dashboard/${whoIsTryingToLoginWithLn}-dashboard`);
        } catch (error) {
          const e = error as AxiosError;
          dispatch(getUserFail(e.message));
          console.log(error);
        }
      };
      callApi();
    }
  }, []);

  return <div className="_callback"></div>;
};

export default page;
