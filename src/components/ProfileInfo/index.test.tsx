import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileInfo from "@components/ProfileInfo";
import { AuthContext } from "@providers/AuthProvider";
import { ThemeContext } from "@providers/ThemeProvider";
import "@testing-library/jest-dom/vitest";

const mockLogOut = vi.fn();
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

const renderComponent = () => {
  return render(
    <AuthContext.Provider
      value={{
        user: mockUser,
        logOut: mockLogOut,
        updateUser: mockUpdateUser,
        signIn: vi.fn(),
        signUp: vi.fn(),
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
  );
};

describe("ProfileInfo", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders user data correctly", () => {
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
    renderComponent();

    await user.click(screen.getByText("Light theme"));

    expect(mockChangeTheme).toHaveBeenCalledTimes(1);
  });

  it("calls logout when Logout button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: /logout/i }));

    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
});
