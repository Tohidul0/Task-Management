import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  role: string;
  title: string;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();

  const submitHandler: SubmitHandler<RegisterFormInputs> = async (data) => {
    console.log("Submitted Data:", data);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/auth/register`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 201 && res.data.message === "success") {
        window.alert("Registration successful! Redirecting to login...");
        navigate("/log-in"); 
      } else {
        window.alert( "Registration failed!");
      }
    } catch (error: unknown) {
      console.error("An error occurred:", error);
      window.alert("An error occurred during registration.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-50 via-white to-orange-100">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 p-6">
        {/* Left Side */}
        <div className="lg:w-1/2 flex flex-col items-start">
          <div className="flex flex-col gap-6">
            <span className="inline-block bg-orange-100 text-orange-700 text-sm font-medium py-1 px-4 rounded-full">
              Join the community!
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-orange-800 leading-tight">
              Smart <br />
              <span className="text-orange-600">Task Management</span>
            </h1>
            <p className="text-gray-700 text-base md:text-lg">
              Create an account to organize your tasks, boost productivity, and
              achieve your goals effortlessly.
            </p>
          </div>

          {/* Decorative Element */}
          <div className="mt-10 relative">
            <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-orange-300 to-orange-500 opacity-30 rounded-full w-[250px] h-[250px]"></div>
            <div className="relative w-[120px] h-[120px] border-4 border-orange-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 bg-white shadow-lg rounded-3xl p-10">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-8"
          >
            {/* Heading */}
            <div>
              <h2 className="text-2xl font-semibold text-orange-700 text-center">
                Create Your Account
              </h2>
              <p className="text-center text-gray-600 text-sm">
                Sign up to manage your tasks seamlessly.
              </p>
            </div>

            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-gray-700 text-sm font-medium"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your full name"
                {...register("name", {
                  required: "Full Name is required!",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Role Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="role"
                className="text-gray-700 text-sm font-medium"
              >
                Role
              </label>
              <input
                id="role"
                type="text"
                className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your role (e.g., Developer, Manager)"
                {...register("role", {
                  required: "Role is required!",
                })}
              />
              {errors.role && (
                <p className="text-red-500 text-xs">{errors.role.message}</p>
              )}
            </div>

            {/* Title Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="title"
                className="text-gray-700 text-sm font-medium"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your title (e.g., Senior Developer)"
                {...register("title", {
                  required: "Title is required!",
                })}
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-200"
            >
              Register
            </button>
          </form>
          <p><small>Have an account allreardy? <span className="font-semibold text-orange-700"><Link to='/log-in'>SignIn</Link></span></small></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
