import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getUserPosts } from "../../redux/AuthSlice";

const SocialMediaPostForm = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register, setValue, getValues } = useForm();
  const token = useSelector((state) => state.auth.accessToken);

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

      console.log("FormData:", formData);
      const response = await axios.post(
        "http://localhost:8080/api/v1/social-media/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data) {
        dispatch(getUserPosts(response?.data));
      }

      console.log("Post created successfully:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-md shadow-md">
      <div className="p-4 border-b">
        <textarea
          {...register("content")}
          placeholder="What's on your mind?"
          className="w-full p-2 border-none resize-none outline-none"
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
          Add Photos/Videos
        </label>
      </div>
      <div className="p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            {...register("tags[0]")}
            placeholder="Tag 1"
            className="flex-grow p-2 border-none rounded-md outline-none"
          />
          <input
            type="text"
            {...register("tags[1]")}
            placeholder="Tag 2"
            className="flex-grow p-2 border-none rounded-md outline-none"
          />
          <input
            type="text"
            {...register("tags[2]")}
            placeholder="Tag 3"
            className="flex-grow p-2 border-none rounded-md outline-none"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default SocialMediaPostForm;
