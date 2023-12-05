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


export const userLikeOrUnLikePost = async (postId, tokn) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/social-media/like/post/${postId}`, null,
      {
        headers: {
          Authorization: `Bearer ${tokn}`,
        },
      }
    )
    return response?.data
  } catch (error) {
    console.log('likeOrUnlike data error', error);
  }
}


export const userCommentsPost = async (postId,data, tokn) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/social-media/comments/post/${postId}`, data,
      {
        headers: {
          Authorization: `Bearer ${tokn}`,
        },
      }
    )
    return response?.data
  } catch (error) {
    console.log('commenys error', error);
  }
}



export const getUserCommentsPost = async (postId, tokn) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/social-media/comments/post/${postId}?page=1&limit=200`,
      {
        headers: {
          Authorization: `Bearer ${tokn}`,
        },
      }
    )
    return response?.data
  } catch (error) {
    console.log('get comments error', error);
  }
}








// http://localhost:8080/api/v1/social-media/comments/post/649957f74662581ee44781ee?page=1&limit=200


