import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateSocialMediaPostForm = ({ tokn, updateData }) => {
  console.log("heloPost", updateData);
  const [updateImage, setUpdateImage] = useState();
  console.log(updateData, 'delet')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, register, setValue, getValues } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("content", data.content);

      const imageFiles = getValues("images");
      for (let i = 0; i < imageFiles.length && i < 6; i++) {
        formData.append("images", imageFiles[i]);
      }

      const tags = getValues("tags");
      tags.forEach((tag, ind) => {
        formData.append(`tags[${ind}]`, tag);
      });

      const response = await axios.patch(
        `http://localhost:8080/api/v1/social-media/posts/${updateData?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${tokn}`,
          },
        }
      );

      if (response?.status === 200) {
        setUpdateImage(response?.data?.data);
      }

      console.log("Post updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleUpdateImages = (imgId) => {
    let updatedImages = updateData?.filter((image) => image._id != imgId);
    setUpdateImage(updatedImages);
  };

  const handleRemoveImage = async (imgId) => {
    const response = axios.patch(
      `http://localhost:8080/api/v1/social-media/posts/remove/image/${updateData?._id}/${imgId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${tokn}`,
        },
      }
    );
    if (response.status == 200) {
      handleUpdateImages(imgId);
    }
    setUpdateImage(response?.data?.data)
   
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <textarea
          {...register("content")}
          placeholder="What's on your mind?"
          className="w-full p-2 border-none resize-none outline-none"
          defaultValue={updateData?.content}
        />
      </div>
      <div className="p-4 border-b flex items-center">
        <input
          type="file"
          {...register("images")}
          className="hidden"
          accept="image/*"
          multiple
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer text-blue-500 hover:text-blue-700"
        >
          📷 Add Photos/Videos
        </label>
      </div>
      <div className=" p-3 ">
        {updateImage ? (
          <div className="mb-4  grid grid-cols-2 gap-3 ">
            {updateImage.images?.map((image, index) => (
              <div className="relative">
                <img
                  key={index}
                  src={image?.url}
                  alt={`Post Image ${index + 1}`}
                  className=" w-full h-[300px] rounded-md mb-2 object-cover"
                />
                <button
                  className="absolute right-2 top-2 text-icons_color"
                  onClick={() => handleRemoveImage(image?._id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-4  grid grid-cols-2 gap-3 ">
            {updateData.images?.map((image, index) => (
              <div className="relative">
                <img
                  key={index}
                  src={image?.url}
                  alt={`Post Image ${index + 1}`}
                  className=" w-full h-[300px] rounded-md mb-2 object-cover"
                />
                <button
                  className="absolute right-2 top-2 text-icons_color"
                  onClick={() => handleRemoveImage(image?._id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            {...register("tags[0]")}
            placeholder="Tag 1"
            className="flex-grow p-2 border-none rounded-md outline-none"
            defaultValue={updateData?.tags[0]}
          />
          <input
            type="text"
            {...register("tags[1]")}
            placeholder="Tag 2"
            className="flex-grow p-2 border-none rounded-md outline-none"
            defaultValue={updateData?.tags[1]}
          />
          <input
            type="text"
            {...register("tags[2]")}
            placeholder="Tag 3"
            className="flex-grow p-2 border-none rounded-md outline-none"
            defaultValue={updateData?.tags[2]}
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Update Post
        </button>
      </div>
    </div>
  );
};

export default UpdateSocialMediaPostForm;
