import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface signupFormValues {
  username: string;
  email: string;
  password: string;
}
export async function signup({ email, password, username }: signupFormValues) {
  try {
    const res = await axios.post("http://tickets.com/api/users/signup", {
      email,
      password,
      username,
    });
    console.log(res);
    toast.success(res.data.message);
  } catch (err: any) {
    toast.error(err.response.data.errors[0].message);
  }
}
