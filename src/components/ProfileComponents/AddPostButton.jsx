
import React, { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const AddPostButton = () => {
  const [isListOpen, setListOpen] = useState(false);

  const toggleList = () => {
    setListOpen(!isListOpen);
  };

  return (
    <div className="relative inline-block text-left my-3">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-text_color1 border border-transparent rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          onClick={toggleList}
        >
          <RiAddLine className="mr-2" />
          Add Post
        </button>
      </div>

      {isListOpen && (
        <div className="origin-top-right absolute left-20 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              to="/postForm"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Upload Post
            </Link>
            <Link
              to="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Option 2
            </Link>
            <Link
              to="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Option 3
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPostButton;
