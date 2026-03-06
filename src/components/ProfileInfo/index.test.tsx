import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileInfo from "@components/ProfileInfo";
import { AuthContext } from "@providers/AuthProvider";

import "@testing-library/jest-dom/vitest";
import authReducer, { logOut } from "@/slices/authSlice";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { mockUser } from "@/tests/consts";

const mockUpdateUser = vi.fn();
const mockChangeTheme = vi.fn();

vi.mock("@/store/themeStore", () => ({
  default: {
    value: "dark",
    changeTheme: () => mockChangeTheme(),
    setTheme: vi.fn(),
    resetTheme: vi.fn(),
  },
}));

const mockUseSelector = vi.fn();

vi.mocked(useSelector).mockReturnValue({ isLoading: false, user: mockUser });
const mockDispatch = vi.fn();
vi.mocked(useDispatch).mockReturnValue(mockDispatch);

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
      <AuthContext.Provider
        value={{
          user: mockUser,
          updateUser: mockUpdateUser,
        }}
      >
        <ProfileInfo />
      </AuthContext.Provider>
    </Provider>
  );
};

describe("ProfileInfo", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders user data correctly", () => {
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    renderComponent();

    expect(screen.getByText("editProfile")).toBeInTheDocument();
    expect(screen.getByText("Helena Hills")).toBeInTheDocument();

    expect(screen.getByDisplayValue("helenahills")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("helena.hills@social.com")
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Travel and design enthusiast.")
    ).toBeInTheDocument();
  });

  it("allows user to change profile data and submit form", async () => {
    const user = userEvent.setup();
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    renderComponent();
    const usernameInput = screen.getByPlaceholderText("usernamePlaceholder");

    await user.clear(usernameInput);
    await user.type(usernameInput, "newusername");

    await user.click(screen.getByRole("button", { name: /saveChanges/i }));

    expect(mockUpdateUser).toHaveBeenCalledTimes(1);
    expect(mockUpdateUser).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "newusername",
        email: "helena.hills@social.com",
        description: "Travel and design enthusiast.",
        image: "/assets/user-helena.png",
      })
    );
  });

  it("shows validation error when username is too long", async () => {
    const user = userEvent.setup();
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    renderComponent();

    const usernameInput = screen.getByPlaceholderText("usernamePlaceholder");

    await user.clear(usernameInput);
    await user.type(usernameInput, "a".repeat(25));
    await user.click(screen.getByRole("button", { name: /saveChanges/i }));

    expect(await screen.findByText("max20chars")).toBeInTheDocument();

    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  it("calls changeTheme when theme checkbox is toggled", async () => {
    const user = userEvent.setup();
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    renderComponent();

    await user.click(screen.getByText("theme.dark"));

    expect(mockChangeTheme).toHaveBeenCalledTimes(1);
  });

  it("calls logout when Logout button is clicked", async () => {
    const user = userEvent.setup();
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    renderComponent();

    await user.click(screen.getByRole("button", { name: /logout/i }));

    expect(logOut).toHaveBeenCalledTimes(1);
  });
});
