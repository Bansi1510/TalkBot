
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { User } from "../src/types"
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
    const msg = axiosErr.response?.data?.message || "Login Error";
    toast.error(msg);
    return null
  }
}