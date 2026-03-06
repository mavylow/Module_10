import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import SignUp from "@pages/auth/SignUp";
import { userEvent } from "@testing-library/user-event";
import authReducer, { signUp } from "@/slices/authSlice";
import "@testing-library/jest-dom/vitest";

import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";

const mockDispatch = vi.fn();

vi.mocked(NavLink).mockImplementation(({ children, to, onClick }: any) => (
  <a href={to} onClick={onClick} data-testid={`nav-${to}`}>
    {children}
  </a>
));

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
      <SignUp />
    </Provider>
  );
};

describe("SignUp", () => {
  beforeEach(() => {
    vi.mocked(useSelector).mockReturnValue(false);
    cleanup();
    vi.clearAllMocks();
  });

  it("renders sign in page data correctly", () => {
    renderComponent();

    expect(screen.getByText("createAccount")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("passwordPlaceholder")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("emailPlaceholder")).toBeInTheDocument();

    expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
    expect(screen.getAllByTestId("eye-open-icon")).toHaveLength(2);
  });

  it("allows user to sign in data and submit form", async () => {
    vi.mocked(useDispatch).mockReturnValue(() => mockDispatch());
    const user = userEvent.setup();
    renderComponent();

    const emailInput = screen.getByPlaceholderText("emailPlaceholder");

    await user.clear(emailInput);
    await user.type(emailInput, "newusername@gmail.com");

    await user.click(screen.getByRole("button", { name: /signUp/i }));
    expect(await screen.findByTestId("check-icon")).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("passwordPlaceholder");

    await user.clear(passwordInput);
    await user.type(passwordInput, "password128");

    expect(
      await screen.findByText("Your password is strong")
    ).toBeInTheDocument();
    expect(await screen.findByTestId("thumb-up-icon")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /signUp/i }));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(signUp).toHaveBeenCalled();
  });

  it("shows validation error when email is too wrong", async () => {
    const user = userEvent.setup();
    renderComponent();

    const emailInput = screen.getByPlaceholderText("emailPlaceholder");

    await user.clear(emailInput);
    await user.type(emailInput, "newuser.com");

    await user.click(screen.getByRole("button", { name: /signUp/i }));
    expect(await screen.findByText("emailNotValid")).toBeInTheDocument();

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("shows validation error when email is too wrong", async () => {
    const user = userEvent.setup();
    renderComponent();

    const passwordInput = screen.getByPlaceholderText("passwordPlaceholder");

    await user.clear(passwordInput);
    await user.type(passwordInput, "password");

    await user.click(screen.getByRole("button", { name: /signUp/i }));

    expect(
      await screen.findByText("passwordContainNumber")
    ).toBeInTheDocument();

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("change password visibility", async () => {
    const user = userEvent.setup();
    renderComponent();

    const passwordInput = screen.getByPlaceholderText(
      "passwordPlaceholder"
    ) as HTMLInputElement;
    const passwordIcon = screen.getByTestId("password-icon");

    expect(passwordInput.type).toBe("password");

    await user.clear(passwordInput);
    await user.type(passwordInput, "password899");
    expect(passwordInput.value).toBe("password899");

    await user.click(passwordIcon);
    expect(passwordInput.type).toBe("text");
    expect(screen.getAllByTestId("eye-open-icon")).toHaveLength(1);
    expect(screen.getByTestId("eye-close-icon")).toBeInTheDocument();
    await user.click(passwordIcon);
    expect(passwordInput.type).toBe("password");
    expect(screen.getAllByTestId("eye-open-icon")).toHaveLength(2);
  });

  it("navigate to sign up page", async () => {
    const user = userEvent.setup();
    renderComponent();
    const navLink = screen.getByText("signIn");

    await user.click(navLink);

    expect(NavLink).toHaveBeenCalledTimes(2);
    expect(NavLink).toBeCalledWith(
      {
        children: "signIn",
        className: "nav-link",
        to: "/signin",
      },
      undefined
    );
  });
});
