// src/components/Post.js
import React from 'react';
import { FaThumbsUp, FaComment, FaShare, FaBookmark } from 'react-icons/fa';

const AllPosts = ({  allPosts }) => {
  return (
    <>
     {allPosts &&
        allPosts?.map((postData) => (
            <div className="bg-white p-4 mb-4 border rounded-md shadow-md" key={postData?._id}>
      <div className="flex items-center">
        <img
          src={postData?.author?.account?.avatar?.url}
          alt="Profile"
          className="rounded-full h-8 w-8 mr-2"
        />
        <div>
          <p className="font-semibold">{postData?.author?.account?.username}</p>
          <p className="text-gray-500 text-sm">{postData?.createdAt}</p>
        </div>
      </div>
      <p className="mt-2">{postData?.content}</p>
      {postData?.images && (
        <div className="mb-4">
        {postData?.images.map((image, index) => (
          <img
            key={index}
            src={image?.url}
            alt={`Post Image ${index + 1}`}
            className="w-full rounded-md"
          />
        ))}
      </div>
      )}
      <div className="flex justify-between mt-4">
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-500">
            <FaThumbsUp className="mr-2" />
           {postData?.likes} Like
          </button>
          <button className="flex items-center text-gray-500">
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
        ))
     }
    </>
  );
};

export default AllPosts;
