"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { UserLoginInterface, UserSignupInterface } from "@/lib/interface";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const signupSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (
    values: UserLoginInterface,
    { resetForm }: any
  ) => {
    try {
      const { data } = await axios.post("/api/auth/login", values);
      toast.success(data?.message);
      resetForm();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleSignup = async (
    values: UserSignupInterface,
    { resetForm }: any
  ) => {
    try {
      const { data } = await axios.post("/api/auth/signup", values);
      toast.success(data?.message);
      resetForm();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh_-_4rem)] bg-black">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* Toggle Buttons */}
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 text-lg font-semibold py-2 transition-colors ${
              isLogin
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 text-lg font-semibold py-2 transition-colors ${
              !isLogin
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container with Sliding Transition */}
        <div className="overflow-hidden relative">
          <motion.div
            className="flex"
            animate={{ x: isLogin ? "0%" : "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Login Form */}
            <div className="w-full flex-shrink-0 p-4">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={loginSchema}
                onSubmit={handleLogin}
              >
                <Form>
                  <div className="mb-2">
                    <Field
                      type="email"
                      placeholder="Username or Email"
                      name="email"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1 px-2"
                    />
                  </div>
                  <div className="mb-2">
                    <Field
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1 px-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Login
                  </button>
                </Form>
              </Formik>
            </div>

            {/* Signup Form */}
            <div className="w-full flex-shrink-0 p-4">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  username: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={signupSchema}
                onSubmit={handleSignup}
              >
                {({ errors, touched }) => (
                  <Form>
                    {/* Full Name Field */}
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1 px-2"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="mb-2">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1 px-2"
                      />
                    </div>

                    {/* Username Field */}
                    <div className="mb-2">
                      <Field
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 text-sm mt-1 px-2"
                      />
                    </div>

                    {/* Password Field */}
                    <div className="mb-2">
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1 px-2"
                      />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-2">
                      <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm mt-1 px-2"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Sign Up
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
