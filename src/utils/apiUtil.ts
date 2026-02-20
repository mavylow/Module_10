import axios, { type AxiosRequestConfig } from "axios";

export type apiMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function fetchData(api: string, method: apiMethod, body?: string) {
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

export const loadPosts = async () => {
  const posts = await fetchData("/api/posts", "GET");
  return posts;
};

export const addPostsAxios = async (newPost: string) => {
  await fetchData("/api/posts", "POST", newPost);
};

export const loadUser = async (userId: number) => {
  const user = await fetchData(`api/users/${userId}`, "GET");
  return user;
};
export const loginUser = async (loginForm: string) => {
  const user = await fetchData("/api/login", "POST", loginForm);
  return user;
};

export const restoreUser = async () => {
  const user = await fetchData("/api/me", "GET");
  return user;
};

export const signUpUser = async (singUpForm: string) => {
  const user = await fetchData("/api/signup", "POST", singUpForm);
  return user;
};

export const updateUserAxios = async (updatedUser: string) => {
  const user = await fetchData("/api/profile", "PUT", updatedUser);
  return user;
};

export const loadPostComments = async (postId: number) => {
  const comments = await fetchData(`/api/posts/${postId}/comments`, "GET");
  return comments;
};

export const deleteComment = async (commentId: number) => {
  await fetchData(`/api/comments/${commentId}`, "DELETE");
};

export const addComment = async (commentData: string) => {
  await fetchData("api/comments", "POST", commentData);
};

export const likePost = async (postId: number) => {
  await fetchData("api/like", "POST", JSON.stringify({ postId }));
};

export const dislikePost = async (postId: number) => {
  await fetchData("api/dislike", "POST", JSON.stringify({ postId }));
};

export const getSuggested = async () => {
  const suggested = await fetchData("/api/getSuggested", "GET");
  return suggested;
};

export const getGroups = async () => {
  const groups = await fetchData("/api/groups", "GET");
  return groups;
};

export const getStatisticLikes = async () => {
  const likes = await fetchData(`/api/me/likes`, "GET");
  return likes;
};

export const getStatisticPosts = async () => {
  const posts = await fetchData(`/api/me/posts`, "GET");
  return posts;
};

export const getStatisticComments = async () => {
  const comments = fetchData(`/api/me/comments`, "GET");
  return comments;
};
