import { cleanup, render, screen } from "@testing-library/react";
import { vi, describe, expect, it, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import Post from "@components/Post";
import { mockPost, mockUser } from "@/tests/consts";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/slices/authSlice";
import userEvent from "@testing-library/user-event";

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

describe("test", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("ui of a post with auth", async () => {
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);

    renderComponent();

    expect(await screen.findByText("Helena")).toBeInTheDocument();

    expect(
      await screen.findByAltText("Profile picture of helenahills")
    ).toBeInTheDocument();

    expect(screen.getByText("I love this flowers")).toBeInTheDocument();

    expect(
      screen.getByText("Really nice flowers in San Francisco!")
    ).toBeInTheDocument();

    expect(screen.getByText("like")).toBeInTheDocument();

    expect(await screen.findByText("comment")).toBeInTheDocument();

    expect(await screen.findByTestId("chevron-icon")).toBeInTheDocument();
  });

  it("ui of a post without auth", async () => {
    vi.mocked(mockUseSelector).mockReturnValue(null);
    renderComponent();
    expect(await screen.findByText("Helena")).toBeInTheDocument();
    expect(
      await screen.findByAltText("Profile picture of helenahills")
    ).toBeInTheDocument();
    expect(screen.getByText("I love this flowers")).toBeInTheDocument();
    expect(
      screen.getByText("Really nice flowers in San Francisco!")
    ).toBeInTheDocument();
    expect(screen.getByText("like")).toBeInTheDocument();
    expect(await screen.findByText("hiddenComments")).toBeInTheDocument();
  });

  it("expand comment section", async () => {
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
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

    renderComponent();

    const likeButton = screen.getByTestId("heart-like-icon").closest("button");

    await userEvent.click(likeButton!);

    expect(onLike).toBeCalledTimes(1);
  });

  it("add not empty comment", async () => {
    const user = userEvent.setup();

    vi.mocked(mockUseSelector).mockReturnValue(mockUser);

    renderComponent();

    const expandButton = screen.getByTestId("chevron-icon").closest("button");

    await user.click(expandButton!);

    const commentInput = screen.getByTestId("input");
    const addComment = screen.getByRole("button", { name: "addAComment" });

    await user.type(commentInput, "New comment");
    await user.click(addComment);

    expect(commentInput).toHaveValue("");
  });
});
