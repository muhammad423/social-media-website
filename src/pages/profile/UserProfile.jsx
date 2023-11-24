import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userProfile } from "../../auth/auth";
import { getUserProfileData } from "../../redux/AuthSlice";
import { Link, useParams } from "react-router-dom";
import FullProfileImageModel from "../../components/ProfileComponents/FullProfileImageModel";
import { UserPostsPage, UserProfileData } from "../../components";

const UserProfile = () => {
  const _id = useParams();
  console.log(_id, "_id");
  const dispatch = useDispatch();
  const [userProfileData, setUserProfileData] = useState(null);
  console.log(userProfileData, "abcdefdg");
  console.log(userProfileData);
  const [loadingUserProfile, setLoadingUserProfile] = useState(true);
  const [isFollowing, setISFollowing] = useState(false);
  const [open, setOpen] = useState(false);

  console.log(isFollowing, "isfolowing");
  const tokn = useSelector((state) => state.auth.accessToken);
  
  const serachProfileData = useSelector(
    (state) => state.auth.searchUserProfileData
  );

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        setLoadingUserProfile(true);
        const data = await userProfile(tokn);
        dispatch(getUserProfileData(data));
        setUserProfileData(data);
      } catch (error) {
        console.log("sorry", error);
      } finally {
        setLoadingUserProfile(false);
      }
    };

    fetchUserProfileData();
  }, []);

  return (
    <>
      {serachProfileData && serachProfileData?.data?.owner ? (
        <div>
          <UserProfileData
            serachProfileData={serachProfileData}
            isFollowing={isFollowing}
          />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="px-3 py-2">
            <div className="flex flex-col gap-1 text-center">
              <img
                src={userProfileData?.data?.account?.avatar?.url}
                className="block mx-auto bg-center bg-no-repeat bg-cover w-20 h-20 rounded-full border border-gray-400 shadow-lg"
                onClick={() => setOpen(true)}
              />
              <p className=" font-medium font-fontNunito text-lg text-white capitalize">
                {userProfileData?.data?.firstName}{" "}
                {userProfileData?.data?.lastName}
              </p>
              <span className="text-sm font-fontNunito text-white capitalize">
                {userProfileData?.data?.bio}
              </span>
              <span className="text-sm font-fontNunito text-white capitalize">
                {userProfileData?.data?.location}
              </span>
              <span className="text-sm font-fontNunito text-white capitalize">
                {userProfileData?.data?.dob}
              </span>
            </div>

            <div className="flex justify-center items-center gap-2 my-3">
              <div className="text-center mx-4">
                <p className="text-black">0</p>
                <span className="font-fontNunito text-white capitalize">
                  Posts
                </span>
              </div>
              <div className="text-center mx-4">
                <p className="text-black">
                  {userProfileData?.data?.followersCount}
                </p>
                <span className="font-fontNunito text-white capitalize">
                  Followers
                </span>
              </div>
              <div className="text-center mx-4">
                <p className="text-black">
                  {userProfileData?.data?.followersCount}
                </p>
                <span className="font-fontNunito text-white capitalize">
                  Folowing
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-2 my-5">
              {tokn && userProfileData?.data?.owner ? (
                <>
                  <Link to="/updateProfileData">
                    <button className="bg-pink-500 px-10 py-2 rounded-full text-white shadow-lg">
                      Edit Profile
                    </button>
                  </Link>
                  <button className="bg-white border border-gray-500 px-10 py-2 rounded-full shadow-lg">
                    More
                  </button>
                </>
              ) : (
                <>
                  <button className="bg-pink-500 px-10 py-2 rounded-full text-white shadow-lg">
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                  <button className="bg-white border border-gray-500 px-10 py-2 rounded-full shadow-lg">
                    Message
                  </button>
                </>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button className="w-full py-2 border-b-2 border-yellow-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button className="w-full py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 my-3">
              <UserPostsPage />
              <UserPostsPage />
              <UserPostsPage />

            </div>
          </div>

          <div className="flex justify-between items-center bg-yellow-600 bg-opacity-20 px-10 py-5 rounded-full text-gray-500">
            <button className="p-2 rounded-full bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-pink-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full bg-pink-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-white h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
          <FullProfileImageModel open={open} setOpen={setOpen} />
        </div>
      )}
    </>
  );
};

export default UserProfile;
