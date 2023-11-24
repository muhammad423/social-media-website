import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../auth/auth";
import signUpImg from '../assets/undraw_sign_up_n6im.svg'

const RegisterPage = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const userRegisterData = await userRegister('/register',data);
      console.log("User registered:", userRegisterData);
      if(userRegisterData){
        navigate('/signin')
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-10 mt-10 ">
      <div className=" bg-slate-400 p-3 w-1/2">
      <img src={signUpImg} alt="img" />
      </div>
      <form className="flex flex-col gap-5 w-1/5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="userName" className="text-lg font-semibold">
            Full Name
          </label>
          <input
            type="text"
            {...register("username", { required: "Full Name is required" })}
            className="border-0 outline-none bg-slate-200 w-full py-2 px-3 font-semibold rounded-md"
          />
          {errors.userName && (
            <p className="text-red-500">{errors.userName.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="role" className="text-lg font-semibold">
            Role
          </label>
          <input
            type="text"
            {...register("role", { required: "Role is required" })}
            className="border-0 outline-none bg-slate-200 w-full py-2 px-3 font-semibold rounded-md"
          />
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}
        </div>
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
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
