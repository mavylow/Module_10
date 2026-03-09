import {
  mockComment,
  mockGroups,
  mockPost,
  mockPosts,
  mockStatComments,
  mockStatLikes,
  mockStatPosts,
  mockUser,
  mockUsers,
} from "@/tests/consts";
import { describe, it, expect, vi } from "vitest";
import {
  addComment,
  addPostsAxios,
  deleteComment,
  dislikePost,
  getGroups,
  getStatisticComments,
  getStatisticLikes,
  getStatisticPosts,
  getSuggested,
  likePost,
  loadPostComments,
  loadPosts,
  loadUser,
  loginUser,
  signUpUser,
  updateUserAxios,
} from "./apiUtil";

vi.mock("axios", async () => {
  const actual = await vi.importActual("axios");
  const mockAxios = vi.fn().mockImplementation(async (config: any) => {
    const response = { status: 200, statusText: "OK" };
    if(config.headers!.Authorization !== `Bearer mock_token`) {
        return Promise.reject()
    }
    if (config.method === "get") {
      if (
        config.url.includes("/api/posts") &&
        config.url.includes("/comments")
      ) {
        return Promise.resolve({ ...response, data: mockComment });
      }
      if (config.url.includes("api/users")) {
        return Promise.resolve({ ...response, data: mockUser });
      }

      if (config.url.includes("/api/groups")) {
        return Promise.resolve({ ...response, data: mockGroups });
      }

      if (config.url.includes("/api/getSuggested")) {
        return Promise.resolve({ ...response, data: mockUsers });
      }

      if (config.url.includes("/api/me/posts")) {
        return Promise.resolve({ ...response, data: mockStatPosts });
      }

      if (config.url.includes("/api/me/comments")) {
        return Promise.resolve({ ...response, data: mockStatComments });
      }
    }
    if (config.method === "post") {
      if (config.url.includes("/api/signup")) {
        return Promise.resolve({ ...response, data: mockUser });
      }
      if (config.url.includes("/api/posts")) {
        return Promise.resolve({ ...response });
      }
      if (config.url.includes("/api/login")) {
        return Promise.resolve({ ...response, data: mockUser });
      }
      if (config.url.includes("api/dislike")) {
        return Promise.resolve({ ...response });
      }
      if (config.url.includes("api/comments")) {
        return Promise.resolve({ ...response });
      }
    }
    if (config.method === "put") {
      if (config.url.includes("/api/profile")) {
        return Promise.resolve({ ...response, data: mockUser });
      }
    }
    if (config.method === "delete") {
      if (config.url.includes("/api/comments/")) {
        return Promise.resolve({ ...response });
      }
    }
  })

  mockAxios.isAxiosError =  vi.fn().mockReturnValue(false),
  mockAxios.post =  vi
  .fn()
  .mockImplementation(async (_url, { query }, _config) => {
    const response = { status: 200, statusText: "OK" };

    if (query.includes("meLikes")) {
      return Promise.resolve({ ...response, data: {data: { meLikes: mockStatLikes}} });
    }
    if (query.includes("likePost")) {
      return Promise.resolve({ ...response });
    }
    if (query.includes("allPosts")) {
      return Promise.resolve({ ...response, data: {data: {allPosts: mockPosts}} });
    }
  })
return {
    ...actual,
    default: mockAxios
}
});

const mockLocalStorage = {
  getItem: vi.fn().mockImplementation((key: string) => {
    if (key === "token") {
      return "mock_token";
    }
  }),
  setItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("apiUtil", () => {
  it("loadPostComments test", async () => {
    expect(await loadPostComments(1)).toStrictEqual(mockComment);
  });
  it("loadUser test", async () => {
    expect(await loadUser(1)).toStrictEqual(mockUser);
  });

  it("getSuggested test", async () => {
    expect(await getSuggested()).toStrictEqual(mockUsers);
  });
  it("getGroups test", async () => {
    expect(await getGroups()).toStrictEqual(mockGroups);
  });
  it("getStatisticPosts test", async () => {
    expect(await getStatisticPosts()).toStrictEqual(mockStatPosts);
  });
  it("getStatisticComments test", async () => {
    expect(await getStatisticComments()).toStrictEqual(mockStatComments);
  });
  it("signUpUser test", async () => {
    expect(
      await signUpUser(
        JSON.stringify({ email: mockUser.email, password: "password789" })
      )
    ).toStrictEqual(mockUser);
  });
  it("addPostsAxios test", async () => {
    expect(
      await addPostsAxios(
        JSON.stringify({ title: mockPost.title, content: mockPost.content })
      )
    );
  });
  it("loginUser test", async () => {
    expect(
      await loginUser(
        JSON.stringify({ email: mockUser.email, password: "password789" })
      )
    ).toStrictEqual(mockUser);
  });

  it("dislikePost test", async () => {
    expect(await dislikePost(1));
  });
  it("updateUserAxios test", async () => {
    expect(
      await updateUserAxios(
        JSON.stringify({
          email: mockUser.email,
          username: mockUser.username,
          description: mockUser.description,
          image: mockUser.profileImage,
        })
      )
    ).toStrictEqual(mockUser);
  });
  it("deleteComment test", async () => {
    expect(await deleteComment(1));
  });
  it("addComment test", async () => {
    expect(await addComment(JSON.stringify(mockComment)));
  });
  it("likePost test", async () => {
    expect(await likePost(1));
  });
  it("getStatisticLikes test", async () => {
    expect(await getStatisticLikes()).toStrictEqual(mockStatLikes);
  });
  it("loadPosts test", async () => {
    expect(await loadPosts()).toStrictEqual(mockPosts);
  });

  it("dislikePost test without auth", async () => {
    mockLocalStorage.getItem.mockImplementation((key: string) => {
        if (key === "token") return null; 
        return null;
      });
      await expect(dislikePost(1)).rejects.toThrow();
  });
});
