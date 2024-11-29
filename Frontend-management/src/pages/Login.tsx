import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import axios from "axios";
import { setCredentials } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";

import { Link } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}
interface SignInResponse {
  success: string;
  message?: string;
  [key: string]: any;
}
interface User {
  _id: string;
  name: string;
  email: string;
}

const Login: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const apiUrl =
    import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();

  const submitHandler: SubmitHandler<LoginFormInputs> = async (data: any) => {
    //console.log("Submitted Data:", data);
    try {
      const res = await axios.post<SignInResponse>(
        `http://localhost:3000/api/auth/login`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success === "false") {
        window.alert("Log In failed!!!");
      } else if (res.data.user) {

        const user: User = {
          _id: res.data.user._id,
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.role,
          isActive: res.data.user.isActive,
          isAdmin: res.data.user.isAdmin,
          createdAt: res.data.user.createdAt,
        };
        localStorage.setItem("token", res.data.token);

        dispatch(setCredentials(user));
        navigate("/");
      } else {
        window.alert("Unexpected response from the server!");
      }
    } catch (error: unknown) {
      window.alert("An error occurred:");
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-50 via-white to-orange-100">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 p-6">
        {/* Left Side */}
        <div className="lg:w-1/2 flex flex-col items-start">
          <div className="flex flex-col gap-6">
            <span className="inline-block bg-orange-100 text-orange-700 text-sm font-medium py-1 px-4 rounded-full">
              Simplify your workflow!
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-orange-800 leading-tight">
              Smart <br />
              <span className="text-orange-600">Task Management</span>
            </h1>
            <p className="text-gray-700 text-base md:text-lg">
              Organize your tasks, boost your productivity, and achieve your
              goals with ease. Experience seamless collaboration and streamlined
              task handling.
            </p>
          </div>


          <div className="mt-10 relative">
            <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-orange-300 to-orange-500 opacity-30 rounded-full w-[250px] h-[250px]"></div>

          </div>
        </div>


        <div className="lg:w-1/2 bg-white shadow-lg rounded-3xl p-10">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-8"
          >

            <div>
              <h2 className="text-2xl font-semibold text-orange-700 text-center">
                Welcome Back!
              </h2>
              <p className="text-center text-gray-600 text-sm">
                Your journey to organized productivity starts here.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-gray-700 text-sm font-medium"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="email@example.com"
                {...register("email", {
                  required: "Email Address is required!",
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-gray-700 text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your password"
                {...register("password", {
                  required: "Password is required!",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-200"
            >
              Login
            </button>
          </form>
          <p><small>Don't have an account? <span className="font-semibold text-orange-700"><Link to='/Sign-Up'>SignUp</Link></span></small></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
