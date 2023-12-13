import instance from "@/lib/axios";
import { requestFail, requestStart, requestSuccess, submitCandidateSubSuccess, getEmploySubSuccess, submitEmploySubSuccess } from "./slice"
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { IFilterState } from "../filterJobPostSlice";
import { notifyError, notifySuccess } from "@/utils/toast";


export const submitCandidateSub = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {
        const { data } = await instance.post(`/subscription/candidate`, bodyObj);
        dispatch(submitCandidateSubSuccess(""));
        notifySuccess("new subscription Template created.");
    } catch (error) {
        const e = error as AxiosError;
        const response = e.response as any;
        const msg = response.data.message;
        dispatch(requestFail(e.message));
        notifyError(msg);
    }

}

export const submitEmploySub = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {
        const { data } = await instance.post(`/subscription/employer`, bodyObj);
        dispatch(submitEmploySubSuccess(""));
        notifySuccess("new subscription Template created.");
    } catch (error) {
        const e = error as AxiosError;
        const response = e.response as any;
        const msg = response.data.message;
        dispatch(requestFail(e.message));
        notifyError(msg);
    }

}