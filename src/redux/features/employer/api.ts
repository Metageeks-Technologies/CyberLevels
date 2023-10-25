import instance from "@/lib/axios";
import { getEmployerSuccess, requestFailDash, requestStartDash, updateCurrEmployerSuccess } from "./dashboardSlice";
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";

// dashboard
export const getCurrEmployer = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStartDash());
    try {
        const { data } = await instance(`/employer/auth/${id}`)
        console.log("from the currCandidste", data);

        dispatch(getEmployerSuccess(data.employer))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
    }
}