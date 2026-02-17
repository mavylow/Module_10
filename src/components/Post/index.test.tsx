import { cleanup, render, screen } from "@testing-library/react";
import { vi, describe, expect, it, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import Post from "@components/Post";
import userEvent from "@testing-library/user-event";
import type { IUser } from "@/interfaces";
import { AuthContext } from "@providers/AuthProvider";
import type { apiMethod } from "@/utils/apiUtil";

vi.mock("@assets/HeartDislikeIcon", () => ({
  default: () => <svg data-testid="heart-dislike-icon" />,
}));

vi.mock("@assets/HeartLikeIcon", () => ({
  default: () => <svg data-testid="heart-like-icon" />,
}));

vi.mock("@assets/CommentIcon", () => ({
  default: () => <svg data-testid="comment-icon" />,
}));

vi.mock("@assets/EditPenIcon", () => ({
  default: () => <svg data-testid="edit-pen-icon" />,
}));

vi.mock("@assets/ChevronIcon", () => ({
  default: () => <svg data-testid="chevron-icon" />,
}));

vi.mock("@assets/ChevronIconExpanded", () => ({
  default: () => <svg data-testid="chevron-icon-expanded" />,
}));

const mockPost = {
  id: 101,
  authorId: 1,
  title: "I love this flowers",
  content: "Really nice flowers in San Francisco!",
  image: "/assets/post-image-1.png",
  likesCount: 2,
  commentsCount: 2,
  creationDate: "2025-08-20T10:00:00Z",
  modifiedDate: "2025-08-20T10:00:00Z",
  authorPhoto: "/assets/user-helena.png",
  likedByUsers: [
    {
      id: 1,
      username: "helenahills",
      firstName: "Helena",
      secondName: "Hills",
      email: "helena.hills@social.com",
      description: "Travel and design enthusiast.",
      profileImage: "/assets/user-helena.png",
      lastLogin: "2025-10-02T12:00:00Z",
      creationDate: "2023-11-01T09:00:00Z",
      modifiedDate: "2025-10-02T12:00:00Z",
    },
    {
      id: 2,
      username: "charles",
      firstName: "Charles",
      secondName: "Davis",
      email: "charles@mail.com",
      description: "Just a good dog.",
      profileImage: "/assets/user-charles.png",
      lastLogin: "2025-10-01T15:00:00Z",
      creationDate: "2023-05-20T11:00:00Z",
      modifiedDate: "2025-10-01T15:00:00Z",
    },
  ],
};

const mockUser = {
  id: 1,
  username: "helenahills",
  firstName: "Helena",
  secondName: "Hills",
  email: "helena.hills@social.com",
  description: "Travel and design enthusiast.",
  profileImage: "/assets/user-helena.png",
  lastLogin: "2025-10-02T12:00:00Z",
  creationDate: "2023-11-01T09:00:00Z",
  modifiedDate: "2025-10-02T12:00:00Z",
};

const mockComment = {
  id: 5,
  postId: 101,
  authorId: 1,
  text: "Adding detail here.",
  creationDate: "2025-09-04T18:00:00Z",
  modifiedDate: "2025-09-04T18:00:00Z",
};

let comments = [mockComment];

vi.mock("@utils/apiUtil", () => ({
  fetchData: vi.fn((url: string, method: apiMethod, body?: any) => {
    if (url.includes("/comments") && method === "GET") {
      return Promise.resolve(comments);
    }

    if (url.includes("/comments") && method === "POST") {
      const newComment = {
        id: 6,
        postId: 101,
        authorId: 1,
        text: body.text,
        creationDate: "2025-09-04T18:10:00Z",
        modifiedDate: "2025-09-04T18:10:00Z",
      };

      comments = [...comments, newComment];
      return Promise.resolve(newComment);
    }

    if (url.includes("/users/")) {
      return Promise.resolve(mockUser);
    }

    if (url.includes("/like") || url.includes("/dislike")) {
      return Promise.resolve({ success: true });
    }

    return Promise.resolve(null);
  }),
}));

const onLike = vi.fn();

const mockAuthContext = {
  signIn: vi.fn(),
  signUp: vi.fn(),
  updateUser: vi.fn(),
  logOut: vi.fn(),
};

const renderWithProvider = (user: IUser | null) => {
  render(
    <AuthContext.Provider value={{ user, ...mockAuthContext }}>
      <Post post={mockPost} onLike={onLike} />
    </AuthContext.Provider>
  );
};

describe("Post", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  it("ui of a post with auth", async () => {
    renderWithProvider(mockUser);
    expect(await screen.findByText("Helena")).toBeInTheDocument();
    expect(
      await screen.findByAltText("Profile picture of helenahills")
    ).toBeInTheDocument();
    expect(screen.getByText("I love this flowers")).toBeInTheDocument();
    expect(
      screen.getByText("Really nice flowers in San Francisco!")
    ).toBeInTheDocument();
    expect(screen.getByText("2 likes")).toBeInTheDocument();
    expect(await screen.findByText("1 comments")).toBeInTheDocument();
    expect(await screen.findByTestId("chevron-icon")).toBeInTheDocument();
  });

  it("ui of a post with auth", async () => {
    renderWithProvider(null);
    expect(await screen.findByText("Helena")).toBeInTheDocument();
    expect(
      await screen.findByAltText("Profile picture of helenahills")
    ).toBeInTheDocument();
    expect(screen.getByText("I love this flowers")).toBeInTheDocument();
    expect(
      screen.getByText("Really nice flowers in San Francisco!")
    ).toBeInTheDocument();
    expect(screen.getByText("2 likes"));
    expect(screen.getByText("You have to login to see the comments"));
    expect(screen.queryByTestId("chevron-icon")).not.toBeInTheDocument();
  });

  it("expand comment section", async () => {
    renderWithProvider(mockUser);

    const expandButton = screen
      .queryByTestId("chevron-icon")
      ?.closest("button");

    expect(expandButton).toBeInTheDocument();

    await userEvent.click(expandButton!);

    expect(screen.getByTestId("chevron-icon-expanded")).toBeInTheDocument();
    expect(screen.queryByTestId("chevron-icon")).not.toBeInTheDocument();
    expect(screen.getByText("Adding detail here."));
  });

  it("like and dislike post", async () => {
    renderWithProvider(mockUser);

    const likeSvg = screen.queryByTestId("heart-like-icon");

    const likeButton = likeSvg?.closest("button");

    expect(likeButton).toBeInTheDocument();

    await userEvent.click(likeButton!);

    expect(screen.queryByTestId("heart-dislike-icon"));
    expect(onLike).toBeCalledTimes(1);
    await userEvent.click(likeButton!);
    expect(screen.queryByTestId("heart-like-icon"));
    expect(onLike).toBeCalledTimes(2);
  });

  it("add not empty comment", async () => {
    const user = userEvent.setup();

    renderWithProvider(mockUser);

    const expandButton = screen
      .queryByTestId("chevron-icon")
      ?.closest("button");

    await user.click(expandButton!);

    const commentInput = screen.getByTestId("input");
    const addComment = screen.getByRole("button", { name: "Add a comment" });

    await user.type(commentInput, "New comment");
    expect(commentInput).toHaveValue("New comment");
    await user.click(addComment);

    expect(await screen.findByText("New comment")).toBeInTheDocument();
  });
});
