"use client";
import { useState } from "react";
import * as React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import { signin, signinFormValues } from "../api";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const SigninForm: React.FC<{}> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const initialValues: signinFormValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        await signin(values);
        router.push("/");
      } catch (error) {
        // Handle error (e.g., show a toast or set an error state)
        console.error(error);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="example@example.com"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="********"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 bottom-3"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
export default SigninForm;
