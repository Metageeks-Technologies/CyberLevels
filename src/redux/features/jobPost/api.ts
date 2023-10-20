import instance from "@/lib/axios";
import { getJobPostsSuccess, requestFail, requestStart, requestSuccess, submitJobPostSuccess } from "./slice"
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { IFilterState } from "../filterJobPostSlice";


export const getJObPosts = async (dispatch: AppDispatch, queryObject: IFilterState, page: number) => {
    const { location, jobCategory, jobType, salary, workMode, preferredExperience } = queryObject;

    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobPost/get?location=${location.join(",")}&jobType=${jobType.join(",")}&jobCategory=${jobCategory.join(",")}&workMode=${workMode.join(",")}&preferredExperience=${preferredExperience.join(",")}&salary=${salary}&page=${page}`)
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
        const { data } = await instance(`/jobPost/details?id=${id}`);
        dispatch(submitJobPostSuccess(data.job));
        return data.result;

    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

