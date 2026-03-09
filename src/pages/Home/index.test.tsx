import { cleanup, render, screen } from "@testing-library/react";
import { vi, describe, expect, it, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import Home from ".";
import authReducer from "@/slices/authSlice";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { mockPosts, mockUser } from "@/tests/consts";

vi.mock("@components/Sidebar", () => ({
  default: () => <aside data-testid="sidebar" />,
}));

vi.mock("@components/CreatePost", () => ({
  default: () => <form data-testid="create-post" />,
}));

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
      <Home />
    </Provider>
  );
};

describe("Home", () => {
  afterEach(() => {
    cleanup();
  });

  it("homepage without auth", () => {
    vi.mocked(useSelector).mockReturnValue(null);
    renderComponent();

    const posts = screen.getAllByTestId("post");
    expect(posts).toHaveLength(3);

    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
    expect(screen.queryByTestId("create-post")).not.toBeInTheDocument();

    const postsHeaders = screen.getAllByText("I love this flowers");
    expect(postsHeaders).toHaveLength(mockPosts.length);
    const postsContent = screen.getAllByText(
      "Really nice flowers in San Francisco!"
    );
    expect(postsContent).toHaveLength(mockPosts.length);
  });

  it("homepage with auth", () => {
    vi.mocked(useSelector).mockReturnValue(mockUser);
    renderComponent();

    const posts = screen.getAllByTestId("post");
    expect(posts).toHaveLength(mockPosts.length);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("create-post")).toBeInTheDocument();

    const postsHeaders = screen.getAllByText("I love this flowers");
    expect(postsHeaders).toHaveLength(mockPosts.length);
    const postsContent = screen.getAllByText(
      "Really nice flowers in San Francisco!"
    );
    expect(postsContent).toHaveLength(mockPosts.length);
  });
});
