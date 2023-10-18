import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IJobPost } from '@/types/jobPost-type'

export interface jobPstState {
    jobPost: IJobPost | null;
    allJobPost: IJobPost[]
    error: string | null,
    loading: boolean,
    page: number,
    totalNumOfPage: number,
    totalJobPost: number,

}
type IForGetAllJobPost = {
    allJobPost: IJobPost[]
    totalNumOfPage: number,
    totalJobPost: number,
}

const initialState: jobPstState = {
    jobPost: null,
    loading: false,
    error: null,
    allJobPost: [],
    page: 1,
    totalNumOfPage: 1,
    totalJobPost: 0
}

export const jobPostSlice = createSlice({
    name: 'jobPost',
    initialState,
    reducers: {
        requestStart: (state) => {
            state.loading = true;
        },
        requestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        submitJobPostSuccess: (state, action: PayloadAction<IJobPost>) => {
            state.loading = false;
            state.jobPost = action.payload;
        },
        getJobPostsSuccess: (state, action: PayloadAction<IForGetAllJobPost>) => {
            state.loading = false
            state.allJobPost = action.payload.allJobPost;
            state.totalNumOfPage = action.payload.totalNumOfPage;
            state.totalJobPost = action.payload.totalJobPost
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        }

    },
})

export const {
    getJobPostsSuccess,
    requestFail,
    requestStart,
    submitJobPostSuccess,
    setPage
} = jobPostSlice.actions

export default jobPostSlice.reducer;
