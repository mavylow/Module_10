import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Header from "@components/Header";
import authReducer from "@/slices/authSlice";
import userEvent from "@testing-library/user-event";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { mockUser } from "@/tests/consts";
import { useProfilePage } from "@/store/profileStore";
import { NavLink } from "react-router";

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

vi.mocked(NavLink).mockImplementation(({ children, to, onClick }: any) => (
  <a href={to} onClick={onClick} data-testid={`nav-${to}`}>
    {children}
  </a>
));

const renderComponent = (store = createTestStore()) => {
  return render(
    <Provider store={store}>
      <Header />
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
    vi.mocked(useSelector).mockReturnValue(null);
    renderComponent();

    expect(screen.getByTestId("logo-text-icon")).toBeInTheDocument();
    expect(screen.getByTestId("logo-icon")).toBeInTheDocument();

    expect(screen.getByText("Sing In")).toBeInTheDocument();
    expect(screen.getByText("Sing Up")).toBeInTheDocument();
  });

  it("header with auth", () => {
    vi.spyOn(window.screen, "width", "get").mockReturnValue(769);

    vi.mocked(useSelector).mockReturnValue(mockUser);
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
    vi.mocked(useSelector).mockReturnValue(mockUser);
    renderComponent();
    expect(screen.getByTestId(`header`).className).toMatch(/desktop.+/);

    cleanup();
    vi.stubGlobal("innerWidth", 767);
    renderComponent();

    expect(screen.getByTestId(`header`).className).toMatch(/mobile.+/);
  });

  it("expand and hide mobile menu", async () => {
    vi.stubGlobal("innerWidth", 767);
    vi.mocked(useSelector).mockReturnValue(mockUser);
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
    vi.mocked(useSelector).mockReturnValue(mockUser);
    renderComponent();

    const expandedButton = screen
      .getByTestId("hamburger-icon")
      .closest("button");

    await userEvent.click(expandedButton!);

    const linkToInfo = screen.getByText("Profile info");

    await userEvent.click(linkToInfo);

    expect(useProfilePage().changePage).toHaveBeenCalledOnce();
    expect(useProfilePage().changePage).toHaveBeenCalledWith("info");
  });

  it("navigating to statistics", async () => {
    vi.stubGlobal("innerWidth", 767);
    vi.mocked(useSelector).mockReturnValue(mockUser);
    renderComponent();

    const expandedButton = screen
      .getByTestId("hamburger-icon")
      .closest("button");

    await userEvent.click(expandedButton!);

    const linkToInfo = screen.getByText("Statistics");

    await userEvent.click(linkToInfo);

    expect(useProfilePage().changePage).toHaveBeenCalledOnce();
    expect(useProfilePage().changePage).toHaveBeenCalledWith("statistics");
  });
});
