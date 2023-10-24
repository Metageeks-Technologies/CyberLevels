import instance from "@/lib/axios";
import { getCompanySuccess, requestFail, requestStart, submitCompanySuccess, getCompanyOfJobPost } from "./slice"
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { ICompanyFilterState } from "./filter";

export const addCompany = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {
        const { data } = await instance.post("/company/add", bodyObj);
        dispatch(submitCompanySuccess(data.company));
    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const getCompanies = async (dispatch: AppDispatch, queryObject: ICompanyFilterState, page: number) => {
    const { name, teamSize } = queryObject;

    dispatch(requestStart());
    try {
        const { data } = await instance(`/company/get?name=${name}&teamSize=${teamSize.join(",")}&page=${page}`)
        // console.log(data.result)
        dispatch(getCompanySuccess({ companies: data.result, totalCompanies: data.totalCompanies, totalNumOfPage: data.totalNumOfPage }))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }

}

export const getCompanyDetails = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStart());
    try {
        const { data } = await instance(`/company/${id}`);

        dispatch(getCompanyOfJobPost(data.company))
        return data.result;

    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

