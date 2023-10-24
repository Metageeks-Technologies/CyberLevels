import instance from "@/lib/axios";
import { getUserFail, getUserStart, getUserSuccess } from "./slice"
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";

export const loginWithLn = async (dispatch: AppDispatch, bodyObj: any) => {

    const formData = new URLSearchParams(bodyObj).toString();
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    };
    dispatch(getUserStart());
    try {
        const { data } = await instance.post(
            "/candidate/auth/getCandidate",
            formData,
            { headers: headers, withCredentials: true }
        );
        dispatch(getUserSuccess({ user: data.user._id, userRole: data.user.role }));
        // console.log(data);
        return true;
    } catch (error) {
        const e = error as AxiosError;
        dispatch(getUserFail(e.message));
        // console.log(error);
        return false
    }
}


