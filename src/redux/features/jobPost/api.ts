import instance from "@/lib/axios";
import { getJobPostsSuccess, requestFail, requestStart, requestSuccess, submitJobPostSuccess, getJobPostsForEmployerSuccess } from "./slice"
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { IFilterState } from "../filterJobPostSlice";
import { getCompanyOfJobPost } from "../company/slice";


export const getJObPosts = async (dispatch: AppDispatch, queryObject: IFilterState, page: number, candidateId: string) => {
    const { location, jobCategory, jobType, salary, workMode, preferredExperience, status } = queryObject;

    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobPost/get?location=${location.join(",")}&jobType=${jobType.join(",")}&jobCategory=${jobCategory.join(",")}&workMode=${workMode.join(",")}&preferredExperience=${preferredExperience.join(",")}&salary=${salary}&status=${status}&page=${page}&candidateId=${candidateId}`)
        // console.log(data.result)
        dispatch(getJobPostsSuccess({ allJobPost: data.result, totalJobPost: data.totalJobPost, totalNumOfPage: data.totalNumOfPage }))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }

}
export const getJObPostsByCompanyId = async (dispatch: AppDispatch, queryObject: { companyId: string, status: string }, page: number, candidateId: string) => {
    const { companyId, status } = queryObject;

    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobPost/get?page=${page}&candidateId=${candidateId}&companyId=${companyId}&status=${status}`)
        // console.log(data.result)
        dispatch(getJobPostsSuccess({ allJobPost: data.result, totalJobPost: data.totalJobPost, totalNumOfPage: data.totalNumOfPage }))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }

}
export const addJobPost = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {
        const { data } = await instance.post("/jobPost/add", bodyObj);
        dispatch(submitJobPostSuccess(data.job));
    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const getJobPostsForEmployer = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStart());
    try {
        const { data } = await instance(`jobPost/employer/${id}`);
        dispatch(getJobPostsForEmployerSuccess(data.jobPosts));
    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}
export const askToGpt = async (dispatch: AppDispatch, query: string) => {

    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobPost/askGpt?query=${query}`);
        dispatch(requestSuccess());
        return data.result;

    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}
export const getJobPostDetails = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobPost/${id}`);
        dispatch(submitJobPostSuccess(data.job));
        dispatch(getCompanyOfJobPost(data.company))
        return data.result;

    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}
export const deleteJobPost = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStart());
    try {
        const { data } = await instance.delete(`/jobPost/${id}`);
        dispatch(getJobPostsSuccess({ allJobPost: data.result, totalJobPost: data.totalJobPost, totalNumOfPage: data.totalNumOfPage }));

    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}


