import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import {
  SignUp,
  SignIn,
  Home,
  Followers,
  Following,
  Posts,
  UserProfile,
  UpdateProfiledata,
  SocialMediaPostForm,
  UserPost,
  UpdatePost,
} from "./pages";
import ProtectedRouters from "./components/protectedRouter/ProtectedRouters";
import { currentUser, userProfile } from "./auth/auth";
import { useSelector } from "react-redux";
import "./App.css";
import PagesWrapper from "./components/wrapper/PagesWrapper";

function App() {
  const [curUser, setCurUser] = useState(null);
  console.log(curUser, 'abc')
  const tokn = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await currentUser("/current-user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokn}`,
          },
        });
        setCurUser(data);
      } catch (error) {
        console.log("sorry", error);
      }
    };

    fetchData();
  }, [tokn]);

  return (
    <div>
      {/* <Header /> */}

      <PagesWrapper>

        <Routes>
        <Route
            path="/"
            element={
              <ProtectedRouters curUser={curUser} tokn={tokn}>
                <Home  curUser={curUser}/>
              </ProtectedRouters>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/followers"
            element={
              <ProtectedRouters curUser={curUser} tokn={tokn}>
                <Followers />
              </ProtectedRouters>
            }
          />
          <Route
            path="/following"
            element={
              <ProtectedRouters curUser={curUser} tokn={tokn}>
                <Following />
              </ProtectedRouters>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRouters curUser={curUser} tokn={tokn}>
                <Posts />
              </ProtectedRouters>
            }
          />
          <Route
            path="/userProfile/:_id"
            element={
              <ProtectedRouters curUser={curUser} tokn={tokn}>
                <UserProfile />
              </ProtectedRouters>
            }
          />
          <Route
            path="/updateProfileData"
            element={
              <ProtectedRouters curUser={curUser} tokn={tokn}>
                <UpdateProfiledata />
              </ProtectedRouters>
            }
          />
          <Route
            path="/postForm"
            element={
              <ProtectedRouters curUser={curUser} tokn={tokn}>
                <SocialMediaPostForm />
              </ProtectedRouters>
            }
          />

          <Route
            path="/userPosts"
            element={
              <ProtectedRouters curUser={curUser} tokn={tokn}>
                <UserPost/>
              </ProtectedRouters>
            }
          />
           <Route
            path="/updatePost/:postId"
            element={
              <ProtectedRouters curUser={curUser} tokn={tokn}>
                <UpdatePost/>
              </ProtectedRouters>
            }
          />
        </Routes>
      </PagesWrapper>
    </div>
  );
}

export default App;
