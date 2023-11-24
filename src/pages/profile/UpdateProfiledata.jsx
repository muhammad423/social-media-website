import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfiledata = () => {
  const navigate = useNavigate();
  const { accessToken, userProfileData } = useSelector((state) => state.auth);
  const formattedDate = new Date(userProfileData.data.dob)
    .toISOString()
    .split("T")[0];
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      bio: userProfileData?.data?.bio,
      countryCode: userProfileData?.data?.countryCode,
      dob: formattedDate,
      firstName: userProfileData?.data?.firstName,
      lastName: userProfileData?.data?.lastName,
      location: userProfileData?.data?.location,
      phoneNumber: userProfileData?.data?.phoneNumber,
    },
  });

  const onSubmit = async (data) => {
    console.log(data, "updateData");
    try {
      // Make sure to use "data" instead of "userData" from react-hook-form
      const response = await axios.patch(
        "http://localhost:8080/api/v1/social-media/profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response?.data) {
        navigate(`/userProfile/${userProfileData?.data?.owner}`);
      }
      console.log("Profile Updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="bg-bg_color">
      <div className="max-w-lg mx-auto mt-8 p-6  shadow-md rounded-md ">
        <h1 className="text-2xl  text-center text-white my-5 font-semibold font-fontRoboto mb-4">
          Update Profile
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex gap-3">
            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-white">
                First Name
              </label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 font-fontNunito p-2 border rounded-md w-full"
                  />
                )}
              />
            </div>

            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-white">
                Last Name
              </label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 font-fontNunito p-2 border rounded-md w-full"
                  />
                )}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Bio</label>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="mt-1 font-fontNunito p-2 border rounded-md w-full"
                />
              )}
            />
          </div>
          <div className="flex gap-3">
            <div className="mb-4 max-w-xs">
              <label className="block text-sm font-medium text-white">
                Country Code
              </label>
              <Controller
                name="countryCode"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 font-fontNunito p-2 border rounded-md w-full"
                  />
                )}
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-sm font-medium text-white">
                Phone Number
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="mt-1 font-fontNunito p-2 border rounded-md w-full"
                  />
                )}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Date of Birth
            </label>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="mt-1 font-fontNunito p-2 border rounded-md w-full"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Location
            </label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="mt-1 font-fontNunito p-2 border rounded-md w-full"
                />
              )}
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className=" bg-text_color1 font-fontNunito text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfiledata;
