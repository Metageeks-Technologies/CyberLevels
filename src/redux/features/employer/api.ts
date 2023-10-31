import instance from "@/lib/axios";
import { getEmployerSuccess, getSavedCandidatesSuccess, requestFailDash, requestStartDash, updateCurrEmployerSuccess } from "./dashboardSlice";
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { notifyError, notifySuccess } from "@/utils/toast";
import { toggleIsSaved } from "@/redux/features/candidate/slice"
// dashboard
export const getCurrEmployer = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStartDash());
    try {
        const { data } = await instance(`/employer/auth/${id}`)

        dispatch(getEmployerSuccess(data.employer))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
    }
}

export const saveCandidate = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStartDash());
    try {
        const { data } = await instance.post(`/employer/savedCandidate`, bodyObj);
        dispatch(getSavedCandidatesSuccess({ savedCandidates: data.savedCandidates, totalNumOfPage: data.totalNumOfPage, totalCandidate: data.totalSavedCandidate }))
        dispatch(toggleIsSaved(bodyObj.candidateId))
        notifySuccess("Candidate Saved Successfully")
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
        notifyError(e.message)

    }
}

export const removeCandidate = async (dispatch: AppDispatch, bodyObj: any) => {

    const { employerId, candidateId, page } = bodyObj;

    dispatch(requestStartDash());
    try {
        const { data } = await instance.delete(`/employer/savedCandidate?employerId=${employerId}&candidateId=${candidateId}&page=${page}`);
        dispatch(getSavedCandidatesSuccess({ savedCandidates: data.savedCandidates, totalNumOfPage: data.totalNumOfPage, totalCandidate: data.totalSavedCandidate }))
        dispatch(toggleIsSaved(bodyObj.candidateId))
        notifySuccess("Candidate removed from Saved Candidates")
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
        notifyError(e.message)

    }
}

export const getSavedCandidate = async (dispatch: AppDispatch, bodyObj: any) => {

    const { employerId, page } = bodyObj;

    dispatch(requestStartDash());
    try {
        const { data } = await instance.get(`/employer/savedCandidate?employerId=${employerId}&page=${page}`);
        dispatch(getSavedCandidatesSuccess({ savedCandidates: data.savedCandidates, totalNumOfPage: data.totalNumOfPage, totalCandidate: data.totalSavedCandidate }))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
        // notifyError(e.message)

    }
}