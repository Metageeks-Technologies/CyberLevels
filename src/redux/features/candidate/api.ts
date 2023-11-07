import instance from "@/lib/axios";
import { getCandidatesSuccess, requestFail, requestStart, getDetailsSuccess } from "./slice"
import { getCurrCandidateSuccess, requestFailDash, requestStartDash, removeSavedJobSuccess, updateExpSuccess, updateCurrCandidateSuccess, getSavedJobsSuccess, getSavedCompaniesSuccess, updateNotificationSuccess, addResume } from "./dashboardSlice";
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { IFilterState } from "../candidate/filterSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import { toggleIsSaved as toggleJobIsSaved } from "@/redux/features/jobPost/slice"
import { toggleIsSaved as toggleCompanyIsSaved } from "@/redux/features/company/slice"
import { setUploadProgress } from "../globalSlice";



export const getCandidates = async (dispatch: AppDispatch, queryObject: IFilterState, page: number, employerId: string) => {
    const { location, candidateType, keyword, preferredExperience } = queryObject;

    dispatch(requestStart());
    try {
        const { data } = await instance(`/candidate/get?location=${location.join(",")}&preferredExperience=${preferredExperience.join(",")}&keyword=${keyword}&candidateType=${candidateType}&page=${page}&employerId=${employerId}`)
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

export const getSavedJobs = async (dispatch: AppDispatch, id: string, page: number) => {

    dispatch(requestStartDash());
    try {
        const { data } = await instance(`/candidate/savedJob?candidateId=${id}&page=${page}`)
        console.log(data);
        dispatch(getSavedJobsSuccess({ savedJobs: data.savedJobs, totalNumOfSavedJobsPage: data.totalNumOfPage, totalSavedJob: data.totalSavedJob }))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
    }
}
export const saveJob = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStartDash());
    try {
        const { data } = await instance.post(`/candidate/savedJob`, bodyObj);
        dispatch(getSavedJobsSuccess({ savedJobs: data.savedJobs, totalNumOfSavedJobsPage: data.totalNumOfPage, totalSavedJob: data.totalSavedJob }))
        dispatch(toggleJobIsSaved(bodyObj.jobPostId))
        notifySuccess("Job Saved Successfully")
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
        notifyError(e.message)
    }
}

export const removeSavedJob = async (dispatch: AppDispatch, bodyObj: any) => {

    const { jobPostId, candidateId, page } = bodyObj;
    dispatch(requestStartDash());
    try {
        const { data } = await instance.delete(`/candidate/savedJob?jobPostId=${jobPostId}&candidateId=${candidateId}&page=${page}`);
        dispatch(getSavedJobsSuccess({ savedJobs: data.savedJobs, totalNumOfSavedJobsPage: data.totalNumOfPage, totalSavedJob: data.totalSavedJob }))
        dispatch(toggleJobIsSaved(bodyObj.jobPostId))
        dispatch(removeSavedJobSuccess);
        notifySuccess("Job remove form saved Jobs");
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
        notifyError(e.message)
    }
}
export const getSavedCompanies = async (dispatch: AppDispatch, id: string, page: number) => {

    dispatch(requestStartDash());
    try {
        const { data } = await instance(`/candidate/savedCompany?candidateId=${id}&page=${page}`)
        // console.log(data);
        dispatch(getSavedCompaniesSuccess({ savedCompanies: data.savedCompanies, totalNumOfSavedCompaniesPage: data.totalNumOfPage, totalSavedCompany: data.totalSavedCompany }))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
    }
}

export const saveCompany = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStartDash());
    try {
        const { data } = await instance.post(`/candidate/savedCompany`, bodyObj);
        dispatch(getSavedCompaniesSuccess({ savedCompanies: data.savedCompanies, totalNumOfSavedCompaniesPage: data.totalNumOfPage, totalSavedCompany: data.totalSavedCompany }))
        dispatch(toggleCompanyIsSaved(bodyObj.companyId))
        notifySuccess("Company Saved Successfully")
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
        notifyError(e.message)
    }
}

export const removeSavedCompany = async (dispatch: AppDispatch, bodyObj: any) => {

    const { companyId, candidateId, page } = bodyObj;
    dispatch(requestStartDash());
    try {
        const { data } = await instance.delete(`/candidate/savedCompany?companyId=${companyId}&candidateId=${candidateId}&page=${page}`);
        dispatch(getSavedCompaniesSuccess({ savedCompanies: data.savedCompanies, totalNumOfSavedCompaniesPage: data.totalNumOfPage, totalSavedCompany: data.totalSavedCompany }))
        dispatch(toggleCompanyIsSaved(companyId))
        // dispatch(removeSavedJobSuccess);
        notifySuccess("Job remove form saved Jobs");
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
        notifyError(e.message)
    }
}

export const updateNotification = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStartDash());
    try {
        const { data } = await instance.patch(`/candidate/updateNoti/${bodyObj.id}`, { candidateId: bodyObj.candidateId });
        dispatch(updateNotificationSuccess(data.candidate));
        // notifySuccess("Job remove form saved Jobs");
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
        // notifyError(e.message)
    }
}

export const uploadResume = async (dispatch: AppDispatch, file: File, metaData: any) => {

    dispatch(requestStartDash());
    const { name, candidateId } = metaData;

    try {
        const { data } = await instance.post(`/candidate/upload`, metaData);
        if (data) {
            const uploadRes = await instance.put(data.url, file, {
                headers: {
                    "Content-Type": file.type,
                },
                onUploadProgress: (data) => {
                    if (data.total)
                        dispatch(setUploadProgress(Math.round((data.loaded / data.total) * 100)));
                },
            })
            if (uploadRes) {
                const { data } = await instance.patch(`/candidate/upload`, { name, candidateId, s3Key: `resume/${candidateId}__${name}` });
                dispatch(addResume(data.resume));

            }
            notifySuccess("Your resume uploaded successfully");
        }

    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
    }
}