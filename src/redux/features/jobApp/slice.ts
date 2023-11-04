import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IChat, IChatMessage, IFeedback, IJobApp } from '@/types/job-app-type'

// Define a type for the slice state
export interface IJobApplication {
    loading: boolean,
    error: null | string,
    allJobAppByCandidate: IJobApp[];
    allJobAppByCandidateWithJobPost: IJobApp[];
    allJobAppByJobPostWithCandidate: IJobApp[];
    allJobAppByJobPost: IJobApp[];
    jobApp: IJobApp | null;
    chat: IChat | null;
    currJobApp: string;
    feedback: IFeedback | null,

}

// Define the initial state using that type
const initialState: IJobApplication = {
    loading: false,
    error: null,
    allJobAppByCandidate: [],
    allJobAppByJobPost: [],
    allJobAppByCandidateWithJobPost: [],
    allJobAppByJobPostWithCandidate: [],
    jobApp: null,
    chat: null,
    currJobApp: "",
    feedback: null
};

export const jobApplicationSlice = createSlice({
    name: "jobApplication",
    initialState,
    reducers: {
        requestStart: (state) => {
            state.loading = true;
        },
        requestFail: (state, action: PayloadAction<string>) => {
            state.loading = false,
                state.error = action.payload

        },
        requestSuccess: (state) => {
            state.loading = false
        },

        getAllJobAppByCandidateSuccess: (state, action: PayloadAction<IJobApp[]>) => {
            state.allJobAppByCandidate = action.payload;
            state.loading = false
        },
        allJobAppByCandidateWithJobPostSuccess: (state, action: PayloadAction<IJobApp[]>) => {
            state.allJobAppByCandidateWithJobPost = action.payload;
            state.loading = false
        },
        allJobAppByJobPostWithCandidateSuccess: (state, action: PayloadAction<IJobApp[]>) => {
            state.allJobAppByJobPostWithCandidate = action.payload;
            state.loading = false
        },
        getAllJobAppByJobPostSuccess: (state, action: PayloadAction<IJobApp[]>) => {
            state.allJobAppByJobPost = action.payload;
            state.loading = false;
        },
        createJobAppSuccess: (state, action: PayloadAction<IJobApp>) => {
            state.jobApp = action.payload;
            state.loading = false;
            state.allJobAppByCandidate.push(action.payload)
        },
        getChatsSuccess: (state, action: PayloadAction<IChat>) => {
            state.chat = action.payload;
            state.loading = false;
        },
        addChatSuccess: (state, action: PayloadAction<IChatMessage>) => {
            state.chat?.messages.push(action.payload);
        },
        setCurrJobApp: (state, action: PayloadAction<string>) => {
            state.currJobApp = action.payload
        },
        getFeedbackSuccess: (state, action: PayloadAction<IFeedback>) => {
            state.feedback = action.payload;
            state.loading = false;
        },
        askFeedbackSuccess: (state, action: PayloadAction<IFeedback>) => {
            state.feedback = action.payload;
            state.loading = false;
        },
        responseFeedbackSuccess: (state, action: PayloadAction<IFeedback>) => {
            state.feedback = action.payload;
            state.loading = false;
        },


    }
});

export const {
    requestFail,
    requestStart,
    requestSuccess,
    getAllJobAppByCandidateSuccess,
    getAllJobAppByJobPostSuccess,
    createJobAppSuccess,
    getChatsSuccess,
    addChatSuccess,
    setCurrJobApp,
    responseFeedbackSuccess,
    getFeedbackSuccess,
    askFeedbackSuccess,
    allJobAppByCandidateWithJobPostSuccess,
    allJobAppByJobPostWithCandidateSuccess

} = jobApplicationSlice.actions;

export default jobApplicationSlice.reducer;
