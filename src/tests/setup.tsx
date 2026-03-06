import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import {
  mockComment,
  mockGroups,
  mockPosts,
  mockStatComments,
  mockStatLikes,
  mockStatPosts,
  mockUser,
  mockUsers,
} from "./consts";

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual<any>("@tanstack/react-query");

  return {
    ...actual,
    useMutation: vi.fn().mockImplementation(({ onSuccess }) => ({
      mutate: () => onSuccess?.(),
    })),
    useSuspenseQuery: vi.fn().mockImplementation(({ queryKey }) => {
      if (queryKey.find((el: any) => el === "users")) {
        return { data: mockUser };
      }
      if (queryKey.find((el: any) => el === "post")) {
        return {
          data: mockPosts,
          refetch: vi.fn(),
          isLoading: false,
        };
      }
    }),
    useQuery: vi.fn().mockImplementation(({ queryKey }) => {
      if (
        queryKey.find((el: any) => el === "comments") &&
        queryKey.find((el: any) => el === "posts")
      ) {
        return { data: [mockComment], refetch: vi.fn() };
      }

      if (queryKey.find((el: any) => el === "groups")) {
        return { data: mockGroups, isLoading: false };
      }
      if (queryKey.find((el: any) => el === "suggestedUsers")) {
        return { data: mockUsers, isLoading: false };
      }

      if (queryKey[0] === "posts") {
        return { data: mockStatPosts, isLoading: false };
      }

      if (queryKey[0] === "likes") {
        return { data: mockStatLikes, isLoading: false };
      }

      if (queryKey[0] === "comments" && queryKey.length === 1) {
        return { data: mockStatComments, isLoading: false };
      }

      return { data: null, isLoading: false };
    }),
    useQueryClient: vi.fn(() => ({
      invalidateQueries: vi.fn(),
    })),
  };
});

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

vi.mock("react-router", () => {
  const actual = vi.importActual("react-router");
  return {
    ...actual,
    NavLink: vi.fn(),
    useNavigate: () => {
      navigate: vi.fn();
    },
    useLocation: () => location,
  };
});

vi.mock("@/slices/authSlice", async () => {
  const actual = await vi.importActual("@/slices/authSlice");
  return {
    ...actual,
    signUp: vi.fn(),
    signIn: vi.fn(),
    logOut: vi.fn(),
  };
});

vi.mock("@/store/profileStore", () => ({
  useProfilePage: vi.fn().mockReturnValue({
    profilePage: "info",
    changePage: vi.fn(),
  }),
}));

vi.mock("@/store/themeStore", () => ({
  default: {
    value: "dark",
    changeTheme: vi.fn(),
    setTheme: vi.fn(),
    resetTheme: vi.fn(),
  },
}));

vi.mock("@assets/HeartDislikeIcon", () => ({
  default: () => <svg data-testid="heart-dislike-icon" />,
}));

vi.mock("@assets/HeartLikeIcon", () => ({
  default: () => <svg data-testid="heart-like-icon" />,
}));

vi.mock("@assets/CommentIcon", () => ({
  default: () => <svg data-testid="comment-icon" />,
}));

vi.mock("@assets/ChevronIcon", () => ({
  default: () => <svg data-testid="chevron-icon" />,
}));

vi.mock("@assets/ChevronIconExpanded", () => ({
  default: () => <svg data-testid="chevron-icon-expanded" />,
}));

vi.mock("@assets/TrashIcon", () => ({
  default: () => <svg data-testid="svg-trash" />,
}));

vi.mock("@assets/EyeCrossedIcon", () => ({
  default: () => <svg data-testid="eye-close-icon" />,
}));

vi.mock("@assets/EyeOpenIcon", () => ({
  default: () => <svg data-testid="eye-open-icon" />,
}));
vi.mock("@assets/ErrorWarningIcon", () => ({
  default: () => <svg data-testid="error-warning-icon" />,
}));

vi.mock("@assets/ThumbUpIcon", () => ({
  default: () => <svg data-testid="thumb-up-icon" />,
}));

vi.mock("@assets/CheckIcon", () => ({
  default: () => <svg data-testid="check-icon" />,
}));

vi.mock("@assets/SidekickLogoText", () => ({
  default: () => <svg data-testid="logo-text-icon" />,
}));

vi.mock("@assets/SidekickLogo", () => ({
  default: () => <svg data-testid="logo-icon" />,
}));

vi.mock("@assets/HamburgerMenuIcon", () => ({
  default: () => <svg data-testid="hamburger-icon" />,
}));

vi.mock("@assets/EditPenIcon", () => ({
  default: () => <svg data-testid={"edit-pen-icon"} />,
}));
vi.mock("@assets/MailIcon", () => ({
  default: () => <svg data-testid={"mail-icon"} />,
}));
vi.mock("@assets/UploadFileIcon", () => ({
  default: () => <svg data-testid={"upload-icon"} />,
}));
vi.mock("@assets/CrossIcon", () => ({
  default: () => <svg data-testid={"cross-icon"} />,
}));

vi.mock("@components/FrameWrapper", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="frame-wrapper">{children}</div>
  ),
}));
