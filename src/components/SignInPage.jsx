import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../auth/auth";
import { authAccessToken, authRefreshToken, authUserInformation } from "../redux/AuthSlice";


const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const userData = await userLogin('/login', data);
      console.log("User logedin:", userData);
      if (userData?.data) {
        navigate('/')
        dispatch(authAccessToken(userData?.data?.accessToken))
        dispatch(authUserInformation(userData?.data?.user))
        dispatch(authRefreshToken(userData?.data?.refreshToken))
      } else {
        navigate('/signIn')
      }

    } catch (error) {
      console.error("Loged in error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-10">
      <div className="">

      </div>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-semibold">
            Email
          </label>
          <input
            type="text"
            {...register("email", { required: "Email is required" })}
            className="border-0 outline-none bg-slate-200 w-full py-2 px-3 font-semibold rounded-md"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-lg font-semibold">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="border-0 outline-none bg-slate-200 w-full py-2 px-3 font-semibold rounded-md"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div>
          <button type="submit" className="w-full py-2 px-3 bg-red-300">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;


// #F16363