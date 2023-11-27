import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaBookmark, FaEdit, FaTrash } from 'react-icons/fa'; // You can use other icons as needed
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserPostsPage = ({myPosts}) => {
  const navigate = useNavigate()
  const [isLiked, setLiked] = useState(false);
  const [isBookmarked, setBookmarked] = useState(false);
  const {userPosts} = useSelector((state) => state.auth)
  console.log('userPost Data profile', userPosts)


  const handleLike = () => {
    setLiked(!isLiked);
  };

  const handleBookmark = () => {
    setBookmarked(!isBookmarked);
  };

  return (
    <>
     {
      myPosts?.posts?.map((post) => (
        <>
           <div className="bg-white p-4 my-4 rounded-md shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={post.author?.account?.avatar?.url} // Replace with the user's avatar URL
            alt={post?.author?.account?._id}
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <p className="font-bold">{post.author?.account?.username}</p>
            <p className="text-gray-500">{post?.createdAt}</p>
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

      <p className="mb-4">{post?.content}</p>
      {post?.tags && (
        <div className="mb-4">
          {post?.tags.map((tag, index) => (
           <p key={index}><b>{tag}</b></p>
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
              className="w-full h-[500px] rounded-md mb-2 object-cover"
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
      ))
     }
    </>
  );
};

export default UserPostsPage;