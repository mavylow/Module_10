import { cleanup, render, screen } from "@testing-library/react";
import { vi, describe, expect, it, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import Home from ".";
import authReducer from "@/slices/authSlice";
import { useLoaderData } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

vi.mock("@components/Sidebar", () => ({
  default: () => <aside data-testid="sidebar" />,
}));

vi.mock("@components/CreatePost", () => ({
  default: () => <form data-testid="create-post" />,
}));

vi.mock("@components/Post", () => ({
  default: ({ post }: any) => (
    <article data-testid="post">{post.title}</article>
  ),
}));

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useLoaderData: vi.fn(),
    useRevalidator: () => ({
      revalidate: vi.fn(),
    }),
  };
});
const mockUseSelector = vi.fn();
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useSelector: () => mockUseSelector(),
  };
});
let mockUser = {
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

const mockPosts = [
  {
    id: 102,
    authorId: 2,
    title: "Never give up!",
    content:
      "Body text for a post. Since it’s a social app, sometimes it’s a hot take, and sometimes it’s a question.",
    image: "",
    likesCount: 2,
    commentsCount: 0,
    creationDate: "2025-09-01T15:30:00Z",
    modifiedDate: "2025-09-01T15:30:00Z",
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
        id: 4,
        username: "danielj",
        firstName: "Daniel",
        secondName: "Park",
        email: "daniel.park@net.org",
        description: "Photography and travel blogger.",
        profileImage: "/assets/user-daniel.png",
        lastLogin: "2025-09-29T18:00:00Z",
        creationDate: "2022-12-05T08:00:00Z",
        modifiedDate: "2025-09-29T18:00:00Z",
      },
    ],
  },
  {
    id: 103,
    authorId: 3,
    title: "This is what I understood",
    content:
      "A watch is more than just a timekeeping tool. It's a true style statement that highlights your individuality!",
    image: "/assets/post-image-2.png",
    likesCount: 2,
    commentsCount: 0,
    creationDate: "2025-09-01T15:30:00Z",
    modifiedDate: "2025-09-01T15:30:00Z",
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
        id: 5,
        firstName: "Carlo",
        secondName: "Rojas",
        username: "carlorojas",
        email: "carlo.rojas@mail.co",
        description: "Music producer and streamer.",
        profileImage: "/assets/user-carlo.png",
        lastLogin: "2025-10-03T01:00:00Z",
        creationDate: "2024-05-12T16:00:00Z",
        modifiedDate: "2025-10-03T01:00:00Z",
      },
    ],
  },
];

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
    vi.mocked(useLoaderData).mockReturnValue(mockPosts);
    vi.mocked(mockUseSelector).mockReturnValue(null);
    renderComponent();

    const posts = screen.getAllByTestId("post");
    expect(posts).toHaveLength(mockPosts.length);

    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
    expect(screen.queryByTestId("create-post")).not.toBeInTheDocument();

    expect(screen.getByText("This is what I understood")).toBeInTheDocument();
    expect(screen.getByText("Never give up!")).toBeInTheDocument();
  });

  it("homepage with auth", () => {
    vi.mocked(useLoaderData).mockReturnValue(mockPosts);
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    renderComponent();

    const posts = screen.getAllByTestId("post");
    expect(posts).toHaveLength(mockPosts.length);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("create-post")).toBeInTheDocument();

    expect(screen.getByText("This is what I understood")).toBeInTheDocument();
    expect(screen.getByText("Never give up!")).toBeInTheDocument();
  });
});
