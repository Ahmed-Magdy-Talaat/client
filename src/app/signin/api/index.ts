import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface signinFormValues {
  email: string;
  password: string;
}
export async function signin({ email, password }: signinFormValues) {
  try {
    const res = await axios.post("http://tickets.com/api/users/signin", {
      email,
      password,
    });
    console.log(res);
    toast.success(res.data.message);
  } catch (err: any) {
    console.log(err);
    toast.error(err.response.data.errors[0].message);
  }
}
