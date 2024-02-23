import instance from "@/lib/axios";
import { AppDispatch } from "@/redux/store";
import { ICoupon } from "@/types/coupon-type";
import { couponRequestFail, couponRequestStart, couponRequestSuccess, getAllCouponSuccess } from "./couponSlice";
import { AxiosError } from "axios";
import { notifyError, notifySuccess } from "@/utils/toast";

export const createCoupon = async(dispatch:AppDispatch,bodyObj:any) => {
    dispatch(couponRequestStart())
    try {
        const data = await instance.post(`/coupon/create`,bodyObj);
        dispatch(couponRequestSuccess());
        notifySuccess("Coupon Created Successfully")
    } catch (error) {
        const e = error as AxiosError
        dispatch(couponRequestFail(e.message))
        notifyError("Coupon formation failed.")
    }
}   

export const getAllCoupons = async (dispatch:AppDispatch,page:number) => {
    dispatch(couponRequestStart());
    try {
        const data = await instance.get(`/coupon/getAll?page=${page}`);
        // console.log(data)
        dispatch(getAllCouponSuccess(data.data)); 
        // notifySuccess("Coupon Created Successfully")
    } catch (error) {
        const e = error as AxiosError
        dispatch(couponRequestFail(e.message))
        notifyError("Coupon formation failed.")
    }
}