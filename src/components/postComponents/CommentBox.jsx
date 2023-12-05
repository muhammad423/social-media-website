import React, { useEffect, useState } from "react";
import AddComments from "./AddComments";
import { getUserCommentsPost } from "../../auth/auth";

const CommentBox = ({ tokn, posts, handleTime }) => {
   const [comments, setComments] = useState(null)
    console.log(comments, 'comments')
  useEffect(() => {
    getUserComments()
  },[])
  const getUserComments = async() => {
    try {
     const response = await getUserCommentsPost(posts, tokn,)
     if(response.statusCode === 200){
        setComments(response?.data)
     }
     console.log(response)
    } catch (error) {
      console.log('get Comment errors', error)
    }
   }


  return (
    <>
      <section className="place-items-center  h-screen py-4 sm:py-8 ">
     
          <div className="px-2 py-4 bg-white rounded-xl border shadow-xl mx-auto w-4/5 sm:max-w-md sm:px-5 hover:border-blue-200">
            <small className="text-base font-bold text-gray-700 ml-1">
               {comments?.comments?.length} Comments
              </small>
            <div className="my-4  h-[400px] overflow-y-scroll">
        {
          comments?.comments.map((user) => (
            <div className="flex flex-col mt-2">
                <div className="flex flex-row mx-auto justify-between px-1 py-1">
                  <div className="flex mr-2">
                    <div className="items-center justify-center w-12 h-12 mx-auto">
                      <img
                        alt="profil"
                        src={user?.author?.account?.avatar?.url}
                        className="object-cover w-12 h-12 mx-auto rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1 pl-1">
                    <div className="text-base font-semibold text-gray-600">
                      {user?.author?.firstName} {user?.author?.lastName}
                      <span className="text-sm font-normal text-gray-500">
                       {handleTime(user?.createdAt)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                    {user?.content}
                   
                    </div>
                    <div className="flex items-center text-sm mt-1 space-x-3">
                      <a
                        href="#"
                        className="flex items-center text-blue-500 hover:text-blue-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="font-semibold">2 Reply</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center text-red-500 hover:text-red-600 group"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 group-hover:text-red-600 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="font-semibold ">11</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center text-blue-500 hover:text-blue-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                        <span className="font-semibold">Share</span>
                      </a>
                    </div>
                    <div className="flex flex-row mx-auto justify-between mt-4">
                      <div className="flex mr-2">
                        <div className="items-center justify-center w-10 h-10 mx-auto">
                          <img
                            alt="profil"
                            src="https://images.unsplash.com/photo-1604238473951-bf1492b379f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHdvbWVuJTIwYXNpYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                            className="object-cover w-10 h-10 mx-auto rounded-full"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-semibold text-gray-600">
                          Amanda J. Rich{" "}
                          <span className="text-sm font-normal text-gray-500">
                            - Feb 11, 2022
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Lorem ipsum dolor sit amet.
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row mx-auto justify-between mt-4">
                      <div className="flex mr-2">
                        <div className="items-center justify-center w-10 h-10 mx-auto">
                          <img
                            alt="profil"
                            src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFuJTIwYmxhY2t8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                            className="object-cover w-10 h-10 mx-auto rounded-full"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-semibold text-gray-600">
                          Jonathan Paul{" "}
                          <span className="text-sm font-normal text-gray-500">
                            - Feb 12, 2022
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Lorem, ipsum dolor.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
              
            ))
          }
            </div>

          <AddComments tokn={tokn} postsId={posts}  getUserComments={getUserComments}/>
        </div>
      </section>
    </>
  );
};

export default CommentBox;
