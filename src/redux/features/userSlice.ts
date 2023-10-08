import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICandidate, IEmployer } from '@/types/user-type'

type myUser = ICandidate | IEmployer | null

export interface userState {
    user: myUser
    loading: boolean,
    isAuthenticated: boolean,
    error: string | null,
    userRole: string,
    whoIsTryingToLoginWithLn: string,
}
const initialState: userState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: null,
    userRole: "",
    whoIsTryingToLoginWithLn: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserStart: (state) => {
            state.loading = true;
        },
        getUserSuccess: (state, action: PayloadAction<myUser>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.userRole = action.payload?.role as string
        },
        getUserFail: (state, action: PayloadAction<string>) => {
            state.loading = false,
                state.error = action.payload
            state.isAuthenticated = false;
        },
        logoutUserSuccess: (state, action: PayloadAction<myUser>) => {
            state.loading = false;
            state.user = action.payload;
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
        }
    },
})

export const { getUserFail, getUserStart, setLoggerWithLn, getUserSuccess, logoutUserFail, logoutUserSuccess } = userSlice.actions

export default userSlice.reducer
