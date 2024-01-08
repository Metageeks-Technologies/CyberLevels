import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ICandidate, INotification, IResume } from '@/types/user-type'
import type { IJobPost } from "@/types/jobPost-type";
import { ICompany } from "@/types/company";
interface ProfileView {

    view_count?: number;
    view_timestamp?: string;
}
// Define a type for the slice state
export interface ICandidateDashboard {
    loading: boolean,
    error: null | string,
    currCandidate: ICandidate | null,
    savedJobsPage: number,
    totalNumOfSavedJobsPage: number,
    totalSavedJob: number,
    savedJobs: IJobPost[],
    savedCompanyPage: number,
    totalNumOfSavedCompaniesPage: number,
    totalSavedCompany: number,
    savedCompanies: ICompany[],
    toggle: boolean,
    recommendedJobs: [
        {
            job: IJobPost,
            score: number,
        }
    ] | null,
    currDashEducation: string,
    currDashExperience: string,
    viewsOnCandidateProfile: ProfileView[],
    totalViews: number,
}

// Define the initial state using that type
const initialState: ICandidateDashboard = {
    loading: false,
    currCandidate: null,
    error: null,
    savedJobsPage: 1,
    totalNumOfSavedJobsPage: 1,
    totalSavedJob: 0,
    savedJobs: [],
    savedCompanyPage: 1,
    totalNumOfSavedCompaniesPage: 1,
    totalSavedCompany: 0,
    savedCompanies: [],
    toggle: false,
    recommendedJobs: null,
    currDashEducation: "",
    currDashExperience: "",
    viewsOnCandidateProfile: [],
    totalViews: 0,


};

type IForGetSavedJobs = {
    totalNumOfSavedJobsPage: number,
    totalSavedJob: number,
    savedJobs: IJobPost[]
}
type IForGetSavedCompanies = {
    totalNumOfSavedCompaniesPage: number,
    totalSavedCompany: number,
    savedCompanies: ICompany[]
}

export const candidateDashboardSlice = createSlice({
    name: "candidateDashboard",
    initialState,
    reducers: {
        requestStartDash: (state) => {
            state.loading = true;
        },
        requestFailDash: (state, action: PayloadAction<string>) => {
            state.loading = false,
                state.error = action.payload

        },
        requestSuccessDash: (state) => {
            state.loading = false;
        },
        getCurrCandidateSuccess: (state, action: PayloadAction<ICandidate>) => {
            state.currCandidate = action.payload;
            state.loading = false,
                state.error = null;
        },
        getCandidateProfileTotalViewsSuccess: (state, action: PayloadAction<number>) => {
            state.loading = false;
            // console.log(action.payload,"Action")
            state.totalViews = action.payload
        },
        updateCurrCandidateSuccess: (state, action: PayloadAction<ICandidate>) => {
            state.currCandidate = action.payload;
            state.loading = false;
        },
        updateEduSuccess: (state, action: PayloadAction<any>) => {
            if (state.currCandidate) {
                state.currCandidate.education = [...state.currCandidate.education, action.payload]
            }
            state.loading = false;
        },
        updateExpSuccess: (state, action: PayloadAction<any>) => {
            if (state.currCandidate)
                state.currCandidate.experience = [...state.currCandidate.experience, action.payload]
            state.loading = false;
        },
        getCandidateProfileViewsForChartSuccess: (state, action: PayloadAction<ProfileView[]>) => {
            state.loading = false;
            state.viewsOnCandidateProfile = action.payload;
        },
        getSavedJobsSuccess: (state, action: PayloadAction<IForGetSavedJobs>) => {
            state.savedJobs = action.payload.savedJobs;
            state.totalNumOfSavedJobsPage = action.payload.totalNumOfSavedJobsPage;
            state.totalSavedJob = action.payload.totalSavedJob;
            state.loading = false;
        },
        setSavedJobsPage: (state, action: PayloadAction<number>) => {
            state.savedJobsPage = action.payload;
        },
        removeSavedJobSuccess: (state) => {
            if ((state.savedJobs.length === 1) && (state.savedJobsPage !== 1)) {
                state.savedJobsPage = state.savedJobsPage - 1;
            }
        },
        getSavedCompaniesSuccess: (state, action: PayloadAction<IForGetSavedCompanies>) => {
            state.savedCompanies = action.payload.savedCompanies;
            state.totalNumOfSavedCompaniesPage = action.payload.totalNumOfSavedCompaniesPage;
            state.totalSavedCompany = action.payload.totalSavedCompany;
            state.loading = false;
        },
        setSavedCompaniesPage: (state, action: PayloadAction<number>) => {
            state.savedCompanyPage = action.payload;
        },
        updateNotificationSuccess: (state, action: PayloadAction<ICandidate>) => {
            state.currCandidate = action.payload;
            state.loading = false
        },
        setToggle: (state) => {
            state.toggle = !state.toggle;
        },
        setCurrDashExperience: (state, action: PayloadAction<string>) => {
            state.currDashExperience = action.payload;
        },
        setCurrDashEducation: (state, action: PayloadAction<string>) => {
            state.currDashEducation = action.payload;
        },
        addResume: (state, action: PayloadAction<IResume>) => {
            state.currCandidate?.resumes.push(action.payload);
        },
        updateAvatarSuccess: (state, action: PayloadAction<string>) => {
            if (state.currCandidate) state.currCandidate.avatar = action.payload
        },
        deleteResumeSuccess: (state, action: PayloadAction<string>) => {
            if (state.currCandidate) {
                state.currCandidate.resumes = state.currCandidate.resumes.filter(resume => resume._id !== action.payload);
            }
        },
        addNotification: (state, action: PayloadAction<INotification>) => {
            if (state.currCandidate) {
                const newNotification = action.payload;
                const updatedCandidate = {
                    ...state.currCandidate, // Create a shallow copy of currCandidate
                    notifications: [...state.currCandidate.notifications, newNotification], // Add the new notification
                };
                state.currCandidate = updatedCandidate;
            }
        },
        getRecommendedJobsSuccess: (state, action: PayloadAction<[
            {
                job: IJobPost,
                score: number,
            }
        ]>) => {
            state.recommendedJobs = action.payload
        },


    },
});

export const {
    getCurrCandidateSuccess,
    updateEduSuccess,
    updateAvatarSuccess,
    updateExpSuccess,
    updateCurrCandidateSuccess,
    requestFailDash,
    requestStartDash,
    removeSavedJobSuccess,
    getSavedJobsSuccess,
    setSavedJobsPage,
    getSavedCompaniesSuccess,
    setSavedCompaniesPage,
    updateNotificationSuccess,
    addNotification,
    setToggle,
    addResume,
    requestSuccessDash,
    deleteResumeSuccess,
    getRecommendedJobsSuccess,
    setCurrDashEducation, setCurrDashExperience,
    getCandidateProfileViewsForChartSuccess,
    getCandidateProfileTotalViewsSuccess,
} = candidateDashboardSlice.actions;

export default candidateDashboardSlice.reducer;
