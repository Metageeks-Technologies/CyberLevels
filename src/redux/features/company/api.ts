import instance from "@/lib/axios";
import { requestFail, requestStart, submitCompanySuccess } from "./slice"
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";

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

