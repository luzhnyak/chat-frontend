import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

export const showError = (error: AxiosError) => {
  if (axios.isAxiosError(error)) {
    const axiosError: AxiosError = error;
    const data = axiosError.response?.data as { message: string };
    if (data) {
      toast.error(data.message);
    } else {
      toast.error("An error occurred");
    }
  }
};
