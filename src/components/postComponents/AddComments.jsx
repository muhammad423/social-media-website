import React from "react";
import { useForm } from "react-hook-form";
import { userCommentsPost } from "../../auth/auth";

const AddComments = ({tokn, postsId, getUserComments}) => {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async(data) => {
   try {
    const response = await userCommentsPost(postsId, data, tokn)
    if(response.statusCode == 201){
        reset()
        getUserComments()
    }
    console.log('comment data', response?.data)
   } catch (error) {
     console.log('comment error', error)
   }
  }
  return (
    <form action="#" className="mt-4 z-20">
      <label for="comment" className="block">
        <textarea
          {...register('content')}
          cols="30"
          rows="3"
          placeholder="Type your comment..."
          className="px-3 py-2 border shadow-sm border-gray-300 rounded-md w-full block placeholder:text-gray-400 placeholder-gray-500
           focus:outline-none focus:ring-1 bg-gray-50 focus:ring-blue-600 focus:border-blue-600 text-sm"
        />
      </label>
      <button
        type="submit"
        className="mt-2  inline-flex items-center justify-center text-gray-100 font-medium leading-none
           bg-blue-600 rounded-md py-2 px-3 border border-transparent transform-gpu hover:-translate-y-0.5 
           transition-all ease-in duration-300 hover:text-gray-200 hover:bg-blue-700 text-sm"
           onClick={handleSubmit(onSubmit)}
      >
        Post comment
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-2 rotate-90"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </form>
  );
};

export default AddComments;
