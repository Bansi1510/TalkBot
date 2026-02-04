
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `http://localhost:2211/api/auth/`,
  withCredentials: true
})

API.defaults.withCredentials = true;

export const signUpAPI = async (name: string, email: string, password: string) => {
  try {

    const res = await API.post("sign-up", { name, email, password });
    if (res.data.success) {
      console.log(res.data);
    } else {
      toast.error(res.data.message);
    }

  } catch (error: unknown) {
    const axiosErr = error as AxiosError<{ message?: string }>;
    const msg = axiosErr.response?.data?.message || "Login Error";
    toast.error(msg);
  }
}

export const loginAPI = async (email: string, password: string) => {
  try {
    const res = await API.post("login", { email, password });
    if (res.data.success) {
      console.log(res.data);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    const axiosErr = error as AxiosError<{ message?: string }>;
    const msg = axiosErr.response?.data?.message || "Login Error";
    toast.error(msg);
  }
}