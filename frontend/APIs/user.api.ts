
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { GeminiResponse, User } from "../src/types"
const API = axios.create({
  baseURL: `http://localhost:2211/api/user/`,
  withCredentials: true
})

API.defaults.withCredentials = true;

export const getUserAPI = async (): Promise<User | null> => {
  try {
    const res = await API.get("");
    if (res.data.success) {
      return res.data.user
    } else {
      toast.error(res.data.message)
      return null;
    }
  } catch (error: unknown) {
    const axiosErr = error as AxiosError<{ message?: string }>;
    const msg = axiosErr.response?.data?.message || "get user Error";
    toast.error(msg);
    return null
  }
}

export const updateAssistantAPI = async (formData: FormData): Promise<User | null> => {
  try {
    const res = await API.post("update", formData);
    if (res.data.success) {
      console.log(res.data.user);
      return res.data.user;
    } else {
      toast.error(res.data.message);
      return null;
    }
  } catch (error: unknown) {
    const axiosErr = error as AxiosError<{ message?: string }>;
    const msg = axiosErr.response?.data?.message || "update assistant Error";
    toast.error(msg);
    return null;
  }
}

export const askToAssistantAPI = async (command: string): Promise<GeminiResponse | null> => {
  try {
    console.log(command)
    const res = await API.post("ask-gemini", { command });
    if (res.data.success) {
      return res.data;
    } else {
      toast.error(res.data.message);
      return null;
    }
  } catch (error: unknown) {
    const axiosErr = error as AxiosError<{ message?: string }>;
    const msg = axiosErr.response?.data?.message || "update assistant Error";
    toast.error(msg);
    return null;
  }
}