// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    User,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/config/firebase";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const loginWithGoogle = createAsyncThunk(
    'auth/loginWithGoogle',
    async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            return result.user
        } catch (error) {
            throw error;
        }
    }
);

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({ email, password }: { email: string; password: string }) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            // if (result?.user) sendEmailVerification(result?.user);
            return result.user;
        } catch (error) {
            throw error;
        }
    }
);


export const { setUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
