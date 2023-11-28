import axios from "axios";

// const signUpUrl = 'http://localhost:8080/api/v1/users/register'

export const userRegister = async (user, data) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/users${user}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error, "error");
  }
};

export const userLogin = async (user, data) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/users${user}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error, "error");
  }
};



export const currentUser = async (curUser, authTkn) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/users${curUser}`,
      authTkn
    );
    console.log("data", response.data);
    return response.data;
  } catch (error) {
    console.log(error, "error");
  }
};

export const userLogedOut = async (token) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/users/logout`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("data", response.data);
    return response.data;
  } catch (error) {
    console.log(error, "error");
  }
};

export const userProfile = async (token) => {
  try {
    console.log("token", token)
    const response = await axios.get(
      `http://localhost:8080/api/v1/social-media/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error, "error");
  }
};


export const userProfileByName = async (query, token) => {
  try {
    console.log("token", token)
    const response = await axios.get(
      `http://localhost:8080/api/v1/social-media/profile/u/${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.log(error, "error");
  }
};
