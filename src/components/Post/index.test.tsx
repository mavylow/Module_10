import { cleanup, render, screen } from "@testing-library/react";
import { vi, describe, expect, it, afterEach, type Mock } from "vitest";
import "@testing-library/jest-dom/vitest";
import Post from "@components/Post";
import userEvent from "@testing-library/user-event";
import authReducer from "@/slices/authSlice";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useQuery } from "@tanstack/react-query";

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

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn().mockImplementation(({ onSuccess }) => {
    return {
      mutate: () => {
        onSuccess?.();
      },
    };
  }),

  useQuery: vi.fn(),
  useQueryClient: vi.fn().mockReturnValue({
    invalidateQueries: vi.fn(),
  }),
}));

const onLike = vi.fn();

const mockUseSelector = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useSelector: () => mockUseSelector(),
  };
});

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        isAuth: false,
        isLoading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

const renderComponent = (store = createTestStore()) => {
  return render(
    <Provider store={store}>
      <Post post={mockPost} onLike={onLike} />
    </Provider>
  );
};

describe("Post", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  function setupQueries({ withComments = true } = {}) {
    (useQuery as Mock).mockImplementation(({ queryKey }) => {
      if (queryKey[0] === "users") {
        return {
          data: mockUser,
          isLoading: false,
        };
      }

      if (queryKey[0] === "posts") {
        return {
          data: withComments ? comments : [],
          isLoading: false,
          refetch: vi.fn(),
        };
      }

      return {
        data: undefined,
        isLoading: false,
      };
    });
  }

  it("ui of a post with auth", async () => {
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    setupQueries();
    renderComponent();
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

  it("ui of a post without auth", async () => {
    vi.mocked(mockUseSelector).mockReturnValue(null);
    setupQueries();
    renderComponent();
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
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    setupQueries();
    renderComponent();

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
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    setupQueries();
    renderComponent();

    const likeButton = screen.getByTestId("heart-like-icon").closest("button");

    await userEvent.click(likeButton!);

    expect(onLike).toBeCalledTimes(1);
  });

  it("add not empty comment", async () => {
    const user = userEvent.setup();

    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    setupQueries();

    renderComponent();

    const expandButton = screen.getByTestId("chevron-icon").closest("button");

    await user.click(expandButton!);

    const commentInput = screen.getByTestId("input");
    const addComment = screen.getByRole("button", { name: "Add a comment" });

    await user.type(commentInput, "New comment");
    await user.click(addComment);

    expect(commentInput).toHaveValue("");
  });
});
