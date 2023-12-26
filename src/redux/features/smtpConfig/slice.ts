import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}

interface SmtpConfigState {
  data: SmtpConfig[];
  loading: boolean;
  error: string | null;
}

const initialState: SmtpConfigState = {
  data: [],
  loading: false,
  error: null,
};

const smtpConfigSlice = createSlice({
    name: 'smtpConfig',
    initialState,
        // host: '',
        // port: 0,
        // admin: '',
        // password: '',
        // loading,
        // error,
      
    reducers: {
        setSmtpConfig: (state, action) => {
            return { ...state, ...action.payload };
          },
      fetchSmtpConfigRequest: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchSmtpConfigSuccess: (state, action: PayloadAction<SmtpConfig[]>) => {
        state.loading = false;
        state.data = action.payload;
      },
      fetchSmtpConfigError: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
      addSmtpConfigSuccess: (state, action: PayloadAction<SmtpConfig>) => {
        state.loading = false;
        state.data.push(action.payload);
      },
    },
});

export const{
    setSmtpConfig,
    fetchSmtpConfigRequest,
  fetchSmtpConfigSuccess,
  fetchSmtpConfigError,
  addSmtpConfigSuccess,
} =smtpConfigSlice.actions;

export default smtpConfigSlice.reducer;