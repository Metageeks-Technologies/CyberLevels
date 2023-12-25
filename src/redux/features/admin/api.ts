import instance from "@/lib/axios";
import { requestStart, requestFail, getCandidateSuccess, getEmployerSuccess, getCompanySuccess } from "./slice";
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";

export const getAllCandidate = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {

        const { data } = await instance.get("/admin/candidate", { params: bodyObj });
        dispatch(getCandidateSuccess({ candidatesFA: data.result, totalCandidate: data.totalCandidate, totalNumOfPageFC: data.totalNumOfPage }));

    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const getAllEmployer = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {

        const { data } = await instance.get("/admin/employer", { params: bodyObj });
        dispatch(getEmployerSuccess({ employerFA: data.result, totalEmployer: data.totalEmployer, totalNumOfPageFE: data.totalNumOfPage }))

    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const getAllCompany = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {

        const { data } = await instance.get("/admin/company", { params: bodyObj });
        dispatch(getCompanySuccess({ companyFA: data.result, totalCompany: data.totalCompany, totalNumOfPageFCom: data.totalNumOfPage }));

    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}




