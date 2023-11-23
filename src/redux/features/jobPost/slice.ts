import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IJobPost } from '@/types/jobPost-type'

export interface jobPstState {
    jobPost: IJobPost | null;
    allJobPost: IJobPost[]
    error: string | null,
    loading: boolean,
    page: number,
    pageForCompany: number,
    totalNumOfPage: number,
    totalJobPost: number,
    gptLoading: boolean,
    jobPostsForEmployer: IJobPost[];
    relatedJobs: IJobPost[];
    fileNamePc: string;
}
type IForGetAllJobPost = {
    allJobPost: IJobPost[]
    totalNumOfPage: number,
    totalJobPost: number,
}

const initialState: jobPstState = {
    jobPost: null,
    loading: false,
    gptLoading: false,
    error: null,
    allJobPost: [],
    page: 1,
    totalNumOfPage: 1,
    totalJobPost: 0,
    pageForCompany: 1,
    jobPostsForEmployer: [],
    relatedJobs: [],
    fileNamePc: ""
}

export const jobPostSlice = createSlice({
    name: 'jobPost',
    initialState,
    reducers: {
        askGptStart: (state) => {
            state.gptLoading = true;
        },
        askGptEnd: (state) => {
            state.gptLoading = false;
        },
        askGptSuccess: (state) => {
            state.gptLoading = false;
        },
        requestStart: (state) => {
            state.loading = true;

        },
        requestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;

        },
        requestSuccess: (state) => {
            state.loading = false;
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
        getJobPostsForEmployerSuccess: (state, action: PayloadAction<IJobPost[]>) => {
            state.loading = false
            state.jobPostsForEmployer = action.payload;
        },
        toggleIsSaved: (state, action: PayloadAction<string>) => {
            state.allJobPost = state.allJobPost.map((job) => {
                if (job._id === action.payload) {
                    return { ...job, isSaved: !job.isSaved }
                } else return job;
            })

        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setPageForCompany: (state, action: PayloadAction<number>) => {
            state.pageForCompany = action.payload;
        },
        getRelatedJobsSuccess: (state, action: PayloadAction<IJobPost[]>) => {
            state.loading = false
            state.relatedJobs = action.payload;
        },
        setFileNamePc: (state, action: PayloadAction<string>) => {
            state.fileNamePc = action.payload;
            state.gptLoading = false;
        },

    },
})

export const {
    askGptEnd,
    askGptStart,
    askGptSuccess,
    requestSuccess,
    getJobPostsSuccess,
    requestFail,
    requestStart,
    submitJobPostSuccess,
    setPage,
    toggleIsSaved,
    setPageForCompany,
    getJobPostsForEmployerSuccess,
    getRelatedJobsSuccess,
    setFileNamePc
} = jobPostSlice.actions

export default jobPostSlice.reducer;
