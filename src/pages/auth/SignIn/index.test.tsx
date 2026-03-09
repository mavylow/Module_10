import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import SignIn from "@pages/auth/SignIn";
import { userEvent } from "@testing-library/user-event";
import authReducer, { signIn } from "@/slices/authSlice";
import "@testing-library/jest-dom/vitest";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { NavLink } from "react-router";

vi.mocked(NavLink).mockImplementation(({ children, to, className }: any) => (
  <a href={to} className={className} data-testid={`nav-${to}`}>
    {children}
  </a>
));

const mockDispatch = vi.fn();

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
      <SignIn />
    </Provider>
  );
};

describe("SignIn", () => {
  beforeEach(() => {
    vi.mocked(useSelector).mockReturnValue(false);
    cleanup();
    vi.clearAllMocks();
  });

  it("renders sign in page data correctly", () => {
    renderComponent();

    expect(screen.getByText("signIntoAccount")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("emailPlaceholder")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("passwordPlaceholder")
    ).toBeInTheDocument();
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

    expect(await screen.findByTestId("check-icon")).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText("passwordPlaceholder");

    await user.clear(passwordInput);
    await user.type(passwordInput, "password128");

    expect(await screen.findByText("strongPassword")).toBeInTheDocument();
    expect(await screen.findByTestId("thumb-up-icon")).toBeInTheDocument();
    await user.click(screen.getByTestId("submit-button"));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(signIn).toHaveBeenCalledTimes(1);
  });

  it("shows validation error when email is too wrong", async () => {
    const user = userEvent.setup();
    renderComponent();

    const emailInput = screen.getByPlaceholderText("emailPlaceholder");

    await user.clear(emailInput);
    await user.type(emailInput, "newuser.com");

    expect(await screen.findByText("emailNotValid")).toBeInTheDocument();

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("shows validation error when email is too wrong", async () => {
    const user = userEvent.setup();
    renderComponent();

    const passwordInput = screen.getByPlaceholderText("passwordPlaceholder");

    await user.clear(passwordInput);
    await user.type(passwordInput, "password");
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
    const navLink = screen.getByText("signUp");

    await user.click(navLink);

    expect(NavLink).toHaveBeenCalledTimes(1);
    expect(NavLink).toHaveBeenCalledWith(
      {
        children: "signUp",
        className: "nav-link",
        to: "/signup",
      },
      undefined
    );
  });
});
