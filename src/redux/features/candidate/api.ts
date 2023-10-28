import instance from "@/lib/axios";
import { getCandidatesSuccess, requestFail, requestStart, getDetailsSuccess } from "./slice"
import { getCurrCandidateSuccess, requestFailDash, requestStartDash, updateEduSuccess, updateExpSuccess, updateCurrCandidateSuccess } from "./dashboardSlice";
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { IFilterState } from "../candidate/filterSlice";


export const getCandidates = async (dispatch: AppDispatch, queryObject: IFilterState, page: number) => {
    const { location, candidateType, keyword, preferredExperience } = queryObject;

    dispatch(requestStart());
    try {
        const { data } = await instance(`/candidate/get?location=${location.join(",")}&preferredExperience=${preferredExperience.join(",")}&keyword=${keyword}&candidateType=${candidateType}&page=${page}`)
        dispatch(getCandidatesSuccess({ candidates: data.result, totalCandidate: data.totalCandidate, totalNumOfPage: data.totalNumOfPage }))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }
}

export const getCandidateDetails = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStart());
    try {
        const { data } = await instance(`/candidate/${id}`)
        dispatch(getDetailsSuccess(data.candidate))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }
}

// dashboard
export const getCurrCandidate = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStartDash());
    try {
        const { data } = await instance(`/candidate/auth/${id}`)
        console.log("from the currCandidste", data);

        dispatch(getCurrCandidateSuccess(data.candidate))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
    }
}
export const updateCurrCandidate = async (dispatch: AppDispatch, id: string, bodyObj: any) => {

    dispatch(requestStartDash());
    try {
        const { data } = await instance.patch(`/candidate/update/${id}`, bodyObj)

        dispatch(updateCurrCandidateSuccess(data.candidate))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
    }
}