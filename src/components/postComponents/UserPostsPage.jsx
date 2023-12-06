import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaThumbsUp,
  FaComment,
  FaBookmark,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import UpdatePostModel from "../modelsComponents/UpdatePostModel";
import { userLikeOrUnLikePost } from "../../auth/auth";
import CommentBoxModel from "../modelsComponents/CommentBoxModel";

const UserPostsPage = ({
  oneUserPosts,
  isUpdatePostModal,
  setIsUpdatePostModal,
  myPosts,
  tokn,
  handleDeletePost,
  handleTime,
  handleLike,
  getMyPosts,
  getPostsByUserName
}) => {
  const [isBookmarked, setBookmarked] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [isOpenCBox, setIsOpenCBox] = useState(false)

    

  const handleEdit = (post) => {
    setIsUpdatePostModal(true);
    setUpdateData(post);
  };

const handleComment = (post) => {
  setIsOpenCBox(true)
  setUpdateData(post)
}

  const handleBookmark = () => {
    setBookmarked(!isBookmarked);
  };

  return (
    <>
      {oneUserPosts ? (
        <>
          {oneUserPosts?.data?.posts?.map((post) => (
            <>
              <div className="bg-white p-4 my-4 rounded-md relative shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={post.author?.account?.avatar?.url}
                      alt={post?.author?.account?._id}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                      <p className="font-bold">
                        {post.author?.account?.username}
                      </p>
                      <p className="text-gray-500">
                        {() => handleTime(post?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div></div>
                </div>
                {post?.images.length === 0 ? (
                  <div className=" flex justify-center  bg-bg_color text-white px-2 items-center flex-col gap-2 h-[300px]   text-center">
                    <p className="mb-2 text-sm font-medium">{post?.content}</p>
                    {post?.tags && (
                      <div className="mb-1 flex items-center justify-center gap-2 ">
                        {post?.tags.map((tag, index) => (
                          <p key={index}>
                            <b className="text-center">{tag}</b>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <p className="mb-2">{post?.content}</p>

                    {post?.tags && (
                      <div className="mb-1 flex items-center gap-5">
                        {post?.tags.map((tag, index) => (
                          <p key={index}>
                            <b>{tag}</b>
                          </p>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Display images, videos, etc. as needed */}
                {post?.images && (
                  <div
                    className={`mb-4 grid gap-3 ${
                      post?.images.length > 1 ? "grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {post?.images.map((image, index) => (
                      <img
                        key={index}
                        src={image?.url}
                        alt={`Post Image ${index + 1}`}
                        className="w-full h-[250px] rounded-md mb-2 object-cover"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between absolute bottom-0 left-0 right-0 p-2 mt-3">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post?._id, tokn)}
                      className={`flex items-center space-x-1 ${
                       post?.isLiked ? "text-blue-500" : "text-gray-500"
                      }`}
                    >
                      <FaThumbsUp />
                      <span>{post?.likes} Likes</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500" onClick={() => handleComment(post?._id)}>
                      <FaComment />
                      <span>{post?.comments} Comments</span>
                    </button>
                  </div>
                  <button onClick={handleBookmark} className="text-gray-500">
                    <FaBookmark />
                  </button>
                </div>

                {/* Add comments section if needed */}
              </div>
            </>
          ))}
        </>
      ) : (
        <>
          {myPosts?.posts?.map((post) => (
            <>
              <div className={`bg-white p-4 my-4  shadow-md relative `}>
                <div className="flex items-center justify-between mb-4 ">
                  <div className="flex items-center">
                    <img
                      src={post.author?.account?.avatar?.url}
                      alt={post?.author?.account?._id}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <div>
                      <p className="font-bold">
                        {post.author?.account?.username}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {handleTime(post?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="flex space-x-2">
                        <button
                          className="text-gray-500"
                          onClick={() => handleEdit(post)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => handleDeletePost(post?._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {post?.images.length === 0 ? (
                  <div className=" flex justify-center  bg-bg_color text-white px-2 items-center flex-col gap-2 h-[300px]    text-center">
                    <p className="mb-2 text-sm font-medium">{post?.content}</p>
                    {post?.tags && (
                      <div className="mb-1 flex items-center justify-center gap-2 ">
                        {post?.tags.map((tag, index) => (
                          <p key={index}>
                            <b className="text-center">{tag}</b>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <p className="mb-2">{post?.content}</p>

                    {post?.tags && (
                      <div className="mb-1 flex items-center gap-5">
                        {post?.tags.map((tag, index) => (
                          <p key={index}>
                            <b>{tag}</b>
                          </p>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Display images, videos, etc. as needed */}
                {post?.images && (
                  <div
                    className={`mb-4 grid gap-3 ${
                      post?.images.length > 1 ? "grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {post?.images.map((image, index) => (
                      <img
                        key={index}
                        src={image?.url}
                        alt={`Post Image ${index + 1}`}
                        className="w-full h-[250px] rounded-md mb-2 object-cover"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between absolute bottom-0 left-0 right-0 p-2 mt-3">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post?._id, tokn)}
                      className={`flex items-center space-x-1 ${
                        post?.isLiked ? "text-blue-500" : "text-gray-500"
                      }`}
                    >
                      <FaThumbsUp />
                      <span>{post?.likes} Likes</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500" onClick={() => handleComment(post?._id)}>
                      <FaComment />
                      <span>{post?.comments} Comments</span>
                    </button>
                  </div>
                  <button onClick={handleBookmark} className="text-gray-500">
                    <FaBookmark />
                  </button>
                </div>

                {/* Add comments section if needed */}
              </div>
            </>
          ))}
        </>
      )}
      {isUpdatePostModal && (
        <UpdatePostModel
          isUpdatePostModal={isUpdatePostModal}
          setIsUpdatePostModal={setIsUpdatePostModal}
          updateData={updateData}
          tokn={tokn}
        />
      )}

      <CommentBoxModel 
      isOpenCBox={isOpenCBox} 
      setIsOpenCBox={setIsOpenCBox} 
      posts={updateData} 
      tokn={tokn} 
      handleTime={handleTime} 
      getMyPosts={getMyPosts}
      getPostsByUserName={getPostsByUserName}
      />
    </>
  );
};

export default UserPostsPage;
