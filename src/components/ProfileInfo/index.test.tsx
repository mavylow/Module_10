import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileInfo from "@components/ProfileInfo";
import { AuthContext } from "@providers/AuthProvider";
import { ThemeContext } from "@providers/ThemeProvider";
import "@testing-library/jest-dom/vitest";
import authReducer, { logOut } from "@/slices/authSlice";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const mockUpdateUser = vi.fn();
const mockChangeTheme = vi.fn();

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

const mockUseSelector = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useSelector: () => mockUseSelector(),
    useDispatch: () => logOut(),
  };
});

const mockLogOutAction = vi.fn();

vi.mock("@/slices/authSlice", async () => {
  const actual = await vi.importActual("@/slices/authSlice");
  return {
    ...actual,
    logOut: vi.fn(() => mockLogOutAction),
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
      <AuthContext.Provider
        value={{
          user: mockUser,
          updateUser: mockUpdateUser,
        }}
      >
        <ThemeContext.Provider
          value={{
            theme: "light",
            changeTheme: mockChangeTheme,
            resetTheme: vi.fn(),
          }}
        >
          <ProfileInfo />
        </ThemeContext.Provider>
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

    expect(screen.getByText("Edit profile")).toBeInTheDocument();
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
    const usernameInput = screen.getByPlaceholderText("Write your username");

    await user.clear(usernameInput);
    await user.type(usernameInput, "newusername");

    await user.click(screen.getByRole("button", { name: /save changes/i }));

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

    const usernameInput = screen.getByPlaceholderText("Write your username");

    await user.clear(usernameInput);
    await user.type(usernameInput, "a".repeat(25));
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByText("Username is too long")).toBeInTheDocument();

    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  it("calls changeTheme when theme checkbox is toggled", async () => {
    const user = userEvent.setup();
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    renderComponent();

    await user.click(screen.getByText("Light theme"));

    expect(mockChangeTheme).toHaveBeenCalledTimes(1);
  });

  it("calls logout when Logout button is clicked", async () => {
    const user = userEvent.setup();
    vi.mocked(mockUseSelector).mockReturnValue(mockUser);
    renderComponent();

    await user.click(screen.getByRole("button", { name: /logout/i }));

    expect(mockLogOutAction).toHaveBeenCalledTimes(1);
  });
});
