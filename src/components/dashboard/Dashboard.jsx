import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authclearAccessToken } from "../../redux/AuthSlice";
import { userLikeOrUnLikePost, userLogedOut } from "../../auth/auth";
import axios from "axios";
import SearchUserProfile from "../ProfileComponents/SearchUserProfile";
import UserPostsPage from "../postComponents/UserPostsPage";
import AddPostButton from "../ProfileComponents/AddPostButton";
import AllPosts from "../postComponents/AllPosts";
import CommentBoxModel from "../modelsComponents/CommentBoxModel";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const userNavigation = [
  { name: "Your profile", href: `/userProfile/` },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard({curUser}) {
  const [isOpenCBox, setIsOpenCBox] = useState(false);
  const [LikedPost, setLikedPost] = useState(null);
  const [isLikedPost, setIsLikedPost] = useState(LikedPost);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userProfileDataId = useSelector((state) => state.auth.userInformation);
  const dispatch = useDispatch();
  const tokn = useSelector((state) => state.auth.accessToken);
  const [allPosts, setAllPosts] = useState(null);
  console.log("all posts", allPosts);

  const handleLogout = async () => {
    try {
      const data = await userLogedOut(tokn);
      dispatch(authclearAccessToken());
    } catch (error) {
      console.log("sorry", error);
    }
  };

  useEffect(() => {
   
    getAllPosts();
  }, [LikedPost]);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/social-media/posts?page=1&limit=40`,
        {
          headers: {
            Authorization: `Bearer ${tokn}`,
          },
        }
      );

      if (response.data?.data) {
        setAllPosts(response.data?.data?.posts);
      }
      console.log(response?.data, "alll allla posts");
    } catch (error) {
      console.log("username erroe", error);
    }
  };

  const handleLike = async (postId, tokn) => {
    try {
      const response = await userLikeOrUnLikePost(postId, tokn);
      if (response?.statusCode == 200) {
        setLikedPost(response?.data?.isLiked);
        if(LikedPost){
          setIsLikedPost((prev) => !prev)
        }
        console.log("post like un like data", response);
      }
    } catch (error) {
      console.log("like unlike post error", error);
    }
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="-mx-2 flex-1 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:text-white hover:bg-gray-800",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                            >
                              <item.icon
                                className="h-6 w-6 shrink-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
          <div className="flex h-16 shrink-0 items-center justify-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          <nav className="mt-8">
            <ul role="list" className="flex flex-col items-center space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="lg:pl-20">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="text-3xl hidden md:block font-bold text-text_color1 font-fontDancingScript">
              True Friends
            </div>
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>

                <div className="block xl:hidden">
                  <SearchUserProfile />
                </div>
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    {tokn ? (
                      <>
                        <img
                          className="h-8 w-8 rounded-full bg-gray-50"
                          src={userProfileDataId?.avatar?.url}
                          alt=""
                        />
                        <span className="hidden lg:flex lg:items-center">
                          <span
                            className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                            aria-hidden="true"
                          >
                            {userProfileDataId?.username}
                          </span>
                          <ChevronDownIcon
                            className="ml-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </>
                    ) : (
                      <Link to="/signin">
                        <button className="block px-3 py-1 text-sm leading-6 text-gray-900">
                          Login
                        </button>
                      </Link>
                    )}
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {tokn && (
                        <Menu.Item>
                          <Link
                            to={`/userProfile/${userProfileDataId._id}`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            User Profile
                          </Link>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {tokn ? (
                          <button
                            onClick={handleLogout}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Logout
                          </button>
                        ) : (
                          <Link to="/signin">
                            <button className="block px-3 py-1 text-sm leading-6 text-gray-900">
                              Login
                            </button>
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="xl:pl-96 md:pr-80">
            <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
              <AddPostButton />
              <AllPosts
                allPosts={allPosts}
                tokn={tokn}
                handleLike={handleLike}
                LikedPost={LikedPost}
                setLikedPost={setLikedPost}
                isLikedPost={isLikedPost}
                setIsLikedPost={setIsLikedPost}
                isOpenCBox={isOpenCBox}
                setIsOpenCBox={setIsOpenCBox}
                getAllPosts={getAllPosts}
                curUser={curUser}
              />
            </div>
          </main>
        </div>

        <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
          <SearchUserProfile />
        </aside>
        <aside className="fixed bottom-0 right-0 top-16 hidden w-80  overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 md:block">
          right
        </aside>
      </div>
    </>
  );
}
