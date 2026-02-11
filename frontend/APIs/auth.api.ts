
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { User } from "../src/types";
const VITE_API = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${VITE_API}/api/auth/`,
  withCredentials: true
})

API.defaults.withCredentials = true;

export const signUpAPI = async (name: string, email: string, password: string): Promise<User | null> => {
  try {
    console.log(VITE_API)
    const res = await API.post("sign-up", { name, email, password });
    if (res.data.success) {
      return res.data.user
    } else {
      toast.error(res.data.message);
      return null;
    }

  } catch (error: unknown) {
    const axiosErr = error as AxiosError<{ message?: string }>;
    const msg = axiosErr.response?.data?.message || "Login Error";
    toast.error(msg);
    return null;
  }
}

export const loginAPI = async (email: string, password: string): Promise<User | null> => {
  try {
    const res = await API.post("login", { email, password });
    if (res.data.success) {

      return res.data.user
    } else {
      toast.error(res.data.message);
      return null;
    }
  } catch (error) {
    const axiosErr = error as AxiosError<{ message?: string }>;
    const msg = axiosErr.response?.data?.message || "Login Error";
    toast.error(msg);
    return null;
  }
}