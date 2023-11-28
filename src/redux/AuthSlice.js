import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem("accessToken") || null;
};
const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem("refreshToken") || null;
};
const getUserPostsFromLocalStorage = () => {
  const userPosts = localStorage.getItem("userPosts");
  return userPosts ? JSON.parse(userPosts) : [];
};

const initialState = {
  accessToken: getAccessTokenFromLocalStorage(),
  userInformation: JSON.parse(localStorage.getItem("userInformation")) || null,
  userProfileData: JSON.parse(localStorage.getItem('userProfileData')) || [],
  refreshToken: getRefreshTokenFromLocalStorage(),
  searchUserProfileData: JSON.parse(localStorage.getItem('userSearchData')) || null,
  userPosts: getUserPostsFromLocalStorage()
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    authRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload);
    },
    authUserInformation: (state, action) => {
      state.userInformation = action.payload;
      localStorage.setItem("userInformation", JSON.stringify(action.payload));
    },
    authclearAccessToken: (state) => {
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      state.userInformation = null;
      localStorage.removeItem("userInformation");
    },
    getUserProfileData: (state, action) => {
      state.userProfileData = action.payload;
      localStorage.setItem("userProfileData", JSON.stringify(action.payload));
    },
    getSearchUserProfileData: (state, action) => {
      state.searchUserProfileData = action.payload;
      localStorage.setItem("userSearchData", JSON.stringify(action.payload));
    },
    getUserPosts: (state, action) => {
      state.userPosts =[...state.userPosts ,action.payload]
      localStorage.setItem("userPosts", JSON.stringify(state.userPosts));
    },
  },
});

export const {
  authAccessToken,
  authclearAccessToken,
  authUserInformation,
  getUserProfileData,
  authRefreshToken,
  getSearchUserProfileData,
  getUserPosts
} = authSlice.actions;

export default authSlice.reducer;
