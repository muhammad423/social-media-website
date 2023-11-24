import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaBookmark, FaEdit, FaTrash } from 'react-icons/fa'; // You can use other icons as needed
import { useSelector } from 'react-redux';

const UserPostsPage = () => {
  const [isLiked, setLiked] = useState(false);
  const [isBookmarked, setBookmarked] = useState(false);
  const {userPosts} = useSelector((state) => state.auth)


  const handleLike = () => {
    setLiked(!isLiked);
  };

  const handleBookmark = () => {
    setBookmarked(!isBookmarked);
  };

  return (
    <div className="bg-white p-4 my-4 rounded-md shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={userPosts?.data?.author?.account?.avatar?.url} // Replace with the user's avatar URL
            alt={userPosts?.data?.author?.account?._id}
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <p className="font-bold">{userPosts?.data?.author?.account?.username}</p>
            <p className="text-gray-500">{userPosts?.data?.author?.account?.createdAt}</p>
          </div>
        </div>
        <div>
        <div>
         
            <div className="flex space-x-2">
              <button  className="text-gray-500">
                <FaEdit />
              </button>
              <button  className="text-red-500">
                <FaTrash />
              </button>
            </div>
     
        </div>
        </div>
      </div>

      <p className="mb-4">{userPosts?.data?.content}</p>

      {/* Display images, videos, etc. as needed */}
      {userPosts?.data?.images && (
        <div className="mb-4">
          {userPosts?.data?.images.map((image, index) => (
            <img
              key={index}
              src={image?.url}
              alt={`Post Image ${index + 1}`}
              className="w-full h-[600px] rounded-md mb-2 object-cover"
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 ${
              isLiked ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <FaThumbsUp />
            <span>{userPosts?.data?.likes} Likes</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500">
            <FaComment />
            <span>{userPosts?.data?.comments} Comments</span>
          </button>
        </div>
        <button onClick={handleBookmark} className="text-gray-500">
          <FaBookmark />
        </button>
      </div>

      {/* Add comments section if needed */}
    </div>
  );
};

export default UserPostsPage;