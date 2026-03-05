import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Header from "@components/Header";
import authReducer from "@/slices/authSlice";

import { ProfilePageContext } from "@/store/profileStore";
import type { ReactNode } from "react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

vi.mock("@assets/SidekickLogoText", () => ({
  default: () => <svg data-testid="logo-text-icon" />,
}));

vi.mock("@assets/SidekickLogo", () => ({
  default: () => <svg data-testid="logo-icon" />,
}));

vi.mock("@assets/HamburgerMenuIcon", () => ({
  default: () => <svg data-testid="hamburger-icon" />,
}));

vi.mock("react-router", async () => {
  const actual = await vi.importActual<any>("react-router");

  return {
    ...actual,
    NavLink: ({
      children,
      onClick,
    }: {
      children: ReactNode;
      onClick?: () => void;
    }) => <a onClick={onClick}>{children}</a>,
    useLocation: () => location,
    useNavigate: vi.fn(),
  };
});

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

const mockChangePage = vi.fn();

const mockedProfilePageContext = {
  profilePage: "info" as const,
  changePage: mockChangePage,
};

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
      <ProfilePageContext.Provider value={{ ...mockedProfilePageContext }}>
        <Header />
      </ProfilePageContext.Provider>
    </Provider>
  );
};

describe("Header", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("header without auth", () => {
    vi.stubGlobal("innerWidth", 769);
    vi.mocked(mockUseSelector).mockReturnValue(null);
    renderComponent();

    expect(screen.getByTestId("logo-text-icon")).toBeInTheDocument();
    expect(screen.getByTestId("logo-icon")).toBeInTheDocument();

    expect(screen.getByText("Sing In")).toBeInTheDocument();
    expect(screen.getByText("Sing Up")).toBeInTheDocument();
  });

  it("header with auth", () => {
    vi.spyOn(window.screen, "width", "get").mockReturnValue(769);
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    renderComponent();

    expect(screen.getByTestId("logo-text-icon")).toBeInTheDocument();
    expect(screen.getByTestId("logo-icon")).toBeInTheDocument();

    expect(screen.getByText(`Helena Hills`)).toBeInTheDocument();
    expect(screen.getByAltText(`profile-image`)).toBeInTheDocument();
    expect(screen.getByAltText(`profile-image`).getAttribute("src")).toEqual(
      "/assets/user-helena.png"
    );
  });

  it("changing desktop top mobile class", () => {
    vi.stubGlobal("innerWidth", 769);
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    renderComponent();
    expect(screen.getByTestId(`header`).className).toMatch(/desktop.+/);

    cleanup();
    vi.stubGlobal("innerWidth", 767);
    renderComponent();

    expect(screen.getByTestId(`header`).className).toMatch(/mobile.+/);
  });

  it("expand and hide mobile menu", async () => {
    vi.stubGlobal("innerWidth", 767);
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    renderComponent();

    const expandedButton = screen
      .getByTestId("hamburger-icon")
      .closest("button");

    await userEvent.click(expandedButton!);

    const overlay = screen.getByTestId("overlay");
    const hideButton = screen
      .getByAltText("Hide menu profile image")
      .closest("button");

    expect(screen.getByTestId(`header`).className).toMatch("mobile expanded");

    await userEvent.click(overlay!);

    expect(screen.getByTestId(`header`).className).not.toMatch(
      "mobile expanded"
    );

    await userEvent.click(expandedButton!);
    await userEvent.click(hideButton!);

    expect(screen.getByTestId(`header`).className).not.toMatch(
      "mobile expanded"
    );
  });

  it("navigating to profile page", async () => {
    vi.stubGlobal("innerWidth", 767);
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    renderComponent();

    const expandedButton = screen
      .getByTestId("hamburger-icon")
      .closest("button");

    await userEvent.click(expandedButton!);

    const linkToInfo = screen.getByText("Profile info");

    await userEvent.click(linkToInfo);

    expect(mockChangePage).toHaveBeenCalledOnce();
    expect(mockChangePage).toHaveBeenCalledWith("info");
  });

  it("navigating to statistics", async () => {
    vi.stubGlobal("innerWidth", 767);
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    renderComponent();

    const expandedButton = screen
      .getByTestId("hamburger-icon")
      .closest("button");

    await userEvent.click(expandedButton!);

    const linkToInfo = screen.getByText("Statistics");

    await userEvent.click(linkToInfo);

    expect(mockChangePage).toHaveBeenCalledOnce();
    expect(mockChangePage).toHaveBeenCalledWith("statistics");
  });
});
