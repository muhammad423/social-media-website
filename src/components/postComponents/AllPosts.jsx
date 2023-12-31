// src/components/Post.js
import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaComment, FaShare, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userLikeOrUnLikePost, userProfileByName } from "../../auth/auth";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSearchUserProfileData } from "../../redux/AuthSlice";
import CommentBoxModel from "../modelsComponents/CommentBoxModel";

const AllPosts = ({
  allPosts,
  tokn,
  handleLike,
  isLikedPost,
  setIsOpenCBox,
  isOpenCBox,
  getAllPosts,
  curUser
}) => {
  const [posts, setPosts] = useState(null);
  const dispatch = useDispatch();
  const usersProfile = async (query) => {
    const data = await userProfileByName(query, tokn);
    if (data) {
      dispatch(getSearchUserProfileData(data));
    }
  };

  const handleTime = (time) => {
    const originalDateString = time;
    const originalDate = new Date(originalDateString);

    const formattedDate = `${(originalDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${originalDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${originalDate.getFullYear()} ${originalDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${originalDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${originalDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  };

  const sortedPosts = allPosts
    ?.slice()
    ?.sort(
      (a, b) =>
        new Date(handleTime(b.createdAt)) - new Date(handleTime(a.createdAt))
    );

  const handleComment = (posts) => {
    setPosts(posts);
    setIsOpenCBox(true);
  };
  return (
    <>
      {sortedPosts &&
        sortedPosts?.map((postData) => (
          <div
            className="bg-white p-4 mb-4 border rounded-md shadow-md"
            key={postData?._id}
          >
            <div className="flex items-center">
              <img
                src={postData?.author?.account?.avatar?.url}
                alt="Profile"
                className="rounded-full h-8 w-8 mr-2"
              />
              <div>
                <Link to={`/userProfile/${postData?.author?.owner}`}>
                  <p
                    className="font-semibold cursor-pointer"
                    onClick={() =>
                      usersProfile(postData?.author?.account?.username)
                    }
                  >
                    {postData?.author?.account?.username}
                  </p>
                </Link>
                <p className="text-gray-500 text-sm">
                  {handleTime(postData?.createdAt)}
                </p>
              </div>
            </div>
            <p className="mt-2">{postData?.content}</p>
            <div>
              {postData?.tags && (
                <div className="mb-4 flex items-center gap-5">
                  {postData?.tags.map((tag, index) => (
                    <p key={index}>
                      <b>{tag}</b>
                    </p>
                  ))}
                </div>
              )}
            </div>
            {postData?.images && (
              <div
                className={`mb-4 grid ${
                  postData?.images?.length > 1 ? "grid-cols-2" : "grid-cols-1"
                } gap-3`}
              >
                {postData?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image?.url}
                    alt={`Post Image ${index + 1}`}
                className={`w-full  ${ postData?.images?.length > 1 ? 'h-[400px]': 'h-[500px]' } rounded-md object-cover overflow-hidden`}
                  />
                ))}
              </div>
            )}
            <div className="flex justify-between mt-4">
              <div className="flex items-center space-x-4">
                <button
                  className={`flex items-center ${
                    postData?.isLiked ? "text-blue-500" : "text-gray-500"
                  }`}
                  onClick={() => handleLike(postData?._id, tokn)}
                >
                  <FaThumbsUp className="mr-2" />
                  {postData?.likes} Like
                </button>
                <button
                  className="flex items-center text-gray-500"
                  onClick={() => handleComment(postData?._id)}
                >
                  <FaComment className="mr-2" />
                  {postData?.comments} Comment
                </button>
                <button className="flex items-center text-gray-500">
                  <FaShare className="mr-2" />
                  Share
                </button>
              </div>
              <button className="flex items-center text-gray-500">
                <FaBookmark className="mr-2" />
                Bookmark
              </button>
            </div>
          </div>
        ))}

      <div className="my-4">
        <CommentBoxModel
          isOpenCBox={isOpenCBox}
          setIsOpenCBox={setIsOpenCBox}
          posts={posts}
          tokn={tokn}
          handleTime={handleTime}
          getAllPosts={getAllPosts}
          curUser={curUser}
        />
      </div>
    </>
  );
};

export default AllPosts;
