import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICandidate, IEmployer } from '@/types/user-type'

interface User {
    user: string,
    userRole: string,
    avatar: string,
    name: string,
}

export interface userState {
    currUser: string | null;
    loading: boolean,
    isAuthenticated: boolean,
    error: string | null,
    userRole: string,
    whoIsTryingToLoginWithLn: string,
    avatar: string,
    name: string,
}
const initialState: userState = {
    currUser: null,
    loading: false,
    isAuthenticated: false,
    error: null,
    userRole: "",
    avatar: "none",
    whoIsTryingToLoginWithLn: "",
    name: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserStart: (state) => {
            state.loading = true;
        },
        getUserFail: (state, action: PayloadAction<string>) => {
            state.loading = false,
                state.error = action.payload
            state.isAuthenticated = false;
        },
        getUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false,
                state.isAuthenticated = true;
            state.userRole = action.payload.userRole,
                state.currUser = action.payload.user
            state.error = null

        },

        logoutUserSuccess: (state, action: PayloadAction<null>) => {
            state.loading = false;
            state.currUser = action.payload;
            state.isAuthenticated = false;
            state.userRole = ""
            state.error = null,
                state.whoIsTryingToLoginWithLn = ""
        },
        logoutUserFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload
        },
        setLoggerWithLn: (state, action: PayloadAction<string>) => {
            state.whoIsTryingToLoginWithLn = action.payload
        },

    },
})

export const { getUserFail, getUserStart, setLoggerWithLn, getUserSuccess, logoutUserFail, logoutUserSuccess } = userSlice.actions
export default userSlice.reducer
