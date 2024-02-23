import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICoupon } from "@/types/coupon-type";
export interface InitialState {
    loading: boolean;
    error?: string | null;
    coupons:ICoupon[];
    page:number;
    totalPages:number;
    itemsPerPage:number;
    totalCoupons:number;
}


const initialState: InitialState = {
    loading: false,
    error: null,
    coupons:[],
    page:1,
    totalPages:1,
    itemsPerPage:8,
    totalCoupons:0,
    
}

export const couponSlice = createSlice({
    name: 'blogSlice',
    initialState,
    reducers: {
        couponRequestStart: (state) => {
            state.loading = true;
        },
        couponRequestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        couponRequestSuccess:(state) => {
            state.loading=false;
        },
        getAllCouponSuccess:(state,action:PayloadAction<any>) => {
            state.loading = false;
            state.coupons = action.payload.coupons as ICoupon[];
            state.totalCoupons = action.payload.totalCoupons as number;
            state.itemsPerPage = action.payload.itemsPerPage as number;
            state.totalPages = action.payload.totalPages as number;
        },
        setPage:(state,action:PayloadAction<number>) => {
            state.page = action.payload;
        }
    }
})

export const {
    couponRequestFail,
    couponRequestStart,
    couponRequestSuccess,
    getAllCouponSuccess,
    setPage,

} = couponSlice.actions

export default couponSlice.reducer;