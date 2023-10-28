import instance from "@/lib/axios";
import {
    requestFail,
    requestStart,
    getAllJobAppByCandidateSuccess,
    getAllJobAppByJobPostSuccess,
    createJobAppSuccess,
    allJobAppByCandidateWithJobPostSuccess,
    allJobAppByJobPostWithCandidateSuccess,
    requestSuccess
} from "./slice";
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { notifySuccess } from "@/utils/toast";

// dashboard
export const getAllJobAppByCandidate = async (dispatch: AppDispatch, id: string) => {

    console.log("from jopApp api", id)

    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobApp/candidate/${id}`)


        dispatch(getAllJobAppByCandidateSuccess(data.allJobApp))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }
}

export const getallJobAppByCandidateWithJobPost = async (dispatch: AppDispatch, id: string) => {

    // console.log("from jopApp api", id)

    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobApp/candidateDash/${id}`)


        dispatch(allJobAppByCandidateWithJobPostSuccess(data.allJobApp))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }
}
export const getallJobAppByJobPostWithCandidate = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobApp/employerDash/${id}`)


        dispatch(allJobAppByJobPostWithCandidateSuccess(data.allJobApp))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }
}

export const getAllJobAppByJobPost = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobApp/jobPost/${id}`)

        dispatch(getAllJobAppByJobPostSuccess(data.allJobApp))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }
}

export const createJobApp = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {
        const { data } = await instance.post(`/jobApp/create`, bodyObj);

        dispatch(createJobAppSuccess(data.jobApp))
        notifySuccess("succesfully submitted the job")
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }
}
export const updateJobAppStatus = async (dispatch: AppDispatch, value: string, id: string) => {

    dispatch(requestStart());
    try {
        await instance.patch(`/jobApp/updateStatus`, { status: value, id: id });

        dispatch(requestSuccess())
        notifySuccess("status updated successfully")
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }
}