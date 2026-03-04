import axios, { type AxiosRequestConfig } from "axios";

export type apiMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function fetchRESTData(
  api: string,
  method: apiMethod,
  body?: string
) {
  const token = localStorage.getItem("token");

  const config: AxiosRequestConfig = {
    method: method.toLowerCase(),
    url: api,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  };

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  if (body && method !== "GET") {
    config.data = body;
  }

  try {
    const response = await axios(config);

    if (response.status === 204) {
      return null;
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Data fetching error");
    }
    throw error;
  }
}

export async function fetchGraphQLData(body?: string) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: body,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (response.status === 204) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export const loadPosts = async () => {
  const query = `
    query allPosts {
      allPosts {
        id, 
        authorId, 
        title, 
        content, 
        image, 
        creationDate,
        likedByUsers {
          id,
          email
        }
      }
    }
  `;
  try {
    const { data } = await axios.post("/api/graphql", { query });
    return data.data.allPosts;
  } catch (e) {
    console.error(e);
  }
};

export const addPostsAxios = async (newPost: string) => {
  await fetchRESTData("/api/posts", "POST", newPost);
};

export const loadUser = async (userId: number) => {
  const user = await fetchRESTData(`api/users/${userId}`, "GET");
  return user;
};

export const loginUser = async (loginForm: string) => {
  const user = await fetchRESTData("/api/login", "POST", loginForm);
  return user;
};

export const restoreUser = async () => {
  const query = `
    query me {
      me {
        id,
        username,
        email,
        firstName,
        profileImage,
        description,
        secondName
      }
    }
  `;
  const operationName = "me";
  const body = {
    query,
    operationName,
  };
  const data = await fetchGraphQLData(JSON.stringify(body));
  return data.data[operationName];
};

export const signUpUser = async (singUpForm: string) => {
  const user = await fetchRESTData("/api/signup", "POST", singUpForm);
  return user;
};

export const updateUserAxios = async (updatedUser: string) => {
  const user = await fetchRESTData("/api/profile", "PUT", updatedUser);
  return user;
};

export const loadPostComments = async (postId: number) => {
  const comments = await fetchRESTData(`/api/posts/${postId}/comments`, "GET");
  return comments;
};

export const deleteComment = async (commentId: number) => {
  await fetchRESTData(`/api/comments/${commentId}`, "DELETE");
};

export const addComment = async (commentData: string) => {
  await fetchRESTData("api/comments", "POST", commentData);
};

export const likePost = async (postId: number) => {
  const token = localStorage.getItem("token");

  const query = `
   mutation likePost($postId: Int!) {
    likePost(postId: $postId) {
      id
      likedByUsers {
        id
      }
    }
   }
  `;

  try {
    const response = await axios.post(
      "/api/graphql",
      {
        query,
        variables: { postId },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};

export const dislikePost = async (postId: number) => {
  await fetchRESTData("api/dislike", "POST", JSON.stringify({ postId }));
};

export const getSuggested = async () => {
  const suggested = await fetchRESTData("/api/getSuggested", "GET");
  return suggested;
};

export const getGroups = async () => {
  const groups = await fetchRESTData("/api/groups", "GET");
  return groups;
};

export const getStatisticLikes = async () => {
  const query = `
    query meLikes {
      meLikes {
        id,
        creationDate
      }
    }
  `;
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios.post(
      `/api/graphql`,
      { query },
      { headers: { Authorization: token ? `Bearer ${token}` : "" } }
    );
    return data.data.meLikes;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Data fetching error");
    }
    throw error;
  }
};

export const getStatisticPosts = async () => {
  const posts = await fetchRESTData(`/api/me/posts`, "GET");
  return posts;
};

export const getStatisticComments = async () => {
  const comments = fetchRESTData(`/api/me/comments`, "GET");
  return comments;
};
