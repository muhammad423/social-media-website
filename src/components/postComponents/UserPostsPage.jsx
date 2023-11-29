import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaThumbsUp,
  FaComment,
  FaBookmark,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserPostsPage = ({ oneUserPosts, myPosts, tokn, setMyposts, setOpenUpdateModel }) => {

  const navigate = useNavigate();
  const [isLiked, setLiked] = useState(false);
  const [isBookmarked, setBookmarked] = useState(false);
  const { userPosts } = useSelector((state) => state.auth);
  console.log("userPost Data profile", userPosts);

  const handleLike = () => {
    setLiked(!isLiked);
  };

  const handleBookmark = () => {
    setBookmarked(!isBookmarked);
  };

  const handleUpdatePosts = (postId) => {
    let updatedPosts = myPosts?.posts.filter((post) => post._id != postId)
    setMyposts(updatedPosts)
  }

  const handleDeletePost = async (postId) => {
    const response = await axios.delete(`http://localhost:8080/api/v1/social-media/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${tokn}`
      }
    })
    if (response.status == 200) {
      handleUpdatePosts(postId)
    }

  }


  return (
    <>
      {oneUserPosts ? (
        <>
          {oneUserPosts?.data?.posts?.map((post) => (
            <>
              <div className="bg-white p-4 my-4 rounded-md shadow-md">
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
                      <p className="text-gray-500">{post?.createdAt}</p>
                    </div>
                  </div>
                  <div>
                    {/* <div>
                      <div className="flex space-x-2">
                        <button className="text-gray-500">
                          <FaEdit />
                        </button>
                        <button className="text-red-500">
                          <FaTrash />
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>

                <p className="mb-4">{post?.content}</p>
                {post?.tags && (
                  <div className="mb-4">
                    {post?.tags.map((tag, index) => (
                      <p key={index}>
                        <b>{tag}</b>
                      </p>
                    ))}
                  </div>
                )}

                {/* Display images, videos, etc. as needed */}
                {post?.images && (
                  <div className="mb-4">
                    {post?.images.map((image, index) => (
                      <img
                        key={index}
                        src={image?.url}
                        alt={`Post Image ${index + 1}`}
                        className="w-full h-[300px] rounded-md mb-2 object-cover"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-1 ${isLiked ? "text-blue-500" : "text-gray-500"
                        }`}
                    >
                      <FaThumbsUp />
                      <span>{post?.likes} Likes</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500">
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
              <div className="bg-white p-4 my-4 rounded-md shadow-md">
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
                      <p className="text-gray-500">{post?.createdAt}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="flex space-x-2">
                        <button className="text-gray-500" onClick={() => setOpenUpdateModel(true)}>
                          <FaEdit />
                        </button>
                        <button className="text-red-500" onClick={() => handleDeletePost(post?._id)}>
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mb-4">{post?.content}</p>
                {post?.tags && (
                  <div className="mb-4">
                    {post?.tags.map((tag, index) => (
                      <p key={index}>
                        <b>{tag}</b>
                      </p>
                    ))}
                  </div>
                )}

                {/* Display images, videos, etc. as needed */}
                {post?.images && (
                  <div className="mb-4">
                    {post?.images.map((image, index) => (
                      <img
                        key={index}
                        src={image?.url}
                        alt={`Post Image ${index + 1}`}
                        className="w-full h-[300px] rounded-md mb-2 object-cover"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-1 ${isLiked ? "text-blue-500" : "text-gray-500"
                        }`}
                    >
                      <FaThumbsUp />
                      <span>{post?.likes} Likes</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500">
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
    </>
  );
};

export default UserPostsPage;




