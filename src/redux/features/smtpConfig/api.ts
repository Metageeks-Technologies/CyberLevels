import instance from "@/lib/axios";
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import {
  fetchSmtpConfigError,
  fetchSmtpConfigRequest,
  fetchSmtpConfigSuccess,
  addSmtpConfigSuccess,
  setSmtpConfig,
  
} from "./slice";

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}

export const getSmtpConfigs = async (dispatch: AppDispatch) => {
  dispatch(fetchSmtpConfigRequest());
  try {
    const { data } = await instance.get("/smtpConfig");
    dispatch(setSmtpConfig(data));
    return data;
  } catch (error) {
    const e = error as AxiosError;
    dispatch(fetchSmtpConfigError(e.message));
    return [];
  }
};

export const addSmtpConfig = async (dispatch: AppDispatch, smtpConfig: SmtpConfig) => {
  dispatch(fetchSmtpConfigRequest());
  try {
    const { data } = await instance.post("/smtpConfig", smtpConfig);
    dispatch(addSmtpConfigSuccess(data));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(fetchSmtpConfigError(e.message));
    return null;
  }
};