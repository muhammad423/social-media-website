import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userLogedOut } from "../../auth/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authclearAccessToken } from "../../redux/AuthSlice";

const LinksData = [
  {
    title: "Home",
    navigateLink: "/",
    isActive: true,
    isProtected: false,
  },
  {
    title: "SignIn",
    navigateLink: "/signin",
    isActive: false,
    isProtected: false,
  },
  {
    title: "SignUp",
    navigateLink: "/signup",
    isActive: false,
    isProtected: false,
  },
  {
    title: "Posts",
    navigateLink: "/posts",
    isActive: false,
    isProtected: true,
  },
  {
    title: "Followers",
    navigateLink: "/followers",
    isActive: false,
    isProtected: true,
  },
  {
    title: "Following",
    navigateLink: "/following",
    isActive: false,
    isProtected: true,
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const tokn = useSelector((state) => state.auth.accessToken);

  const handleLogout = async () => {
    try {
      const data = await userLogedOut(tokn);
      dispatch(authclearAccessToken());
    } catch (error) {
      console.log("sorry", error);
    }
  };

  return (
    <nav className="flex justify-between items-center bg-bg_color text-white py-3 lg:px-20 md:px-10 sm:px-5 px-2">
      <div className="text-3xl font-bold text-text_color1 font-fontDancingScript">
        True Friends
      </div>

      <div className="flex justify-center items-center gap-5">
        {LinksData.map(
          (linkItem, idx) =>
            (tokn || !linkItem.isProtected) && (
              <Link
                to={linkItem.navigateLink}
                key={idx}
                className={`${
                  linkItem.isActive
                    ? " bg-text_color3 px-4 py-2 duration-300 rounded-lg"
                    : " hover:bg-text_color2 px-4 py-2 duration-300 rounded-lg"
                }`}
              >
                <span className=" font-fontNunito font-medium text-md">
                  {linkItem.title}
                </span>
              </Link>
            )
        )}
      </div>
      <div>
        {tokn ? (
          <button
            onClick={handleLogout}
            className="font-fontNunito font-medium text-md  hover:bg-text_color1 px-6 py-2 duration-300 rounded-lg"
          >
            Logout
          </button>
        ) : (
          <Link to="/signin">
            <button className="font-fontNunito font-medium text-md hover:bg-text_color1 px-4 py-1 duration-300">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
