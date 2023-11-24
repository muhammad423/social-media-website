import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateProfileImage = () => {
  const [avatar, setAvatar] = useState(null);
  const { accessToken, userProfileData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const handleUpdateAvatar = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatar);

      const response = await axios.patch(
        "http://localhost:8080/api/v1/users/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data) {
        navigate(`/userProfile/${userProfileData?.data?.owner}`);
      }

      console.log("Avatar updated successfully:", response.data);
      // Optionally, you might want to update the user interface or state to reflect the new avatar.
    } catch (error) {
      console.error("Error updating avatar:", error);
      // Handle the error, e.g., display an error message to the user.
    }
  };

  return (
    <div className="flex justify-center w-full items-center flex-col gap-5  ">
      <div className="h-full">
        <img
          src={userProfileData?.data?.account?.avatar?.url}
          alt="img"
          className=" w-[400px] h-[400px] rounded-full"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        className="  file:mr-5 file:py-1 file:px-3 file:border-[1px]
         file:text-xs file:font-medium
       file:bg-stone-50 file:text-stone-700
         hover:file:cursor-pointer hover:file:bg-blue-50
       hover:file:text-blue-700"
      />
      <button
        onClick={handleUpdateAvatar}
        className=" bg-text_color1 font-fontNunito text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Update
      </button>
    </div>
  );
};

export default UpdateProfileImage;
